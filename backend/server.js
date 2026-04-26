import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config();

const supabase = createClient(
    process.env.PROJECT_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

console.log("Servidor configurado con Supabase JS Client (HTTP)");

const app = express();
app.use(cors());
app.use(express.json());

const MODEL = "google/gemini-2.5-flash-lite-preview-09-2025";

app.get('/api/exercises', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('exercises')
            .select('*')
            .eq('status', 'approved')
            .order('created_at', { ascending: true });

        if (error) throw error;
        return res.json(data);
    } catch (err) {
        console.error("Error al traer ejercicios", err);
        return res.status(500).json({ error: "Error interno del servidor DB" });
    }
});

app.post('/api/evaluate', async (req, res) => {
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: "API key no configurada." });
    }

    const { userCode, exerciseInstruction, exerciseId, githubUsername } = req.body;
    if (!userCode || !exerciseInstruction) {
        return res.status(400).json({ error: "Faltan campos requeridos." });
    }

    const systemPrompt = `Eres un Senior Software Engineer realizando un Code Review ESTRICTO del código HTML/CSS/JS de un estudiante junior.
Tu trabajo es auditar el código técnica y profesionalmente. NO toleres errores de sintaxis, falta de etiquetas de cierre, ni omisiones a los criterios.
REGLA PRINCIPAL: Eres altamente RESTRICTIVO. Si el estudiante no cumple con el 100% de los requisitos, DEBES rechazar el código ("aprobado": false). No seas permisivo.

DEVUELVE ÚNICAMENTE un objeto JSON con esta estructura exacta:
{
  "aprobado": boolean,
  "cosasBuenas": string[],
  "cosasMalas": string[],
  "revisar": string[],
  "mensajeGeneral": string
}

- "aprobado": true SOLO SI cumple estrictamente TODOS los requisitos y el código es válido. false al más mínimo error crítico o ausencia.
- "cosasBuenas": 1-2 puntos fuertes y verificables del código (si las hay).
- "cosasMalas": Faltas graves, falta de etiquetas, incumplimiento de los Criterios Exactos. Si "aprobado" es false, esto DEBE tener al menos 1 ítem.
- "revisar": Sugerencias menores de buenas prácticas.
- "mensajeGeneral": Resumen contundente de 1 línea. Ej: "Código rechazado: Omitiste el cierre de la etiqueta <p> y falta el <h1>".

CRITERIOS EXACTOS DEL EJERCICIO:
${exerciseInstruction}`;

    const userMessage = `CÓDIGO DEL ESTUDIANTE:\n\`\`\`\n${userCode}\n\`\`\``;

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "zero-to-junior",
            },
            body: JSON.stringify({
                model: MODEL,
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: userMessage },
                ],
                temperature: 0.3,
                max_tokens: 600,
                response_format: { type: "json_object" },
            }),
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            return res.status(502).json({ error: errData?.error?.message || `OpenRouter error ${response.status}` });
        }

        const data = await response.json();
        const rawContent = data.choices?.[0]?.message?.content;

        if (!rawContent) {
            return res.status(502).json({ error: "Respuesta vacía de la IA." });
        }

        let parsed;
        try {
            parsed = JSON.parse(rawContent);
        } catch {
            return res.status(502).json({ error: "La IA devolvió JSON inválido." });
        }

        const safe = {
            aprobado: Boolean(parsed.aprobado),
            cosasBuenas: Array.isArray(parsed.cosasBuenas) ? parsed.cosasBuenas : [],
            cosasMalas: Array.isArray(parsed.cosasMalas) ? parsed.cosasMalas : [],
            revisar: Array.isArray(parsed.revisar) ? parsed.revisar : [],
            mensajeGeneral: parsed.mensajeGeneral || "",
        };

        // Si aprobó y nos enviaron metadata del usuario/ejercicio, registrarlo en Supabase
        if (safe.aprobado && exerciseId && githubUsername) {
            try {
                // 1. Aseguramos que exista el usuario (upsert con github_username)
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .upsert({ github_username: githubUsername }, { onConflict: 'github_username' })
                    .select('id')
                    .single();

                if (userError) throw userError;
                const userId = userData.id;

                // 2. Insertamos el progreso si no existe
                const { error: progError } = await supabase
                    .from('user_progress')
                    .upsert(
                        { user_id: userId, exercise_id: exerciseId }, 
                        { onConflict: 'user_id,exercise_id' }
                    );
                
                if (progError) throw progError;
            } catch (dbErr) {
                console.error("Error al guardar progreso en Supabase:", dbErr);
                // No detenemos la respuesta al usuario, pero logueamos el error.
            }
        }

        return res.json(safe);
    } catch (err) {
        return res.status(500).json({ error: err instanceof Error ? err.message : "Error desconocido" });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor de IA corriendo en http://localhost:${PORT}`));
