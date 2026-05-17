import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';
import Groq from 'groq-sdk';

dotenv.config();

const supabase = createClient(
    process.env.PROJECT_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
);

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const app = express();
app.use(cors());
app.use(express.json());

const MODEL = "llama-3.3-70b-versatile";

// ─── GET /api/modules ─────────────────────────────────────────────────────
// Devuelve módulos con sus ejercicios y progreso del usuario
app.get('/api/modules', async (req, res) => {
    const { githubUsername } = req.query;
    try {
        const { data: modules, error: modsErr } = await supabase
            .from('modules')
            .select('*')
            .order('sort_order', { ascending: true });
        if (modsErr) throw modsErr;

        const { data: exercises, error: exErr } = await supabase
            .from('exercises')
            .select('id, slug, title, description, type, sort_order, module_id')
            .eq('status', 'approved')
            .order('sort_order', { ascending: true });
        if (exErr) throw exErr;

        let completedSet = new Set();
        if (githubUsername) {
            const { data: userData } = await supabase
                .from('users')
                .select('id')
                .eq('github_username', githubUsername)
                .single();
            if (userData) {
                const { data: progress } = await supabase
                    .from('user_progress')
                    .select('exercise_id')
                    .eq('user_id', userData.id);
                if (progress) progress.forEach(p => completedSet.add(p.exercise_id));
            }
        }

        const result = modules.map(module => {
            const moduleExercises = exercises
                .filter(ex => ex.module_id === module.id)
                .map(ex => ({ ...ex, completed: completedSet.has(ex.id) }));
            return {
                ...module,
                exercises: moduleExercises,
                totalExercises: moduleExercises.length,
                completedExercises: moduleExercises.filter(e => e.completed).length,
            };
        });

        return res.json(result);
    } catch (err) {
        console.error("Error en /api/modules:", err);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
});

// ─── GET /api/exercises/:slug ─────────────────────────────────────────────
app.get('/api/exercises/:slug', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('exercises')
            .select('*')
            .eq('slug', req.params.slug)
            .eq('status', 'approved')
            .single();
        if (error) throw error;
        return res.json(data);
    } catch (err) {
        return res.status(404).json({ error: "Ejercicio no encontrado" });
    }
});

// ─── Legacy: GET /api/exercises ────────────────────────────────────────────
app.get('/api/exercises', async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('exercises')
            .select('*')
            .eq('status', 'approved')
            .order('sort_order', { ascending: true });
        if (error) throw error;
        return res.json(data);
    } catch (err) {
        return res.status(500).json({ error: "Error interno del servidor DB" });
    }
});

// ─── POST /api/evaluate ───────────────────────────────────────────────────
app.post('/api/evaluate', async (req, res) => {
    if (!process.env.GROQ_API_KEY) return res.status(500).json({ error: "API key no configurada." });

    const { userCode, exerciseInstruction, exerciseId, githubUsername, exerciseType = 'html' } = req.body;
    if (!userCode || !exerciseInstruction) {
        return res.status(400).json({ error: "Faltan campos requeridos." });
    }

    const typeContext = exerciseType === 'js'
        ? 'código JavaScript puro (sin DOM ni HTML). Evalúa la lógica JS, el uso correcto de APIs del lenguaje y si los resultados son correctos.'
        : exerciseType === 'terminal'
        ? 'un archivo de respuestas donde el estudiante documenta sus comandos ejecutados en la terminal/Git. Evalúa que los outputs sean reales y las explicaciones sean correctas.'
        : 'código HTML/CSS. Evalúa la estructura semántica, etiquetas correctas y estilos aplicados.';

    const systemPrompt = `Eres un Senior Software Engineer haciendo Code Review ESTRICTO de ${typeContext}
Tu trabajo: auditar técnica y profesionalmente. NO toleres omisiones a los criterios.
REGLA PRINCIPAL: Eres RESTRICTIVO. Si el estudiante no cumple el 100% de los requisitos → "aprobado": false.

DEVUELVE ÚNICAMENTE un objeto JSON con esta estructura exacta:
{
  "aprobado": boolean,
  "cosasBuenas": string[],
  "cosasMalas": string[],
  "revisar": string[],
  "mensajeGeneral": string
}

- "aprobado": true SOLO SI cumple estrictamente TODOS los requisitos.
- "cosasBuenas": 1-2 puntos fuertes verificables.
- "cosasMalas": Faltas graves. Si aprobado=false, DEBE tener al menos 1 ítem.
- "revisar": Sugerencias de mejora (no bloqueantes).
- "mensajeGeneral": Resumen de 1 línea corta.

CRITERIOS EXACTOS DEL EJERCICIO:
${exerciseInstruction}`;

    const userMessage = `CÓDIGO DEL ESTUDIANTE:\n\`\`\`\n${userCode}\n\`\`\``;

    try {
        const completion = await groq.chat.completions.create({
            model: MODEL,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userMessage },
            ],
            temperature: 0.3,
            max_tokens: 700,
            response_format: { type: "json_object" },
        });

        const rawContent = completion.choices?.[0]?.message?.content;
        if (!rawContent) return res.status(502).json({ error: "Respuesta vacía de la IA." });

        let parsed;
        try { parsed = JSON.parse(rawContent); }
        catch { return res.status(502).json({ error: "La IA devolvió JSON inválido." }); }

        const safe = {
            aprobado: Boolean(parsed.aprobado),
            cosasBuenas: Array.isArray(parsed.cosasBuenas) ? parsed.cosasBuenas : [],
            cosasMalas: Array.isArray(parsed.cosasMalas) ? parsed.cosasMalas : [],
            revisar: Array.isArray(parsed.revisar) ? parsed.revisar : [],
            mensajeGeneral: parsed.mensajeGeneral || "",
        };

        if (safe.aprobado && exerciseId && githubUsername) {
            try {
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .upsert({ github_username: githubUsername }, { onConflict: 'github_username' })
                    .select('id')
                    .single();
                if (userError) throw userError;

                await supabase
                    .from('user_progress')
                    .upsert(
                        { user_id: userData.id, exercise_id: exerciseId },
                        { onConflict: 'user_id,exercise_id' }
                    );
            } catch (dbErr) {
                console.error("Error al guardar progreso:", dbErr);
            }
        }

        return res.json(safe);
    } catch (err) {
        return res.status(500).json({ error: err instanceof Error ? err.message : "Error desconocido" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Forge backend corriendo en puerto ${PORT}`));
