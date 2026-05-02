import { createClient } from '@supabase/supabase-js';
import { randomUUID } from 'crypto';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.PROJECT_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const M01_ID = '106e74e1-aa58-404f-b239-3fc5a517003c';
const M02_ID = '011e71d8-0179-4ca6-ab8f-187e74537862';

// ─── Shift existing exercises in M01 and M02 up by 1 ─────────────────────────
async function shiftSortOrders(moduleId) {
    const { data: exs } = await supabase
        .from('exercises')
        .select('id, sort_order')
        .eq('module_id', moduleId)
        .order('sort_order', { ascending: false }); // descending to avoid conflicts

    for (const ex of exs ?? []) {
        await supabase
            .from('exercises')
            .update({ sort_order: ex.sort_order + 1 })
            .eq('id', ex.id);
    }
    console.log(`  Shifted ${exs?.length ?? 0} exercises in module ${moduleId}`);
}

// ─── Exercise definitions ─────────────────────────────────────────────────────

const htmlBase = {
    id: randomUUID(),
    slug: 'M01-E01-estructura-base',
    title: '🏗️ Tu Primera Página Web',
    description: 'Aprende la estructura base de HTML: el esqueleto de toda página, jerarquía de títulos, párrafos, listas y enlaces. Todo lo que necesitas para empezar.',
    type: 'html',
    module_id: M01_ID,
    sort_order: 1,
    status: 'approved',
    html_template: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Mi Gremio</title>
</head>
<body>

<!--
══════════════════════════════════════════════════════
📖 TEORÍA: La Estructura Base de HTML
══════════════════════════════════════════════════════

Todo archivo HTML sigue la misma estructura:

  <!DOCTYPE html>   → Le dice al navegador que es HTML5
  <html>            → La raíz de todo
    <head>          → Info INVISIBLE (título, CSS, fuentes)
    <body>          → Todo lo VISIBLE va aquí

Dentro del <body> usamos etiquetas para organizar:

  TÍTULOS (de mayor a menor importancia):
    <h1>Solo uno por página — el tema principal</h1>
    <h2>Sección importante</h2>
    <h3>Sub-sección</h3>

  PÁRRAFOS:
    <p>Texto normal. Cada párrafo es un bloque separado.</p>

  LISTAS:
    <ul>                    <ol>
      <li>Sin orden</li>      <li>Numerada</li>
    </ul>                   </ol>

  ENLACES:
    <a href="https://github.com">Texto visible</a>
    Agrega target="_blank" para abrir en pestaña nueva.

  IMÁGENES:
    <img src="https://placecats.com/200/200" alt="Descripción">
    El atributo alt es OBLIGATORIO — describe la imagen.

══════════════════════════════════════════════════════
🚀 TU MISIÓN: El Perfil del Gremio
══════════════════════════════════════════════════════

RETO 1 — Encabezado:
  Escribe un <h1> con el nombre de tu gremio.
  Debajo, un <p> con una descripción corta.

RETO 2 — Habilidades:
  Agrega un <h2> que diga "Habilidades".
  Debajo, una <ul> con al menos 4 habilidades como <li>.

RETO 3 — Misiones completadas:
  Agrega un <h2> que diga "Misiones Completadas".
  Debajo, una <ol> con al menos 3 misiones en orden
  de dificultad (usa <ol> porque el orden importa).

RETO 4 — Contacto:
  Agrega un <h3> que diga "Contacto".
  Debajo, un <p> con un <a href="https://github.com"
  target="_blank"> que diga "Ver repositorio".

RETO 5 — Imagen:
  Agrega un <img> con src y un atributo alt descriptivo.
  Puedes usar: src="https://placecats.com/200/200"

══════════════════════════════════════════════════════
-->

    <!-- ✍️ Escribe tu código aquí abajo -->



</body>
</html>`,
    css_template: `/* Estilos base — no los modifiques */
body {
    font-family: 'Segoe UI', sans-serif;
    max-width: 680px;
    margin: 40px auto;
    padding: 0 24px;
    background: #0f0f1a;
    color: #e0e0e0;
    line-height: 1.7;
}
h1 { color: #a78bfa; margin-bottom: 4px; }
h2 { color: #60a5fa; border-bottom: 1px solid #2a2a40; padding-bottom: 6px; margin-top: 32px; }
h3 { color: #34d399; }
p  { color: #9ca3af; }
a  { color: #f59e0b; }
li { margin: 6px 0; }
img { max-width: 100%; border-radius: 8px; margin-top: 12px; display: block; }`,
    instruction_for_ai: `REGLAS ESTRICTAS — HTML Básico:
1. DEBE existir exactamente un <h1> con el nombre del gremio y al menos un <p> de descripción debajo. REPROBAR si falta el <h1> o el <p>.
2. DEBE existir un <h2> y una <ul> con mínimo 4 <li>. REPROBAR si la lista tiene menos de 4 items o si usa <ol> donde debería ser <ul>.
3. DEBE existir un <h2> y una <ol> con mínimo 3 <li>. REPROBAR si usa <ul> en vez de <ol>.
4. DEBE existir un <h3> de contacto con un <a href> que apunte a una URL real (no "#" ni vacío). REPROBAR si el href está vacío.
5. DEBE existir al menos un <img> con atributo alt no vacío y descriptivo. REPROBAR si falta alt o está vacío ("").
6. Verificar que todas las etiquetas estén correctamente cerradas y anidadas. REPROBAR si hay etiquetas sin cerrar o mal anidadas.`,
};

const cssBoxModel = {
    id: randomUUID(),
    slug: 'M02-E01-box-model',
    title: '📦 El Box Model: Todo es una Caja',
    description: 'Todo elemento en CSS es una caja. Aprende a controlar su espacio con width, height, padding, border y margin — los conceptos base de cualquier diseño.',
    type: 'html',
    module_id: M02_ID,
    sort_order: 1,
    status: 'approved',
    html_template: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="style.css">
    <title>Box Model</title>
</head>
<body>

    <h1>El Taller de Runas</h1>
    <p class="intro">Cada runa es una caja. Aprende a controlar su espacio.</p>

    <div class="vitrina">
        <div class="runa runa-fuego">
            <span class="icono">🔥</span>
            <h3>Runa de Fuego</h3>
            <p>Daño: 150</p>
        </div>
        <div class="runa runa-hielo">
            <span class="icono">❄️</span>
            <h3>Runa de Hielo</h3>
            <p>Daño: 90</p>
        </div>
        <div class="runa runa-rayo">
            <span class="icono">⚡</span>
            <h3>Runa de Rayo</h3>
            <p>Daño: 120</p>
        </div>
    </div>

    <h2>Categorías</h2>
    <div class="etiquetas">
        <span class="tag">Épico</span>
        <span class="tag">Raro</span>
        <span class="tag">Común</span>
    </div>

</body>
</html>`,
    css_template: `/*
══════════════════════════════════════════════════════
📖 TEORÍA: El Box Model de CSS
══════════════════════════════════════════════════════

Cada elemento HTML es una caja con 4 capas:

  ┌──────────────────────────────────┐
  │            MARGIN                │  ← Espacio FUERA (empuja otros elementos)
  │  ┌────────────────────────────┐  │
  │  │          BORDER            │  │  ← El borde visible
  │  │  ┌──────────────────────┐  │  │
  │  │  │       PADDING        │  │  │  ← Espacio interior (entre borde y contenido)
  │  │  │  ┌────────────────┐  │  │  │
  │  │  │  │    CONTENT     │  │  │  │  ← El contenido real (texto, imagen...)
  │  │  │  └────────────────┘  │  │  │
  │  │  └──────────────────────┘  │  │
  │  └────────────────────────────┘  │
  └──────────────────────────────────┘

PROPIEDADES CLAVE:
  width / height          → tamaño del área de contenido
  padding: 10px           → todos los lados igual
  padding: 10px 20px      → arriba/abajo  |  izquierda/derecha
  border: 2px solid red   → grosor  estilo  color
  margin: 20px auto       → auto centra horizontalmente

TRUCO IMPORTANTE:
  box-sizing: border-box  → el padding y border se cuentan
                            DENTRO del width declarado.
                            La mayoría de proyectos reales usan esto.

DISPLAY:
  display: block          → ocupa todo el ancho disponible (div, p, h1...)
  display: inline         → solo ocupa lo necesario, NO acepta width/height (span, a...)
  display: inline-block   → fluye como inline PERO acepta width y height

══════════════════════════════════════════════════════
🚀 TU MISIÓN: Dale forma a las runas
══════════════════════════════════════════════════════

RETO 1 — El contenedor .vitrina:
  Agrégale: padding: 24px, margin-bottom: 32px,
  background: #1a1a2e y border-radius: 12px.

RETO 2 — Las tarjetas .runa:
  Agrégale: display: inline-block, width: 180px,
  padding: 20px, margin: 12px,
  border: 2px solid #333 y border-radius: 10px.
  (inline-block las deja una al lado de otra)

RETO 3 — Personaliza el borde de cada runa:
  .runa-fuego → border-color: #ef4444 y background: #1c0a0a
  .runa-hielo → border-color: #60a5fa y background: #0a0f1c
  .runa-rayo  → border-color: #facc15 y background: #1c1a0a

RETO 4 — Las etiquetas .tag:
  Agrégales: display: inline-block, padding: 4px 14px,
  margin: 4px, border-radius: 20px,
  background: #374151 y color: #e5e7eb.
  Observa cómo inline-block permite padding pero fluye como texto.

══════════════════════════════════════════════════════
*/

/* Estilos base — no los modifiques */
* { box-sizing: border-box; }
body {
    font-family: 'Segoe UI', sans-serif;
    background: #0f0f1a;
    color: #e0e0e0;
    padding: 32px;
    margin: 0;
}
h1 { color: #a78bfa; margin-bottom: 4px; }
h2 { color: #60a5fa; margin-top: 32px; }
.intro { color: #9ca3af; margin-bottom: 24px; }
.runa h3 { margin: 10px 0 4px; color: #f3f4f6; font-size: 1rem; }
.icono { font-size: 2rem; display: block; }
.runa p { margin: 0; font-size: 0.85rem; color: #9ca3af; }

/* ✍️ Escribe tu código debajo de esta línea */
`,
    instruction_for_ai: `REGLAS ESTRICTAS — Box Model:
1. .vitrina DEBE tener padding definido Y border-radius. REPROBAR si falta cualquiera de los dos.
2. .runa DEBE tener los tres: width, padding Y margin. REPROBAR si falta alguno.
3. .runa DEBE usar display: inline-block. REPROBAR si usa float, flex o no tiene display definido.
4. Cada variante (.runa-fuego, .runa-hielo, .runa-rayo) DEBE tener border-color o background diferente. REPROBAR si las tres son idénticas visualmente o falta alguna variante.
5. .tag DEBE tener display: inline-block, padding Y border-radius. REPROBAR si falta display o border-radius.`,
};

// ─── Run ──────────────────────────────────────────────────────────────────────
console.log('Shifting sort_orders...');
await shiftSortOrders(M01_ID);
await shiftSortOrders(M02_ID);

console.log('\nInserting new exercises...');

// Update slugs of existing exercises that collide
// M01-E01-semantica stays as-is (now at sort_order 2), M02-E01-selectores stays (now at sort_order 2)
// New exercises get the E01 slugs — but to avoid slug collision we keep new slugs distinct

const { error: err1 } = await supabase.from('exercises').insert(htmlBase);
if (err1) { console.error('✗ HTML base:', err1.message); }
else { console.log('✓ Inserted:', htmlBase.title); }

const { error: err2 } = await supabase.from('exercises').insert(cssBoxModel);
if (err2) { console.error('✗ CSS box model:', err2.message); }
else { console.log('✓ Inserted:', cssBoxModel.title); }

console.log('\nDone. Run inspect-db.mjs to verify.');
