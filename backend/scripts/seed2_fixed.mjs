// =============================================
// Launchpad: Seed Script v2 — wrapper fix
// Ejecutar con: node seed2_fixed.mjs
// =============================================
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();

const supabase = createClient(process.env.PROJECT_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Módulos
const MODULES = [
  { slug: 'M01-HTML', title: 'HTML: Los Cimientos',         description: 'Estructura semántica, formularios y tablas. Construye la base de cualquier web.', icon: '🏗️', sort_order: 1 },
  { slug: 'M02-CSS',  title: 'CSS: Dominando el Estilo',    description: 'Selectores, Flexbox y Variables CSS. Diseña interfaces profesionales.', icon: '🎨', sort_order: 2 },
  { slug: 'M03-VARS', title: 'JS: Variables & Tipos',       description: 'var, let, const, tipos de datos, coerción y template literals.', icon: '📦', sort_order: 3 },
  { slug: 'M04-IF',   title: 'JS: Decisiones',              description: 'if/else, switch, ternario, nullish coalescing y guard clauses.', icon: '🚦', sort_order: 4 },
  { slug: 'M05-FOR',  title: 'JS: Ciclos',                  description: 'for, for...of, while, do-while, break, continue y búsqueda binaria.', icon: '🔁', sort_order: 5 },
  { slug: 'M06-FN',   title: 'JS: Funciones',               description: 'Declaraciones, arrow functions, HOF, closures y recursión.', icon: '🛠️', sort_order: 6 },
  { slug: 'M07-DATA', title: 'JS: Arrays & Objetos',        description: 'Métodos de array (map/filter/reduce), objetos, destructuring y spread.', icon: '🗃️', sort_order: 7 },
  { slug: 'M08-GIT',  title: 'Git: Control de Versiones',   description: 'Comandos esenciales: init, commit, branch, merge y remotos.', icon: '🌿', sort_order: 8 },
];

// Helper: escapa backticks dentro de un string que va a usarse como template JS
const jsTemplate = (str) => str;

// ─── EXERCISES ───────────────────────────────────────────────
const EXERCISES = [

  // ═══ M01-HTML ════════════════════════════════════════════
  {
    slug: 'M01-E01-semantica',
    module: 'M01-HTML',
    title: '🏛️ Los Cimientos del Templo',
    description: 'Construye la estructura semántica completa usando etiquetas HTML5: header, nav, main, section, article, footer y figure.',
    sort_order: 1,
    type: 'html',
    html_template: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gremio de Código</title>
    <link rel="stylesheet" href="style.css">
</head>
<!--
══════════════════════════════════════════════
📖 TEORÍA: HTML Semántico
══════════════════════════════════════════════
<header>   → Encabezado de la página o sección
<nav>      → Menú de navegación con enlaces
<main>     → Contenido principal (SOLO UNO por página)
<section>  → Sección temática de contenido
<article>  → Contenido independiente (post, card)
<footer>   → Pie de página
<figure>   → Imagen con su pie de foto
<figcaption> → Pie de la imagen
Jerarquía headings: <h1> → <h2> → <h3> (no saltes niveles)
══════════════════════════════════════════════
🎮 MISIÓN: El Templo del Gremio
══════════════════════════════════════════════
-->
<body>

    <!-- RETO 1: <header> con:
         - <h1> "Gremio de Código ⚔️"
         - <nav> con <ul> de 4 <li><a href="#">: Inicio, Misiones, Miembros, Contacto -->


    <!-- RETO 2: <main> con DOS <section>:
         SECCIÓN 1 "Sobre el Gremio":
           - <h2> "¿Quiénes somos?"
           - Dos <article>: cada uno con <h3> y <p> (2+ oraciones)
         SECCIÓN 2 "Miembro Destacado":
           - <h2> "Héroe del Mes"
           - <figure> con un párrafo de emoji (🧙) y <figcaption>
           - Un <p> describiendo al héroe -->


    <!-- RETO 3: <footer> con <p> de copyright -->

</body>
</html>`,
    css_template: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Georgia, serif; background: #1a1a2e; color: #e0e0e0; line-height: 1.6; }
header { background: #16213e; padding: 20px 40px; border-bottom: 3px solid #e94560; }
header h1 { color: #e94560; font-size: 1.8em; }
nav ul { list-style: none; display: flex; gap: 20px; margin-top: 10px; }
nav ul li a { color: #a8dadc; text-decoration: none; }
main { max-width: 900px; margin: 40px auto; padding: 0 20px; }
section { margin-bottom: 40px; border-left: 4px solid #e94560; padding-left: 20px; }
section h2 { color: #e94560; margin-bottom: 15px; }
article { background: #16213e; padding: 15px; border-radius: 6px; margin-bottom: 12px; }
article h3 { color: #a8dadc; margin-bottom: 8px; }
figure { text-align: center; background: #16213e; padding: 15px; border-radius: 6px; }
figure p { font-size: 4em; }
figcaption { color: #a8dadc; font-style: italic; margin-top: 8px; }
footer { background: #16213e; text-align: center; padding: 20px; color: #888; border-top: 1px solid #333; margin-top: 40px; }`,
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS:
1. Debe existir un <header> con <h1> Y <nav> con <ul> de 4 <a>. REPROBAR si falta.
2. Debe existir <main> con EXACTAMENTE dos <section> diferentes.
3. Primera sección: <h2> + dos <article> cada uno con <h3> y <p>. REPROBAR si falta un article.
4. Segunda sección: <h2> + <figure> con <figcaption> + <p>. REPROBAR si falta figure o figcaption.
5. Debe existir <footer> con <p>.
6. Validar cierre correcto de todas las etiquetas. REPROBAR si hay etiquetas sin cerrar.`,
  },

  {
    slug: 'M01-E02-formularios',
    module: 'M01-HTML',
    title: '📋 El Formulario de Reclutamiento',
    description: 'Crea un formulario completo con inputs de múltiples tipos, fieldsets, selects, textareas y asociación correcta label/id.',
    sort_order: 2,
    type: 'html',
    html_template: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Reclutamiento - Gremio de Código</title>
    <link rel="stylesheet" href="style.css">
</head>
<!--
📖 TEORÍA: Formularios
<form action="#" method="post">
<label for="campo">  → vincula con el input por id
<input type="text" id="campo" name="campo" required placeholder="...">
Tipos: text, email, password, number, tel, date, checkbox, radio, file
<select><option value="x">Texto</option></select>
<textarea rows="4"></textarea>
<fieldset><legend>Grupo</legend></fieldset>
🎮 MISIÓN: Formulario de Membresía del Gremio
-->
<body>
<div class="container">
    <h1>⚔️ Solicitud de Membresía</h1>
    <p class="subtitle">Completa todos los campos para unirte al Gremio.</p>

    <!-- Crea el <form> con method="post" action="#" -->

    <!-- RETO 1 — FIELDSET "Datos del Aventurero":
         - nombre: type text, required, placeholder
         - email: type email, required
         - telefono: type tel
         - fecha_nacimiento: type date, required
         Todos con <label for="id"> correcto -->

    <!-- RETO 2 — FIELDSET "Datos de la Misión":
         - <select id="especialidad"> con 4+ opciones (la 1ra disabled+selected)
         - Años de experiencia: number, min=0, max=50, required
         - Motivación: textarea rows=4, required, placeholder -->

    <!-- RETO 3 — FIELDSET "Habilidades":
         4 checkboxes con name="habilidades": HTML, CSS, JavaScript, Git
         Cada uno con id único y su <label> -->

    <!-- RETO 4 — Radio buttons (fuera del fieldset):
         3 radio con name="nivel": Principiante(checked), Intermedio, Avanzado
         Cada uno con label -->

    <!-- RETO 5 — Botones:
         button[type=submit] "🚀 Enviar Solicitud"
         button[type=reset] "🔄 Limpiar" -->

</div>
</body>
</html>`,
    css_template: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', sans-serif; background: #0f0f23; color: #cdd6f4; min-height: 100vh; display: flex; justify-content: center; padding: 40px 20px; }
.container { background: #1e1e2e; border-radius: 12px; padding: 40px; width: 100%; max-width: 600px; border: 1px solid #313244; align-self: flex-start; }
h1 { color: #cba6f7; margin-bottom: 8px; }
.subtitle { color: #6c7086; margin-bottom: 30px; }
fieldset { border: 1px solid #313244; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
legend { color: #89b4fa; font-weight: bold; padding: 0 10px; }
label { display: block; margin-bottom: 5px; color: #a6adc8; font-size: 0.9em; }
input, select, textarea { width: 100%; padding: 10px 14px; background: #313244; border: 1px solid #45475a; border-radius: 6px; color: #cdd6f4; margin-bottom: 16px; font-size: 1em; }
input:focus, select:focus, textarea:focus { outline: none; border-color: #89b4fa; }
.checkbox-group, .radio-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.checkbox-group label, .radio-group label { display: flex; align-items: center; gap: 8px; cursor: pointer; margin: 0; }
input[type="checkbox"], input[type="radio"] { width: auto; margin: 0; accent-color: #cba6f7; }
button { padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 1em; font-weight: bold; margin-right: 10px; margin-top: 10px; }
button[type="submit"] { background: #cba6f7; color: #1e1e2e; }
button[type="reset"] { background: #313244; color: #cdd6f4; }`,
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS:
1. Debe existir <form> con method y action.
2. Deben existir TRES <fieldset> con <legend>. REPROBAR si falta alguno.
3. Fieldset 1: inputs text+email+tel+date todos con label for/id correctos. REPROBAR si falta alguno.
4. Fieldset 2: <select> con 4+ options + input number con min/max + textarea. REPROBAR si falta alguno.
5. Fieldset 3: 4 checkboxes con name="habilidades" y labels. REPROBAR si son menos de 4.
6. 3 radio buttons con MISMO name="nivel", uno con checked, cada uno con label. REPROBAR si el name no coincide.
7. button[type=submit] Y button[type=reset]. REPROBAR si falta alguno.
8. Verificar label for="X" coincide con input id="X". REPROBAR si no coinciden.`,
  },

  {
    slug: 'M01-E03-tablas',
    module: 'M01-HTML',
    title: '📊 El Registro de Misiones',
    description: 'Construye tablas HTML con thead/tbody/tfoot, colspan y rowspan, enlaces con target e imágenes con alt.',
    sort_order: 3,
    type: 'html',
    html_template: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Registro de Misiones</title>
    <link rel="stylesheet" href="style.css">
</head>
<!--
📖 TEORÍA: Tablas, Imágenes y Enlaces
<table><thead><tbody><tfoot>
<tr>  → Fila   <th> → Encabezado   <td> → Celda de dato
colspan="N" → La celda ocupa N columnas
rowspan="N" → La celda ocupa N filas
<img src="url" alt="descripción" width="100">  ← alt es OBLIGATORIO
<a href="url" target="_blank">Nueva pestaña</a>
<a href="url">                                  ← misma pestaña (default)
🎮 MISIÓN: Registro Oficial del Gremio
-->
<body>
<div class="container">
    <h1>📜 Registro de Misiones</h1>

    <!-- RETO 1 — TABLA PRINCIPAL "Misiones del Gremio":
         <thead>: TH para: Misión, Héroe, Dificultad, Recompensa, Estado
         <tbody>: 4+ filas con datos. Usa emojis para dificultad (⭐⭐⭐) y estado (✅⏳❌)
         <tfoot>: 1 fila donde la primera <td colspan="4">Total de misiones:</td>
                  y la última <td> con el número total -->


    <!-- RETO 2 — TABLA "Ranking del Gremio" (3 columnas: Posición, Héroe, Puntaje):
         FILA 1: primera celda con rowspan="2" texto "🏆 Top 2", luego datos Héroe1
         FILA 2: SOLO 2 celdas (la primera está cubierta por rowspan)
         FILA 3: 3 celdas normales con Hero 3 -->


    <!-- RETO 3 — SECCIÓN "Recursos del Gremio":
         <section> con <h2> y <ul> de 3 items:
         1. <a href="https://developer.mozilla.org" target="_blank">📚 Documentación MDN</a>
         2. <a href="https://github.com">🐙 GitHub del Gremio</a> (misma pestaña)
         3. <img> con src y alt, width=100, height=100 -->

</div>
</body>
</html>`,
    css_template: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', sans-serif; background: #1a1a2e; color: #e0e0e0; padding: 30px; }
.container { max-width: 900px; margin: 0 auto; }
h1 { color: #ffd700; margin-bottom: 24px; font-size: 2em; }
h2 { color: #ffd700; margin: 30px 0 16px; }
table { width: 100%; border-collapse: collapse; margin-bottom: 40px; background: #16213e; border-radius: 8px; overflow: hidden; }
th { background: #e94560; color: white; padding: 12px 16px; text-align: left; }
td { padding: 11px 16px; border-bottom: 1px solid #2d2d44; }
tfoot td { background: #0f3460; font-weight: bold; }
section ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
section ul li { background: #16213e; padding: 12px 16px; border-radius: 6px; border-left: 3px solid #e94560; }
a { color: #a8dadc; text-decoration: none; }
img { border-radius: 6px; }`,
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS:
1. Primera tabla: DEBE tener <thead>, <tbody> Y <tfoot>. REPROBAR si falta alguna sección.
2. El <tfoot> DEBE usar colspan="4" en una celda. REPROBAR si no hay colspan.
3. Segunda tabla: DEBE tener rowspan="2" en la primera celda. REPROBAR si no hay rowspan.
4. <section> con <h2> y <ul> de 3 elementos. REPROBAR si falta.
5. Al menos un enlace con target="_blank" y al menos uno sin él. REPROBAR si todos son iguales.
6. Imagen con src Y alt definidos. REPROBAR si falta el atributo alt.`,
  },

  // ═══ M02-CSS ═════════════════════════════════════════════
  {
    slug: 'M02-E01-selectores',
    module: 'M02-CSS',
    title: '🎯 El Arsenal de Selectores',
    description: 'Domina selectores CSS: elemento, clase, ID, descendiente, hijo directo, pseudo-clases (:hover, :nth-child, :first-child, :last-child) y pseudo-elementos.',
    sort_order: 1,
    type: 'html',
    html_template: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Arsenal de Selectores</title>
    <link rel="stylesheet" href="style.css">
</head>
<!--
📖 TEORÍA: Selectores CSS
p {}           → todos los <p>        .clase {}  → class="clase"
#id {}         → id="id"             * {}       → todos
div p {}       → <p> descendiente de <div>
div > p {}     → <p> hijo DIRECTO de <div>
:first-child   → primer hijo        :last-child → último hijo
:nth-child(2)  → segundo hijo       :nth-child(even) → pares
:hover         → al pasar el mouse
p::before { content: "→ "; } → inserta contenido antes
-->
<body>
<div class="tablero">
    <h1>Tablero del Gremio</h1>
    <p class="subtitulo">El lugar donde los aventureros se reúnen.</p>
    <p>Esta es información general del tablero.</p>
    <h2>Lista de Misiones</h2>
    <ul class="lista-misiones">
        <li>Recuperar el Artefacto Perdido</li>
        <li class="urgente">⚠️ Proteger al Comerciante — URGENTE</li>
        <li>Explorar la Cueva del Norte</li>
        <li>Entregar el Mensaje al Rey</li>
        <li class="urgente">⚠️ Derrotar al Dragón del Este — URGENTE</li>
        <li>Recolectar Hierbas Mágicas</li>
    </ul>
    <h2>Estadísticas</h2>
    <table class="stats-table">
        <thead><tr><th>Héroe</th><th>Misiones</th><th>Nivel</th></tr></thead>
        <tbody>
            <tr><td>Aragorn</td><td>42</td><td>⭐⭐⭐</td></tr>
            <tr><td>Legolas</td><td>38</td><td>⭐⭐⭐</td></tr>
            <tr><td>Gimli</td><td>29</td><td>⭐⭐</td></tr>
            <tr><td>Gandalf</td><td>99</td><td>✨ Legendario</td></tr>
        </tbody>
    </table>
    <div class="anuncios">
        <h2>Anuncios</h2>
        <p>Primer anuncio: Reunión el viernes.</p>
        <div class="caja-anuncio">
            <p>Este p es hijo directo de .caja-anuncio.</p>
            <span><p>Este p es descendiente lejano.</p></span>
        </div>
    </div>
    <div class="botones">
        <a href="#" class="btn">Iniciar Misión</a>
        <a href="#" class="btn btn-peligro">Misión Peligrosa</a>
        <a href="#" class="btn">Cancelar</a>
    </div>
</div>
</body>
</html>`,
    css_template: `/* RETO 1: Selectores básicos
   - body: fondo #0f0f23, color #cdd6f4, font-family sans-serif
   - h1 dentro de .tablero: color #cba6f7, font-size 2em
   - .subtitulo: italic, color #6c7086 */


/* RETO 2: Descendiente vs Hijo directo
   - Todos los <p> DESCENDIENTES de .anuncios → color #a6e3a1
   - Solo los <p> HIJOS DIRECTOS de .caja-anuncio → font-weight bold
   (El 2do selector solo debe afectar el p directo, no el que está dentro del span) */


/* RETO 3: Pseudo-clases en la lista
   .lista-misiones li { padding: 10px 14px; border-radius: 4px; margin-bottom: 4px; }
   - Primer li → color #89b4fa, font-weight bold
   - Último li → color #f38ba8
   - li pares → background #1e1e2e
   - li con clase .urgente → background #3d1515, color #f38ba8, border-left 3px solid #f38ba8 */

.lista-misiones li { padding: 10px 14px; border-radius: 4px; margin-bottom: 4px; }


/* RETO 4: Filas de tabla
   .stats-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
   .stats-table th, .stats-table td { padding: 10px; border: 1px solid #313244; }
   .stats-table th { background: #1e1e2e; color: #cba6f7; }
   - Filas PARES del tbody → background distinto
   - Filas del tbody en :hover → background de highlight */

.stats-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
.stats-table th, .stats-table td { padding: 10px; border: 1px solid #313244; }
.stats-table th { background: #1e1e2e; color: #cba6f7; }


/* RETO 5: .btn con :hover y transition
   Normal: background #89b4fa, color #1e1e2e, padding 10px 20px,
           border-radius 6px, margin 5px, display inline-block, text-decoration none
   :hover: transform translateY(-3px), box-shadow visible, transition 0.2s
   .btn-peligro: background #f38ba8 por defecto */

.botones { margin-top: 20px; }


/* RETO 6 (BONUS): ::before en cada li de .lista-misiones
   Agrega "► " antes de cada li con content y color #cba6f7 */`,
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS:
1. body, h1 dentro de .tablero, y .subtitulo deben estar estilizados. REPROBAR si usa inline styles.
2. DEBE usar selector descendiente (.anuncios p) Y selector hijo directo (.caja-anuncio > p) como selectores DISTINTOS. REPROBAR si solo usa uno.
3. DEBE usar :first-child, :last-child Y :nth-child(even) en la lista. REPROBAR si falta alguno.
4. DEBE usar :nth-child(even) en filas de tabla Y :hover en filas. REPROBAR si no hay hover en tabla.
5. DEBE usar :hover con transform Y transition en .btn. REPROBAR si solo cambia color sin transform.
6. BONUS: ::before en li es valorado pero no obligatorio para aprobar.`,
  },

  {
    slug: 'M02-E02-flexbox',
    module: 'M02-CSS',
    title: '⚔️ El HQ del Gremio',
    description: 'Construye la UI completa del cuartel general usando Flexbox: navbar, hero section, cards con flex-grow, y footer de 3 columnas.',
    sort_order: 2,
    type: 'html',
    html_template: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>HQ del Gremio</title>
    <link rel="stylesheet" href="style.css">
</head>
<!--
📖 TEORÍA: Flexbox Completo
CONTENEDOR: display:flex | flex-direction:row/column | flex-wrap:wrap
  justify-content: flex-start|flex-end|center|space-between|space-around|space-evenly
  align-items: flex-start|flex-end|center|stretch | gap: 20px
HIJOS: flex-grow:1 (cuánto crece) | flex-shrink:1 | flex-basis:200px
  flex:1 (shorthand) | align-self (sobreescribe align-items para ese hijo)
-->
<body>
    <!-- RETO 1: NAVBAR → logo izquierda, enlaces derecha, centrados verticalmente
         Usa justify-content: space-between -->
    <header class="navbar">
        <span class="logo">⚔️ Gremio HQ</span>
        <nav class="nav-links">
            <a href="#">Misiones</a>
            <a href="#">Héroes</a>
            <a href="#">Tienda</a>
            <a href="#" class="btn-nav">Ingresar</a>
        </nav>
    </header>

    <!-- RETO 2: HERO → 80vh, centrado total (vertical + horizontal)
         .hero-content: columna con gap
         .hero-buttons: fila con gap y flex-wrap -->
    <section class="hero">
        <div class="hero-content">
            <h1>El Gremio más poderoso de la tierra</h1>
            <p>Únete a miles de aventureros en la misión de conquistar el código.</p>
            <div class="hero-buttons">
                <button class="btn-primary">🚀 Unirme ahora</button>
                <button class="btn-secondary">📖 Saber más</button>
            </div>
        </div>
    </section>

    <!-- RETO 3: 3 CARDS en fila con flex-wrap
         .card-featured debe tener flex-grow mayor que las demás
         .card-link debe estar al fondo (margin-top: auto) -->
    <section class="cards-section">
        <h2>¿Por qué unirte al Gremio?</h2>
        <div class="cards-container">
            <div class="card"><div class="card-icon">🧠</div><h3>Aprende en serio</h3><p>Ejercicios reales, revisados por IA experta.</p></div>
            <div class="card card-featured"><div class="card-icon">⚡</div><h3>Progresa rápido</h3><p>Ruta de aprendizaje optimizada para desarrollador junior.</p><a href="#" class="card-link">Empezar ahora →</a></div>
            <div class="card"><div class="card-icon">🏆</div><h3>Certifícate</h3><p>Cada misión completada queda registrada en tu GitHub.</p></div>
        </div>
    </section>

    <!-- RETO 4: FOOTER → flex en fila, 3 columnas con flex:1 -->
    <footer class="footer">
        <div class="footer-brand"><span class="logo">⚔️ Gremio HQ</span><p>Formando desarrolladores desde 2025.</p></div>
        <div class="footer-links"><h4>Recursos</h4><ul><li><a href="#">Documentación</a></li><li><a href="#">Blog</a></li></ul></div>
        <div class="footer-links"><h4>Comunidad</h4><ul><li><a href="#">Discord</a></li><li><a href="#">GitHub</a></li></ul></div>
    </footer>
</body>
</html>`,
    css_template: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', sans-serif; background: #0a0a1a; color: #e0e0e0; }

/* RETO 1: .navbar — flex, space-between, align-items center, sticky */
.navbar { padding: 0 40px; height: 64px; background: #10101f; border-bottom: 1px solid #1a1a30;
  /* Tu flexbox aquí */ }
.logo { font-size: 1.3em; font-weight: bold; color: #ffd700; }
.nav-links { gap: 20px; /* Tu flex aquí */ }
.nav-links a { color: #ccc; text-decoration: none; }
.btn-nav { background: #e94560; color: white; padding: 8px 16px; border-radius: 20px; }

/* RETO 2: .hero — 80vh, centrado total. .hero-content — columna. .hero-buttons — fila con wrap */
.hero { min-height: 80vh; background: linear-gradient(135deg, #0f0f23, #1a1a3a);
  /* Tu centrado total aquí */ }
.hero-content { text-align: center; max-width: 600px; padding: 20px;
  /* Tu flex columna aquí */ }
.hero-content h1 { font-size: 2.5em; color: #ffd700; margin-bottom: 16px; }
.hero-content p { color: #a0a0b0; margin-bottom: 24px; }
.hero-buttons { /* Tu flex fila con gap y wrap aquí */ }
.btn-primary { background: #e94560; color: white; padding: 14px 28px; border: none; border-radius: 8px; cursor: pointer; }
.btn-secondary { background: transparent; color: #ffd700; border: 2px solid #ffd700; padding: 14px 28px; border-radius: 8px; cursor: pointer; }

/* RETO 3: .cards-container — flex, wrap, gap, center. .card — flex columna interna. .card-featured — flex-grow 2+ */
.cards-section { padding: 80px 40px; }
.cards-section h2 { text-align: center; color: #ffd700; font-size: 1.8em; margin-bottom: 40px; }
.cards-container { /* Tu flex wrap aquí */ }
.card { background: #16213e; border: 1px solid #2a2a42; border-radius: 12px; padding: 24px; min-width: 200px;
  /* Tu flex columna interna con align-items center*/ }
.card-icon { font-size: 2.5em; margin-bottom: 12px; }
.card h3 { color: #ffd700; margin-bottom: 10px; }
.card p { color: #a0a0b0; text-align: center; font-size: 0.9em; }
.card-featured { /* flex-grow mayor que 1 */ }
.card-link { color: #e94560; text-decoration: none; font-weight: bold; margin-top: auto; }

/* RETO 4: .footer — flex, wrap, gap. .footer-links — flex:1 */
.footer { background: #050510; padding: 40px; border-top: 1px solid #1a1a2e;
  /* Tu flex aquí */ }
.footer-brand p { color: #666; margin-top: 8px; }
.footer-links { /* flex:1, padding */ }
.footer-links h4 { color: #ffd700; margin-bottom: 12px; }
.footer-links ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.footer-links a { color: #888; text-decoration: none; }`,
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS — Flexbox:
1. .navbar DEBE tener display:flex + justify-content:space-between + align-items:center. REPROBAR si falta cualquiera.
2. .hero DEBE desplegar justify-content:center Y align-items:center para centrado total. REPROBAR si falta.
3. .hero-content DEBE ser flex-direction:column con gap. .hero-buttons DEBE ser flex con gap y flex-wrap. REPROBAR si faltan.
4. .cards-container DEBE ser display:flex con flex-wrap:wrap y gap. REPROBAR si no hay wrap.
5. .card-featured DEBE tener flex-grow > 1. REPROBAR si es igual a las demás cards.
6. .footer DEBE ser display:flex con flex-wrap. REPROBAR si no es flex.
7. REPROBAR el uso de float o position absolute para lograr layouts.`,
  },

  {
    slug: 'M02-E03-variables-css',
    module: 'M02-CSS',
    title: '🎨 La Sala de las Runas',
    description: 'Sistema de diseño con CSS custom properties (variables), modo oscuro/claro, Google Fonts, transiciones y animaciones con @keyframes.',
    sort_order: 3,
    type: 'html',
    html_template: `<!DOCTYPE html>
<html lang="es" class="light-mode">
<head>
    <meta charset="UTF-8">
    <!-- RETO 1: Importa Google Fonts "Inter" (weights 400,600,700) aquí -->
    <title>La Sala de las Runas</title>
    <link rel="stylesheet" href="style.css">
</head>
<!--
📖 TEORÍA: Variables CSS
:root { --color-primario: #6c63ff; }
.btn { background: var(--color-primario); }
Cambio de tema: .dark-mode { --color-primario: #bb86fc; }
Google Fonts: enlace en head + font-family: 'Inter', sans-serif
Transiciones: transition: all 0.3s ease;
Transformaciones: transform: translateY(-5px) scale(1.05)
Animaciones: @keyframes nombre { from { ... } to { ... } }
             .elemento { animation: nombre 0.5s ease forwards; }
-->
<body>
    <header class="topbar">
        <span class="site-title">🔮 Sala de las Runas</span>
        <button id="toggleMode" class="btn-toggle">🌙 Modo Oscuro</button>
    </header>
    <main class="main-content">
        <section class="hero-runa">
            <h1 class="titulo-principal">Las Runas del Código</h1>
            <p class="subtitulo">Cada runa contiene el poder de un concepto fundamental.</p>
        </section>
        <section class="runas-grid">
            <div class="runa-card"><div class="runa-icono">⚡</div><h3>Variables</h3><p>El poder de almacenar y transformar datos.</p><a href="#" class="btn-runa">Explorar</a></div>
            <div class="runa-card"><div class="runa-icono">🔄</div><h3>Ciclos</h3><p>La magia de repetir acciones sin esfuerzo.</p><a href="#" class="btn-runa">Explorar</a></div>
            <div class="runa-card runa-especial"><div class="runa-icono">🧠</div><h3>Funciones</h3><p>Encapsula el conocimiento y reutiliza el poder.</p><a href="#" class="btn-runa">Explorar</a></div>
        </section>
        <section class="input-demo">
            <h2>Prueba las Runas</h2>
            <input type="text" class="input-magico" placeholder="Escribe tu hechizo...">
            <button class="btn-hechizo">✨ Lanzar Hechizo</button>
        </section>
    </main>
    <script>
        // RETO 5: Toggle claro/oscuro
        // Click en #toggleMode:
        // - Si html tiene "light-mode" → quita light-mode, agrega dark-mode, cambia texto a "☀️ Modo Claro"
        // - Si html tiene "dark-mode" → quita dark-mode, agrega light-mode, cambia texto a "🌙 Modo Oscuro"
        const btn = document.getElementById('toggleMode');
        btn.addEventListener('click', () => {
            // Tu código aquí
        });
    </script>
</body>
</html>`,
    css_template: `/* RETO 1: @import de Google Fonts 'Inter' (también agrégalo en el HTML) */

/* RETO 2: Variables CSS en :root/.light-mode y .dark-mode
   Define al menos 5 variables: --color-fondo, --color-superficie, --color-texto, --color-primario, --color-borde */
:root, .light-mode {
  font-family: 'Inter', sans-serif;
  /* Tus variables de modo claro aquí */
}
.dark-mode {
  /* Mismas variables pero con valores oscuros */
}

/* RETO 3: Aplica las variables al diseño */
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background-color: var(--color-fondo); color: var(--color-texto); transition: background-color 0.3s ease, color 0.3s ease; min-height: 100vh; }
.topbar { display: flex; justify-content: space-between; align-items: center; padding: 16px 40px; background: var(--color-superficie); border-bottom: 1px solid var(--color-borde); }
.site-title { font-size: 1.2em; font-weight: 700; color: var(--color-primario); }
.main-content { padding: 60px 40px; max-width: 900px; margin: 0 auto; }
.hero-runa { text-align: center; margin-bottom: 60px; }

/* RETO 4: .titulo-principal con @keyframes de aparición (opacity 0 + translateY → normal) */
/* @keyframes aparecer { ... } */
.titulo-principal { /* font-size 2.5em, font-weight 700, color primario, animation */ }
.subtitulo { /* color texto opacidad, font-size 1.1em, margin-top */ }

.runas-grid { display: flex; gap: 24px; flex-wrap: wrap; justify-content: center; margin-bottom: 60px; }

/* .runa-card: background superficie, borde, padding, border-radius, flex:1, min-width:200px
   TRANSITION para :hover (transform + box-shadow)
   :hover → transform: translateY(-8px), box-shadow con color primario */
.runa-card { }
.runa-card:hover { }
.runa-icono { font-size: 2.5em; margin-bottom: 12px; text-align: center; }
.runa-card h3 { color: var(--color-primario); margin-bottom: 8px; text-align: center; }
.runa-card p { text-align: center; opacity: 0.8; font-size: 0.9em; }
.runa-especial { /* border-left de color acento distinto al primario */ }
/* .btn-runa: inline-block, margin-top 16px, background primario, color blanco
   transition + :hover con scale(1.05) */
.btn-runa { text-decoration: none; display: block; margin-top: 16px; text-align: center; }
.btn-runa:hover { }
.input-demo { text-align: center; }
.input-demo h2 { color: var(--color-primario); margin-bottom: 20px; }
.input-magico { padding: 12px 20px; border: 2px solid var(--color-borde); border-radius: 8px; font-size: 1em; width: 280px; background: var(--color-superficie); color: var(--color-texto); transition: border-color 0.2s ease; }
.input-magico:focus { outline: none; border-color: var(--color-primario); }
.btn-hechizo { margin-left: 10px; padding: 12px 24px; border: none; border-radius: 8px; background: var(--color-primario); color: white; cursor: pointer; transition: transform 0.2s ease; }
.btn-hechizo:hover { transform: scale(1.08); }
.btn-toggle { padding: 8px 16px; border: 1px solid var(--color-borde); border-radius: 20px; background: transparent; color: var(--color-texto); cursor: pointer; }`,
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS — Variables CSS y Animaciones:
1. Debe importar Google Fonts (link en HTML o @import en CSS). REPROBAR si usa la fuente por defecto del browser.
2. DEBE definir variables CSS (mínimo 4) en :root o .light-mode con colores claros. REPROBAR si no usa variables.
3. DEBE definir las MISMAS variables en .dark-mode con valores oscuros. REPROBAR si no hay .dark-mode con variables.
4. Los estilos deben usar var() para colores, no valores hardcodeados. REPROBAR si usa colores fijos sin var().
5. body debe tener transition en background-color y color para cambio suave. REPROBAR si no hay transition en body.
6. .runa-card DEBE tener :hover con transform:translateY Y transition. REPROBAR si solo cambia color.
7. @keyframes DEBE existir y aplicarse a .titulo-principal. REPROBAR si no hay animación definida.
8. El JS del toggle DEBE funcionar alternando clases light-mode/dark-mode en el html. REPROBAR si el JS está vacío.`,
  },

  // ═══ M03-VARS (JS) ═══════════════════════════════════════
  {
    slug: 'M03-E01-variables',
    module: 'M03-VARS',
    title: '📦 El Sistema de Inventario',
    description: 'var vs let vs const, tipos primitivos, typeof, operadores y template literals. Construye el sistema de inventario del Gremio desde cero.',
    sort_order: 1,
    type: 'js',
    html_template: `// =============================================================
// TEORÍA: Variables y Tipos de Datos
// =============================================================
// var   → ámbito global/función, se puede redeclarar ⚠️ EVITAR
// let   → ámbito de bloque {}, reasignable
// const → ámbito de bloque {}, NO reasignable
//
// Tipos: string | number | boolean | undefined | null
// typeof variable → devuelve el tipo como string
// Template literals: \`Hola \${nombre}\`
// Operadores: + - * / % ** += -= ++ --
// =============================================================
// MISIÓN: El Sistema de Inventario del Gremio
// =============================================================

// RETO 1: Declara el Item "Espada del Amanecer"
// - nombre (string, no cambia) → ¿const o let?
// - precio (number 2500, va a cambiar) → ¿const o let?
// - disponible (boolean true, puede cambiar) → ¿const o let?
// - codigo: declárala SIN asignar valor (quedará undefined)
// Tu código aquí:



// RETO 2: Aplica descuento del 18%
// 1. Guarda el precio original en una const ANTES de cambiar precio
// 2. Reasigna 'precio' con el descuento aplicado (no redeclares)
// 3. Calcula precioFinal con 12% de impuesto (const)
// 4. Calcula ahorro = precioOriginal - precioFinal (const)
// Tu código aquí:



console.log("Precio con descuento:", precio);
console.log("Precio final:", precioFinal);
console.log("Ahorro:", ahorro);

// RETO 3: Template literal
// Construye: "Item: [nombre] | Precio: $[X.XX] | Estado: [Disponible/Agotado] | Código: [codigo ?? 'SIN CÓDIGO']"
// - Usa .toFixed(2) para el precio
// - Usa ternario para el estado
// - Usa ?? para codigo (si es undefined → 'SIN CÓDIGO')
const mensajeItem = "";  // ← reemplaza "" con el template literal
console.log(mensajeItem);

// RETO 4: Inspector de tipos
// Crea objeto 'reporte' con typeof de cada variable. Luego itera e imprime.
const reporte = {
  // completa con typeof de cada variable
};
for (const clave in reporte) {
  console.log(clave + ":", reporte[clave]);
}

// RETO 5: El Carrito
// Declara 3 items con nombre y precio.
// Calcula subtotal, aplica impuesto 12%, muestra:
// "🛒 Carrito: [item1], [item2], [item3] | Subtotal: $XX.XX | Total: $XX.XX"
// Tu código aquí:`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS JavaScript — Variables:
1. RETO 1: nombre debe ser const, precio y disponible deben ser let. REPROBAR si usa var o const para precio/disponible.
2. RETO 1: 'codigo' debe declararse SIN valor asignado. REPROBAR si se le asigna un valor.
3. RETO 2: precio debe REASIGNARSE (no redeclararse). REPROBAR si redeclara con let o const.
4. RETO 3: DEBE usar backtick template literal, NO concatenación con +. DEBE usar ternario y ??. REPROBAR si usa concatenación.
5. RETO 4: reporte debe usar typeof en tiempo de ejecución. REPROBAR si hardcodea strings como "number" sin typeof.
6. RETO 5: Debe calcular subtotal, aplicar impuesto, y mostrar mensaje con los 3 items. REPROBAR si falta el impuesto.`,
  },

  {
    slug: 'M03-E02-tipos-conversion',
    module: 'M03-VARS',
    title: '🔄 El Convertidor de Grimorios',
    description: 'Coerción de tipos, parseInt, parseFloat, Number, String, Boolean, isNaN, ===  vs ==, y métodos de String.',
    sort_order: 2,
    type: 'js',
    html_template: `// =============================================================
// TEORÍA: Conversión y Coerción de Tipos
// =============================================================
// COERCIÓN IMPLÍCITA:  "5" + 3 → "53"  |  "5" - 3 → 2
// CONVERSIÓN EXPLÍCITA:
//   Number("42") → 42    Number("hola") → NaN
//   parseInt("42px") → 42   parseFloat("3.14km") → 3.14
//   String(42) → "42"   Boolean(0) → false   Boolean("") → false
// Falsy: 0, "", null, undefined, NaN, false
// == (débil, coerciona)  vs  === (estricto, no coerciona)
// Métodos de String:
//   toUpperCase() toLowerCase() trim() includes() startsWith()
//   split(" ") replace() slice(1,3) padStart(5,"0") indexOf()
// =============================================================
// MISIÓN: El Convertidor del Gremio
// =============================================================

// RETO 1: Predice la coerción (escribe tu predicción como comentario)
const r1 = "10" + 5;           // Predicción:
const r2 = "10" - 5;           // Predicción:
const r3 = true + true + 1;    // Predicción:
const r4 = null + undefined;   // Predicción:
const r5 = "5" * "3";          // Predicción:
const r6 = false + "1";        // Predicción:
console.log(r1, r2, r3, r4, r5, r6);

// RETO 2: Convierte los strings del formulario
const edadStr   = "23";
const precioStr = "  1500.75  ";  // tiene espacios
const danioStr  = "999daño";      // texto mezclado
const inputRoto = "no-es-numero";

const edadNum    = /* Number o parseInt */ undefined;
const precioNum  = /* trim + parseFloat */ undefined;
const danioNum   = /* parseInt */ undefined;
const inputNum   = /* Number() */ undefined;
console.log(edadNum, precioNum, danioNum, inputNum);

// RETO 3: Función esNumeroValido(valor)
// Convierte a Number, verifica con Number.isNaN y Number.isFinite
// Devuelve true solo si es número válido y finito
function esNumeroValido(valor) {
  // Tu código aquí
}
console.log(esNumeroValido("42"));    // true
console.log(esNumeroValido("hola"));  // false
console.log(esNumeroValido(null));    // false
console.log(esNumeroValido(Infinity)); // false

// RETO 4: Normaliza nombres a Title Case (sin espacios extra)
const nombres = ["  aragorn  el viajero  ", "LEGOLAS VERDEBOSQUE", "gimli hijo de gloin"];
// Usa trim() + split con /\s+/ + map con capitalize + join
const nombresNormalizados = nombres.map(n => {
  // Tu código aquí
});
console.log(nombresNormalizados); // ["Aragorn El Viajero", "Legolas Verdebosque", "Gimli Hijo De Gloin"]

// RETO 5: === vs == trampas
const trap1 = (0 == false);   // Predicción y por qué (comentario):
const trap2 = (0 === false);  // Predicción y por qué:
const trap3 = (null == undefined);  // Predicción y por qué:
const trap4 = (NaN === NaN);        // Predicción y por qué:
console.log({ trap1, trap2, trap3, trap4 });`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS JavaScript — Tipos:
1. RETO 1: Resultados correctos: r1="105", r2=5, r3=3, r4=NaN, r5=15, r6="false1". Los comentarios con predicciones DEBEN existir. REPROBAR si no hay predicciones comentadas.
2. RETO 2: precioStr DEBE usar trim() antes de parseFloat. danioStr DEBE usar parseInt (para obtener 999, no NaN). REPROBAR si usa Number() para danioStr.
3. RETO 3: DEBE usar Number.isNaN (no isNaN global). DEBE usar Number.isFinite. REPROBAR si usa isNaN global.
4. RETO 4: DEBE manejar espacios múltiples (split con regex o similar). Resultados deben ser Title Case. REPROBAR si no usa trim() o no maneja espacios internos múltiples.
5. RETO 5: Resultados: trap1=true, trap2=false, trap3=true, trap4=false. Los comentarios explicando POR QUÉ son obligatorios. REPROBAR si no hay explicaciones.`,
  },

  {
    slug: 'M03-E03-string-methods',
    module: 'M03-VARS',
    title: '📜 El Grimorio de los Strings',
    description: 'Domina los métodos de String: validación, manipulación, búsqueda, cifrado. Construye utilidades reales para el Gremio.',
    sort_order: 3,
    type: 'js',
    html_template: `// =============================================================
// MISIÓN: El Grimorio de los Strings
// Métodos de referencia: length trim includes startsWith endsWith
// split join replace replaceAll slice padStart indexOf repeat
// toUpperCase toLowerCase charCodeAt fromCharCode
// =============================================================

// RETO 1: Validador de contraseña del Gremio
// validarContrasena(pass) verifica: >= 8 caracteres, no empieza/termina con espacio,
// tiene al menos un número (/\d/.test), tiene al menos una mayúscula (/[A-Z]/.test)
// Devuelve: { valida: boolean, errores: ["mensaje1", ...] }
function validarContrasena(pass) {
  const errores = [];
  // Agrega al array errores cuando no cumple una regla
  return { valida: errores.length === 0, errores };
}
console.log(validarContrasena("hola"));          // inválida (varios errores)
console.log(validarContrasena(" MiPass1 "));     // inválida (espacios)
console.log(validarContrasena("MiGremio1"));     // válida

// RETO 2: Parseador de mensajes del Gremio
// El mensaje llega como "nombre|nivel|misiones|rango"
// parsearMensaje(msg): separa por "|", capitaliza nombre, nivel/misiones a number,
// rango en MAYÚSCULAS, devuelve objeto con campo 'resumen' usando template literal
function parsearMensaje(msg) {
  // Tu código aquí
}
console.log(parsearMensaje("aragorn|15|42|maestro"));

// RETO 3: Buscador y reemplazador en el Grimorio
// procesarGrimorio(texto, buscar, reemplazar):
// 1. Cuenta ocurrencias de 'buscar' (split trick)
// 2. Reemplaza TODAS las ocurrencias (replaceAll)
// 3. Devuelve { texto: textoModificado, ocurrencias: numero }
function procesarGrimorio(texto, buscar, reemplazar) {
  // Tu código aquí
}
const grimorio = "El fuego consume. El fuego purifica. Sin fuego no hay luz.";
console.log(procesarGrimorio(grimorio, "fuego", "🔥"));

// RETO 4: Generador de IDs del Gremio
// generarId(nombreCompleto, anio, numero) → "GLD-[INICIALES]-[AÑO]-[0007]"
// Iniciales: primera letra de cada palabra en mayúsculas
// Numero: padStart(4, "0")
function generarId(nombreCompleto, anio, numero) {
  // Tu código aquí
}
console.log(generarId("Aragorn El Viajero", 2025, 1));   // GLD-AEV-2025-0001
console.log(generarId("Gandalf El Gris", 2024, 999));    // GLD-GEG-2024-0999

// RETO 5: Cifrado César
// cifrar(texto, n): desplaza letras N posiciones en el alfabeto (A→D para n=3)
// Solo afecta letras, deja espacios y símbolos intactos
// descifrar(texto, n): revierte el cifrado
// Pista: charCodeAt, fromCharCode, ((code - base + n) % 26) + base
function cifrar(texto, n) { /* Tu código */ }
function descifrar(texto, n) { /* Tu código */ }
const original = "Gremio de Codigo";
const cifrado = cifrar(original, 3);
console.log("Cifrado:", cifrado);
console.log("Coinciden:", original === descifrar(cifrado, 3));`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS — Métodos de String:
1. RETO 1: validarContrasena DEBE verificar las 4 reglas y devolver {valida, errores: []}. REPROBAR si devuelve solo boolean o si no verifica las 4 condiciones.
2. RETO 2: parsearMensaje DEBE usar split("|"), convertir nivel y misiones a number, capitalizar nombre (no toUpperCase completo), rango a mayúsculas, y devolver objeto con resumen. REPROBAR si no usa split.
3. RETO 3: DEBE contar ocurrencias Y reemplazar TODAS. split trick es: (texto.split(buscar).length - 1). replaceAll o regex g. REPROBAR si usa .replace() que solo reemplaza la primera.
4. RETO 4: DEBE usar padStart(4,"0") para el número. Iniciales de CADA PALABRA. REPROBAR si no usa padStart.
5. RETO 5: cifrar Y descifrar DEBEN existir y el texto debe descifrar al original. REPROBAR si solo implementa una función.`,
  },

  // ═══ M04-IF ══════════════════════════════════════════════
  {
    slug: 'M04-E01-if-else',
    module: 'M04-IF',
    title: '🚪 El Guardián de las Puertas',
    description: 'if/else, operadores lógicos (&&, ||, !), switch/case, ternario, guard clauses y nullish coalescing. Sistema de control de acceso completo.',
    sort_order: 1,
    type: 'js',
    html_template: `// =============================================================
// TEORÍA: Decisiones en JavaScript
// =============================================================
// if (cond) {} else if (cond) {} else {}
// && (AND)  || (OR)  ! (NOT)
// === !== > < >= <=
// Ternario: cond ? valorTrue : valorFalse
// switch (val) { case "a": break; default: }
// ?? (nullish coalescing): x ?? "default"  → solo si x es null/undefined
// ?. (optional chaining): obj?.prop?.sub   → undefined si alguno no existe
// Guard clauses: return early para evitar if anidados
// =============================================================
// MISIÓN: Sistema de Control de Acceso del Gremio
// =============================================================

// RETO 1: puedeEntrar(heroe) — verifica acceso con && y ||
// El guardián permite SI: nivel >= 5 AND esActivo === true
//                    OR el heroe.rangos incluye "Maestro", "Leyenda" o "Guardián"
// Devuelve: { acceso: boolean, mensaje: string específico }
function puedeEntrar(heroe) {
  const rangosEspeciales = ["Maestro", "Leyenda", "Guardián"];
  // Tu código con if/else combinando && y || y .some()
}
console.log(puedeEntrar({ nombre: "Frodo", nivel: 3, esActivo: true, rangos: [] }));
console.log(puedeEntrar({ nombre: "Aragorn", nivel: 15, esActivo: true, rangos: ["Maestro"] }));
console.log(puedeEntrar({ nombre: "Sauron", nivel: 99, esActivo: false, rangos: [] }));

// RETO 2: clasificarMision(dificultad, recompensa, tiempoHoras)
// Categoría: 1-3 "Aprendiz" | 4-6 "Veterano" | 7-9 "Élite" | 10 "Legendaria"
// Rentable si recompensa / tiempoHoras >= 100
// Prioridad: ALTA si Élite/Legendaria Y rentable | MEDIA si solo una | BAJA si ninguna
function clasificarMision(dificultad, recompensa, tiempoHoras) {
  // Tu código con if/else if para categoría + lógica para rentable y prioridad
}
console.log(clasificarMision(8, 800, 4));    // Élite, rentable, ALTA
console.log(clasificarMision(5, 50, 10));   // Veterano, no rentable, BAJA

// RETO 3: ejecutarComando(cmd, heroe) — switch con 4 casos + default
// "estado" → nombre y nivel | "inventario" → items ?? 0
// "misiones" → heroe.progreso?.misionesActivas ?? 0 | "salir" → despedida
// default → "Comando no reconocido..."
function ejecutarComando(cmd, heroe) {
  // Tu código con switch
}
const heroe = { nombre: "Bilbo", nivel: 7, items: 12, progreso: { misionesActivas: 3 } };
console.log(ejecutarComando("estado", heroe));
console.log(ejecutarComando("inventario", { nombre: "Sméagol", nivel: 5 })); // sin items
console.log(ejecutarComando("misiones", { nombre: "Frodo", nivel: 8 }));    // sin progreso
console.log(ejecutarComando("atacar", heroe));

// RETO 4: Guard Clauses — procesarSolicitudMision(solicitud)
// Valida con return early (al menos 4 guards):
// 1. solicitud null/undefined → "Error: solicitud inválida"
// 2. sin heroe → "Error: héroe requerido"
// 3. heroe.nivel < nivelMinimo → "Nivel insuficiente: requiere X, tienes Y"
// 4. plazas <= 0 → "Sin plazas disponibles"
// 5. OK → "Solicitud aceptada para [mision.nombre ?? 'Sin nombre']"
function procesarSolicitudMision(solicitud) {
  // Tu código con guard clauses (return early)
}
console.log(procesarSolicitudMision(null));
console.log(procesarSolicitudMision({ heroe: { nombre: "Aragorn", nivel: 15 }, nivelMinimo: 5, plazas: 1, mision: { nombre: "El Anillo" } }));`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS — Decisiones:
1. RETO 1: puedeEntrar DEBE usar && y || combinados. Mensaje debe ser ESPECÍFICO según la razón de rechazo. REPROBAR si el mensaje es genérico para todos los rechazos.
2. RETO 2: clasificarMision DEBE usar if/else if para 4 categorías, calcular oro/hora para rentabilidad, y determinar prioridad. REPROBAR si no calcula la rentabilidad.
3. RETO 3: ejecutarComando DEBE usar switch con 4 cases + default. DEBE usar ?? para items y ?. para optional chaining en progreso. REPROBAR si usa if/else en vez de switch.
4. RETO 4: procesarSolicitudMision DEBE usar guard clauses (múltiples return early planos). REPROBAR si usa if/else anidados en vez de guard clauses.`,
  },

  {
    slug: 'M04-E02-logica-avanzada',
    module: 'M04-IF',
    title: '⚡ La Máquina de Decisiones',
    description: 'Switch con fall-through, ternarios anidados, short-circuit evaluation, motor de reglas de negocio y máquina de estados.',
    sort_order: 2,
    type: 'js',
    html_template: `// =============================================================
// TEORÍA AVANZADA: Decisiones
// =============================================================
// FALL-THROUGH en switch (sin break, cae al siguiente case):
//   case "Lunes": case "Martes": console.log("día laboral"); break;
// SHORT-CIRCUIT:
//   a && b  → si a es falsy devuelve a; si truthy devuelve b
//   a || b  → si a es truthy devuelve a; si falsy devuelve b
//   a ?? b  → si a es null/undefined devuelve b; si no, devuelve a
// DIFERENCIA || vs ??:
//   "" || "default" → "default"  (porque "" es falsy)
//   "" ?? "default" → ""         (?? solo actúa con null/undefined)
// =============================================================

// RETO 1: switch con fall-through
// planDeDia(dia): Lunes/Miércoles/Viernes → "Entrenamiento + código"
// Martes/Jueves → "Misiones + práctica" | Sábado → "Libre + revisión"
// Domingo → "Descanso + planificación" | default → "Día inválido: " + dia
function planDeDia(dia) {
  // Tu switch CON fall-through (comparte case sin break)
}
["Lunes", "Martes", "Sábado", "Domingo", "Festivo"].forEach(d =>
  console.log(d + ":", planDeDia(d))
);

// RETO 2: Ternarios anidados (sin if/else)
// obtenerInsignia(posicion): solo con ternarios
// pos 1 → "🥇 Campeón" | 2-3 → "🥈🥉 Podio" | 4-10 → "⭐ Top 10"
// 11-50 → "✅ Clasificado" | resto → "📋 Participante"
const obtenerInsignia = (pos) =>
  /* Tu cadena de ternarios */  "";
[1, 2, 5, 25, 100].forEach(p => console.log("Pos " + p + ":", obtenerInsignia(p)));

// RETO 3: Short-circuit para defaults seguros
// perfilCompleto(heroe) usa ?? y ?. para todos los campos:
// - nombre: usa ?? para "Héroe Desconocido" si es null/undefined
// - nivel: usa ?? para 0 como default válido (nivel 0 es posible)
// - gremio: usa || para "Sin Gremio" (aquí string vacío también → "Sin Gremio")
// - misiones: usa ?. para acceso seguro a heroe.progreso?.misiones ?? 0
// - titulo: usa && con || para: nivel>=10 && "Veterano" || nivel>=5 && "Aprendiz" || "Novato"
function perfilCompleto(heroe) {
  // Tu código con ?? y ?.
  return ""; // devuelve string formateado
}
console.log(perfilCompleto({ nombre: "Aragorn", nivel: 15, gremio: "Norteños", progreso: { misiones: 42 } }));
console.log(perfilCompleto({}));
console.log(perfilCompleto({ nombre: null, nivel: 0 })); // nivel 0 válido, ?? no lo reemplaza

// RETO 4: Motor de reglas con array de funciones
// evaluarReglas(datos, reglas): regla = { prioridad, mensaje, condicion: (d) => bool }
// 1. Filtra reglas cuya condicion(datos) === true
// 2. Ordena por prioridad asc (menor = más importante)
// 3. Devuelve array de mensajes o ["Sin alertas"] si ninguna aplica
function evaluarReglas(datos, reglas) {
  // Tu código
}
const data = { cpu: 85, memoria: 92, errores: 55 };
const reglas = [
  { prioridad: 1, mensaje: "MEMORIA CRÍTICA", condicion: d => d.memoria > 90 },
  { prioridad: 1, mensaje: "ERRORES CRÍTICOS", condicion: d => d.errores > 50 },
  { prioridad: 2, mensaje: "CPU ELEVADO",      condicion: d => d.cpu > 80 },
];
console.log(evaluarReglas(data, reglas));
console.log(evaluarReglas({ cpu: 30, memoria: 40, errores: 2 }, reglas));`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS — Decisiones Avanzadas:
1. RETO 1: DEBE usar switch con fall-through real (múltiples cases sin break compartiendo código). REPROBAR si usa if/else o si cada case tiene break.
2. RETO 2: obtenerInsignia DEBE implementarse SOLO con ternarios, sin ningún if/else. REPROBAR si usa if/else.
3. RETO 3: nivel DEBE usar ?? (no ||) para preservar nivel=0. nombre DEBE usar ??. gremio puede usar ||. misiones DEBE usar ?. para optional chaining. REPROBAR si usa || para nivel (ya que 0 daría default).
4. RETO 4: evaluarReglas DEBE filtrar, ordenar por prioridad y devolver ["Sin alertas"] cuando no hay coincidencias. REPROBAR si no ordena o si no devuelve el mensaje de sin alertas.`,
  },

  {
    slug: 'M04-E03-decisiones-complejas',
    module: 'M04-IF',
    title: '🧩 El Árbol de Decisiones',
    description: 'Sistemas de decisión complejos: reglas encadenadas, máquina de estados finitos, validaciones en cascada y descuentos acumulables.',
    sort_order: 3,
    type: 'js',
    html_template: `// =============================================================
// MISIÓN: Sistemas de Decisión Complejos
// =============================================================

// RETO 1: calcularDescuento(precio, usuario)
// usuario: { esVIP, antiguedadAnios, misionesCompletadas, codigoCupon }
// Descuentos ACUMULABLES:
//   esVIP → -10%  |  antiguedad >= 2 años → -5%
//   misiones >= 50 → -5%  |  codigoCupon === "GREMIO2025" → -15%
//   Máximo total: 30%
// Devuelve: { precioOriginal, descuentoTotal, precioFinal, descuentos: [] }
function calcularDescuento(precio, usuario) {
  const descuentos = [];
  let pct = 0;
  // Suma los porcentajes y registra en descuentos[]
  pct = Math.min(pct, 30); // máximo
  const precioFinal = precio * (1 - pct / 100);
  return { precioOriginal: precio, descuentoTotal: pct, precioFinal: +precioFinal.toFixed(2), descuentos };
}
const u1 = { esVIP: true, antiguedadAnios: 3, misionesCompletadas: 60, codigoCupon: "GREMIO2025" };
const u2 = { esVIP: false, antiguedadAnios: 1, misionesCompletadas: 10, codigoCupon: null };
console.log(calcularDescuento(1000, u1));  // todos los descuentos, máx 30%
console.log(calcularDescuento(1000, u2));  // sin descuento

// RETO 2: Máquina de Estados
// Estados válidos: pendiente → en_curso → completada | fallida
// transicionarMision(estadoActual, nuevoEstado):
// - switch sobre estadoActual
// - Dentro de cada case, valida si nuevoEstado es una transición válida
// - Devuelve: { exito: boolean, estado: (nuevo o actual), mensaje: string }
function transicionarMision(estadoActual, nuevoEstado) {
  // Tu switch + if/else para validar transición
}
console.log(transicionarMision("pendiente", "en_curso"));     // ✅
console.log(transicionarMision("pendiente", "completada"));   // ❌
console.log(transicionarMision("en_curso", "completada"));    // ✅
console.log(transicionarMision("completada", "en_curso"));    // ❌

// RETO 3: Validador en cascada
// validarRegistro(datos) con guard clauses:
// datos: { nombre, email, nivel, gremio }
// Guards: 1. datos es null/undefined   2. nombre vacío/undefined
//         3. email no contiene "@"     4. nivel no es number o < 1 o > 100
//         5. gremio.nombre es undefined (optional chaining)
// Si pasa todo: devuelve objeto normalizado: { nombre: trim+capitalize, email: lowercase, nivel, gremio: gremio.nombre }
function validarRegistro(datos) {
  // Tu código con guard clauses
}
console.log(validarRegistro(null));
console.log(validarRegistro({ nombre: "  legolas  ", email: "LEGOLAS@GREMIO.COM", nivel: 18, gremio: { nombre: "Bosque" } }));
console.log(validarRegistro({ nombre: "Frodo", email: "no-es-email", nivel: 5, gremio: { nombre: "Comarca" } }));`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS — Decisiones Complejas:
1. RETO 1: calcularDescuento DEBE verificar las 4 condiciones, acumular porcentajes, aplicar Math.min(pct,30), y devolver array 'descuentos' con nombres de cada descuento aplicado. REPROBAR si no limita al 30% o si no devuelve el array.
2. RETO 2: transicionarMision DEBE usar switch para estadoActual. Dentro de cada case, debe validar el nuevo estado con if. REPROBAR si usa if/else para el estadoActual.
3. RETO 3: validarRegistro DEBE usar guard clauses (return early), normalizar nombre con trim+capitalize, email a lowercase, y usar optional chaining para gremio.nombre. REPROBAR si usa if anidados en vez de guard clauses.`,
  },

  // ═══ M05-FOR ══════════════════════════════════════════════
  {
    slug: 'M05-E01-for-loops',
    module: 'M05-FOR',
    title: '🔄 La Forja del Artesano',
    description: 'for clásico, for...of, for...in, break y continue. Procesamiento de datos sin métodos de array.',
    sort_order: 1,
    type: 'js',
    html_template: `// =============================================================
// TEORÍA: Bucles en JavaScript
// =============================================================
// for (let i = 0; i < n; i++) { }   → clásico
// for (const item of array) { }     → itera colecciones
// for (const clave in objeto) { }   → itera claves de objeto
// break → sale del bucle inmediatamente
// continue → salta a la siguiente iteración
// while (cond) { }   do { } while (cond);
// =============================================================

// RETO 1: tablaMultiplicar(numero, hasta=10)
// Imprime "7 x 1 = 7" para cada resultado (for clásico)
// Devuelve array con los resultados numéricos
function tablaMultiplicar(numero, hasta = 10) {
  const resultados = [];
  // Tu for clásico aquí
  return resultados;
}
tablaMultiplicar(7);
console.log("Tabla 9 hasta 5:", tablaMultiplicar(9, 5));

// RETO 2: Misiones y búsqueda con break/continue
const misiones = [
  { id: 1, nombre: "Explorar Caverna", dificultad: 3, completada: false, rechazada: false },
  { id: 2, nombre: "Proteger Aldea", dificultad: 7, completada: true, rechazada: false },
  { id: 3, nombre: "Recuperar Artefacto", dificultad: 9, completada: false, rechazada: true },
  { id: 4, nombre: "Escoltar", dificultad: 2, completada: false, rechazada: false },
  { id: 5, nombre: "Derrotar Dragón", dificultad: 10, completada: false, rechazada: false },
];

// 2a: for...of + continue → misiones activas (no completadas ni rechazadas)
function getMisionesActivas(misiones) {
  const activas = [];
  for (const m of misiones) {
    // Usa continue para saltar completadas y rechazadas
  }
  return activas;
}
console.log("Activas:", getMisionesActivas(misiones).map(m => m.nombre));

// 2b: for clásico + break → primera misión con dificultad >= umbral
function primeraMisionDificil(misiones, umbral = 9) {
  // Tu código — detente al encontrarla (break)
}
console.log("Primera difícil:", primeraMisionDificil(misiones));

// RETO 3: calcularStats(heroes) en UN SOLO for...of sin métodos de array
// Calcula: promedio de nivel, nivelMax + héroe, totalMisiones, heroesActivos
const heroes = [
  { nombre: "Aragorn", nivel: 15, misiones: 42, activo: true },
  { nombre: "Legolas", nivel: 18, misiones: 38, activo: true },
  { nombre: "Gimli",   nivel: 12, misiones: 29, activo: false },
  { nombre: "Gandalf", nivel: 50, misiones: 99, activo: true },
];
function calcularStats(heroes) {
  let sumaLevels = 0, maxNivel = 0, heroMax = "", totalMisiones = 0, activos = 0;
  for (const h of heroes) {
    // Tu código — calcula TODO en un solo bucle
  }
  return { promedio: (sumaLevels / heroes.length).toFixed(1), maxNivel, heroMax, totalMisiones, activos };
}
console.log(calcularStats(heroes));

// RETO 4: Inspector con for...in
// Para cada clave del objeto: boolean → "✅/❌ clave: Activado/Desactivado"
//                             number  → "🔢 clave: valor"
//                             string  → "📝 clave: 'valor'"
const config = { debug: true, maxConexiones: 100, entorno: "produccion", cache: false, timeout: 30 };
function inspeccionar(obj) {
  for (const clave in obj) {
    // Tu código con typeof
  }
}
inspeccionar(config);`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS — Bucles:
1. RETO 1: tablaMultiplicar DEBE usar for clásico. Debe imprimir Y devolver array. REPROBAR si usa forEach u otros métodos.
2. RETO 2a: getMisionesActivas DEBE usar for...of CON continue. REPROBAR si usa filter().
3. RETO 2b: primeraMisionDificil DEBE usar break al encontrar el primer resultado. REPROBAR si no usa break.
4. RETO 3: calcularStats DEBE calcular todo en UN SOLO for...of. REPROBAR si usa .filter, .map o .reduce.
5. RETO 4: inspeccionar DEBE usar for...in (no Object.keys o for...of). DEBE usar typeof para diferenciar tipos. REPROBAR si no usa for...in.`,
  },

  {
    slug: 'M05-E02-while-loops',
    module: 'M05-FOR',
    title: '⏳ El Centinela Eterno',
    description: 'while, do-while, Fibonacci, procesamiento de colas, búsqueda binaria. Aprende cuándo usar cada tipo de bucle.',
    sort_order: 2,
    type: 'js',
    html_template: `// =============================================================
// TEORÍA: while vs do...while
// while (cond) { }     → Verifica ANTES. 0 o más ejecuciones.
// do { } while (cond)  → Verifica DESPUÉS. Siempre ejecuta al menos 1 vez.
// Cuándo usar:
//   for → conoces el número de iteraciones
//   while → iteras MIENTRAS una condición (no sabes cuántas veces)
//   do-while → necesitas ejecutar AL MENOS UNA VEZ antes de verificar
// =============================================================

// RETO 1: fibonacci(limite) con while
// Devuelve array de números de Fibonacci <= limite
// [0, 1, 1, 2, 3, 5, 8, 13, 21, ...] hasta <= limite
function fibonacci(limite) {
  // Tu código con while
}
console.log(fibonacci(100)); // [0,1,1,2,3,5,8,13,21,34,55,89]
console.log(fibonacci(10));  // [0,1,1,2,3,5,8]

// RETO 2: procesarCola(cola, tamanoLote=3) con while anidados
// Procesa array en lotes de tamanoLote usando shift()
// Imprime cada lote e historial de procesamiento
const cola = [
  { id: 1, tipo: "reclutamiento" }, { id: 2, tipo: "mision" },
  { id: 3, tipo: "recompensa" },    { id: 4, tipo: "mision" },
  { id: 5, tipo: "reclutamiento" }, { id: 6, tipo: "recompensa" },
  { id: 7, tipo: "mision" },
];
function procesarCola(cola, tamanoLote = 3) {
  const local = [...cola];
  let loteNum = 1;
  while (/* cola no está vacía */) {
    const lote = [];
    let i = 0;
    while (/* i < tamanoLote Y todavía hay en local */) {
      lote.push(local.shift());
      i++;
    }
    console.log("Lote " + loteNum + ":", lote.map(x => "#" + x.id).join(", "));
    loteNum++;
  }
  console.log("Total lotes:", loteNum - 1);
}
procesarCola(cola);

// RETO 3: sesionEntrenamiento(nombre) con do...while
// El héroe lanza dado (1-6) y acumula puntos hasta 20+ O 10 rondas
// do...while garantiza al menos 1 lanzamiento
// dado: Math.floor(Math.random() * 6) + 1
function sesionEntrenamiento(nombre) {
  let puntos = 0, rondas = 0;
  do {
    const dado = Math.floor(Math.random() * 6) + 1;
    puntos += dado;
    rondas++;
    console.log("  Ronda " + rondas + ": dado=" + dado + " total=" + puntos);
  } while (/* condición de continuación: puntos < 20 Y rondas < 10 */);
  console.log(nombre + ": " + rondas + " rondas, " + puntos + " puntos. " + (puntos >= 20 ? "🏆 Superó 20!" : "❌ Límite rodas."));
}
sesionEntrenamiento("Frodo");

// RETO 4: busquedaBinaria(array, objetivo) con while
// El array DEBE estar ordenado. Divide el espacio de búsqueda a la mitad en cada paso.
// izq=0, der=length-1. Cada paso: medio = floor((izq+der)/2)
// Devuelve { indice, pasos } o { indice: -1, pasos }
function busquedaBinaria(array, objetivo) {
  let izq = 0, der = array.length - 1, pasos = 0;
  // Tu while con el algoritmo
  return { indice: -1, pasos };
}
const arr = [1, 3, 5, 7, 10, 12, 15, 18, 20, 25, 30, 42, 50, 75, 99];
console.log(busquedaBinaria(arr, 42));  // { indice: 11, pasos: ... }
console.log(busquedaBinaria(arr, 5));   // { indice: 2, pasos: ... }
console.log(busquedaBinaria(arr, 100)); // { indice: -1, ... }`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS — while y do-while:
1. RETO 1: fibonacci DEBE usar while. Resultado correcto para limite=100: [0,1,1,2,3,5,8,13,21,34,55,89]. REPROBAR si usa for.
2. RETO 2: DEBE usar while externo (condicion: longitud > 0) Y while interno para el lote. DEBE usar .shift(). REPROBAR si usa for o slice.
3. RETO 3: DEBE usar do...while. La condición DEBE verificar AMBAS condiciones de salida (puntos < 20 AND rondas < 10). REPROBAR si usa while normal o solo verifica una condición.
4. RETO 4: busquedaBinaria DEBE implementar el algoritmo correcto. Resultado para objetivo=42 debe tener indice correcto. REPROBAR si hace búsqueda lineal.`,
  },

  {
    slug: 'M05-E03-nested-loops',
    module: 'M05-FOR',
    title: '🌀 Los Laberintos del Código',
    description: 'Bucles anidados, matrices 2D, Bubble Sort y búsqueda en matrices. Algoritmos clásicos implementados paso a paso.',
    sort_order: 3,
    type: 'js',
    html_template: `// =============================================================
// MISIÓN: Bucles Anidados y Matrices
// Una matriz = array de arrays: m[fila][columna]
// Bubble Sort: compara pares adyacentes, intercambia si están invertidos
// =============================================================

// RETO 1: crearMapa(filas, columnas, default="⬛") y imprimirMapa(mapa)
// Usa for anidados para crear la matriz y for...of para imprimirla
function crearMapa(filas, columnas, valorDefault = "⬛") {
  const mapa = [];
  // Tu for anidado aquí
  return mapa;
}
function imprimirMapa(mapa) {
  // for...of + join("")
}
const mapa = crearMapa(5, 8);
mapa[0][0] = "🧙"; mapa[4][7] = "🏆"; mapa[2][3] = "🧱"; mapa[2][4] = "🧱";
imprimirMapa(mapa);

// RETO 2: tablaCompleta(n) — tabla de multiplicar nxn con padStart(4)
// Formato: "   1   2   3..." (cada número en 4 caracteres con padStart)
function tablaCompleta(n) {
  // For anidado: fila i, columna j, acumula cada i*j.toString().padStart(4)
}
console.log("=== Tabla 6x6 ===");
tablaCompleta(6);

// RETO 3: bubbleSort(array) — NO usa el original, devuelve { ordenado, intercambios }
// Algoritmo: bucle externo (pasadas), bucle interno (comparaciones arr[j] vs arr[j+1])
// Intercambia con: [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
function bubbleSort(array) {
  const arr = [...array];
  let intercambios = 0;
  // Tu while/for anidado
  return { ordenado: arr, intercambios };
}
const nums = [15, 3, 8, 1, 42, 7, 23, 5, 99, 12];
const r = bubbleSort(nums);
console.log("Ordenado:", r.ordenado);
console.log("Intercambios:", r.intercambios);
console.log("Original intacto:", nums); // debe ser el mismo

// RETO 4: buscarEnMatriz(matriz, valor) — devuelve TODAS las posiciones [fila, col]
// Usa for anidados para buscar. Devuelve null si no encuentra nada.
function buscarEnMatriz(matriz, valor) {
  const posiciones = [];
  // Tu for anidado
  return posiciones.length > 0 ? posiciones : null;
}
const grid = [[5,3,8,1],[2,9,3,7],[4,3,6,2],[8,1,5,3]];
console.log(buscarEnMatriz(grid, 3));  // [[0,1],[1,2],[2,1],[3,3]]
console.log(buscarEnMatriz(grid, 99)); // null`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS — Bucles Anidados:
1. RETO 1: crearMapa DEBE usar for anidados. REPROBAR si usa Array.from o fill sin bucles.
2. RETO 2: tablaCompleta DEBE usar for anidados Y usar padStart(4) para alineación. REPROBAR si no hay alineación.
3. RETO 3: bubbleSort DEBE implementar el algoritmo con for/while anidados. REPROBAR si usa Array.prototype.sort(). El array original NO debe modificarse (copia con spread).
4. RETO 4: buscarEnMatriz DEBE usar for anidados y devolver TODAS las posiciones como arrays [fila, col]. REPROBAR si devuelve solo la primera o no devuelve null cuando no encuentra.`,
  },

  // ═══ M06-FN ══════════════════════════════════════════════
  {
    slug: 'M06-E01-funciones-base',
    module: 'M06-FN',
    title: '🛠️ La Librería de Utilidades',
    description: 'Declaración, expresión y arrow functions. Parámetros por defecto, rest parameters, scope, hoisting y un objeto Utils con utilidades reales.',
    sort_order: 1,
    type: 'js',
    html_template: `// =============================================================
// TEORÍA: Funciones en JavaScript
// =============================================================
// DECLARACIÓN: function saludar(n) { return "Hola " + n; }  → hoisting ✅
// EXPRESIÓN:   const saludar = function(n) { ... };          → no hoisting ❌
// ARROW:       const saludar = n => "Hola " + n;             → no hoisting ❌
// Parámetros por defecto: function f(n = "mundo") { }
// Rest params: function f(...args) { }  → args es array
// SCOPE: const en bloque {}. Función puede acceder al scope externo.
// HOISTING: declarations se mueven al tope. Expressions no.
// =============================================================

// RETO 1: Las 3 formas de definir la misma función
// La función recibe (nombre, nivel=1) y devuelve:
// "Bienvenido, [NOMBRE MAYÚSCULAS]! Nivel [nivel] — Rango: [rango]"
// Rango: nivel>=50 "Leyenda" | >=20 "Maestro" | >=10 "Veterano" | else "Aprendiz"
function bienvenidaDeclarada(nombre, nivel = 1) { /* Tu código */ }
const bienvenidaExpresion = function(nombre, nivel = 1) { /* Tu código */ };
const bienvenidaArrow = (nombre, nivel = 1) => { /* Tu código */ };

console.log(bienvenidaDeclarada("aragorn", 15));
console.log(bienvenidaExpresion("Legolas", 25));
console.log(bienvenidaArrow("gandalf", 99));
console.log(bienvenidaArrow("Sam")); // nivel=1 por defecto

// RETO 2: calcularStats(nombre, ...puntuaciones) con rest params
// Si 0 puntuaciones → { nombre, error: "Sin puntuaciones" }
// Calcula min (Math.min(...)), max, promedio, total
// Devuelve objeto e imprime resumen
function calcularStats(nombre, ...puntuaciones) {
  if (puntuaciones.length === 0) return { nombre, error: "Sin puntuaciones" };
  // Tu código
}
calcularStats("Aragorn", 85, 90, 72, 88, 95);
calcularStats("Sam");

// RETO 3: Scope — predice e imprime con comentarios
const nivelGlobal = 99;
function crearHeroe() {
  const nivelGlobal = 5; // oculta al global
  function subirNivel() {
    console.log("subirNivel ve nivel:", nivelGlobal); // Predicción:
  }
  subirNivel();
  return nivelGlobal;
}
console.log("Resultado crearHeroe:", crearHeroe()); // Predicción:
console.log("Global intacto:", nivelGlobal);        // Predicción:

// RETO 4: Objeto Utils con 5 funciones
const Utils = {
  // capitalizar: "hola mundo" → "Hola Mundo"
  capitalizar: str => { /* Tu código */ },
  // aplanar: [[1,2],[3,[4]]] → [1,2,3,4] (usa .flat(Infinity) o recursión)
  aplanar: arr => { /* Tu código */ },
  // limitarDecimales: 3.14159 con 2 decimales → 3.14 (devuelve number, no string)
  // Pista: Math.round(num * 10**decimales) / 10**decimales
  limitarDecimales: (num, dec = 2) => { /* Tu código */ },
  // generarRango: (inicio, fin, paso=1) → [1,2,3,...,fin] como Python range()
  // Devuelve [] si fin < inicio con paso positivo
  generarRango: (inicio, fin, paso = 1) => { /* Tu código con while */ },
  // esPalindromo: "radar" → true, "hola" → false (ignora mayúsculas y espacios)
  esPalindromo: str => { /* Tu código */ },
};
console.log(Utils.capitalizar("el señor de los anillos"));
console.log(Utils.aplanar([1, [2, [3, [4]]]]));
console.log(Utils.limitarDecimales(3.14159, 3));
console.log(Utils.generarRango(1, 10));
console.log(Utils.generarRango(0, 20, 5));
console.log(Utils.esPalindromo("radar"), Utils.esPalindromo("Anita lava la tina"));`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS — Funciones:
1. RETO 1: Las 3 versiones DEBEN existir. Todas con parámetro por defecto nivel=1. Deben usar ternarios para el rango. REPROBAR si falta alguna versión.
2. RETO 2: DEBE usar rest parameters (...puntuaciones). Debe manejar 0 puntuaciones. REPROBAR si no usa rest params.
3. RETO 3: Debe haber comentarios con predicciones. Los resultados correctos son: subirNivel ve 5 (local de crearHeroe), crearHeroe devuelve 5, nivelGlobal sigue siendo 99. REPROBAR si no hay comentarios.
4. RETO 4: Al menos 4 de las 5 funciones deben estar implementadas. limitarDecimales DEBE devolver number, no string. generarRango DEBE devolver [] cuando fin < inicio. REPROBAR si más de 1 función está vacía.`,
  },

  {
    slug: 'M06-E02-hof-callbacks',
    module: 'M06-FN',
    title: '🏹 Las Flechas del Arquero',
    description: 'Funciones de orden superior: callbacks, map, filter, reduce propios implementados desde cero, y composición de funciones con pipe y compose.',
    sort_order: 2,
    type: 'js',
    html_template: `// =============================================================
// TEORÍA: Funciones de Orden Superior (HOF)
// =============================================================
// Una HOF: recibe función como argumento O devuelve función.
// array.map(fn)    → transforma cada elemento, devuelve nuevo array
// array.filter(fn) → filtra por condición, devuelve nuevo array
// array.reduce(fn, inicial) → reduce a un valor con fn(acc, item)
// array.some(fn)   → true si AL MENOS uno cumple
// array.every(fn)  → true si TODOS cumplen
// array.find(fn)   → primer elemento que cumple o undefined
// Composición: pipe(f,g)(x) = g(f(x))  | compose(f,g)(x) = f(g(x))
// =============================================================

const heroes = [
  { nombre: "Aragorn", nivel: 15, clase: "Guerrero", misiones: 42, activo: true, xp: 15000 },
  { nombre: "Legolas", nivel: 18, clase: "Arquero",  misiones: 38, activo: true, xp: 18500 },
  { nombre: "Gimli",   nivel: 12, clase: "Guerrero", misiones: 29, activo: false, xp: 10800 },
  { nombre: "Gandalf", nivel: 50, clase: "Mago",     misiones: 99, activo: true, xp: 75000 },
  { nombre: "Frodo",   nivel: 5,  clase: "Hobbit",   misiones: 7,  activo: true, xp: 3200 },
  { nombre: "Sam",     nivel: 4,  clase: "Hobbit",   misiones: 6,  activo: true, xp: 2900 },
];

// RETO 1: Consultas con filter+map (solo arrow functions)
const heroesActivos = /* filter activo Y nivel>=10, map solo nombres */;
const fichas = /* map → "[clase] Nombre — Lv.X" */;
const veteranos = /* filter misiones>30, sort nivel desc */;
console.log("Activos nivel 10+:", heroesActivos);
console.log("Fichas:", fichas);
console.log("Veteranos:", veteranos.map(h => h.nombre + " Lv." + h.nivel));

// RETO 2: reduce avanzado
const xpTotal = /* reduce suma de xp */;
// xpPromedio: solo de activos, calcula dentro del reduce con acumulador { suma, cant }
const xpPromedioActivos = /* Tu código */;
// porClase: agrupa en objeto { Guerrero: [h1,h2], Mago: [...], ... }
const porClase = heroes.reduce((acc, h) => {
  if (!acc[h.clase]) acc[h.clase] = [];
  acc[h.clase].push(h);
  return acc;
}, {});
console.log("XP total:", xpTotal);
console.log("XP promedio activos:", xpPromedioActivos);
console.log("Por clase:", Object.keys(porClase).map(k => k + ": " + porClase[k].length));

// RETO 3: Implementa miMap, miFiltro, miReduce desde cero (con for...of)
function miMap(array, fn) { /* devuelve nuevo array con fn aplicado a cada item */ }
function miFiltro(array, fn) { /* devuelve nuevo array con solo los que fn devuelve true */ }
function miReduce(array, fn, inicial) { /* acumula con fn(acc, item) */ }

console.log("miMap:", miMap(heroes, h => h.nombre.toUpperCase()));
console.log("miFiltro activos:", miFiltro(heroes, h => h.activo).length);
console.log("miReduce misiones:", miReduce(heroes, (acc, h) => acc + h.misiones, 0));

// RETO 4: Composición con pipe y compose
// pipe(f, g)(x) = g(f(x))  — izquierda a derecha
// compose(f, g)(x) = f(g(x))  — derecha a izquierda
// Implementa ambas con reduce
const compose = (...fns) => x => /* reducuRight */ undefined;
const pipe    = (...fns) => x => /* reduce */ undefined;

const trim       = s => s.trim();
const toLower    = s => s.toLowerCase();
const capitalize = s => s[0].toUpperCase() + s.slice(1);
const addPrefix  = s => "Heroe: " + s;

const normalizar    = pipe(trim, toLower, capitalize);
const formatearHero = pipe(trim, toLower, capitalize, addPrefix);

console.log(normalizar("  ARAGORN  "));    // "Aragorn"
console.log(formatearHero("  LEGOLAS  ")); // "Heroe: Legolas"`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS — HOF:
1. RETO 1: DEBE usar arrow functions con métodos nativos. heroesActivos DEBE usar filter + map encadenados. veteranos DEBE usar sort con comparador numérico. REPROBAR si usa for.
2. RETO 2: xpPromedioActivos DEBE calcular solo de activos dentro del reduce (acumulador {suma, cant}). REPROBAR si filtra antes del reduce.
3. RETO 3: miMap, miFiltro, miReduce DEBEN implementarse con for o for...of. REPROBAR si usan los métodos nativos internamente.
4. RETO 4: compose DEBE usar reduceRight, pipe DEBE usar reduce. REPROBAR si no usa reduce internamente o si solo implementa uno de los dos.`,
  },

  {
    slug: 'M06-E03-closures',
    module: 'M06-FN',
    title: '🔐 El Cofre Mágico — Closures',
    description: 'Closures: funciones que recuerdan su ámbito. Fábricas, contadores con estado privado, memoización y recursión.',
    sort_order: 3,
    type: 'js',
    html_template: `// =============================================================
// TEORÍA: Closures y Recursión
// =============================================================
// CLOSURE: función que "cierra sobre" variables de su ámbito exterior.
// function crearContador() {
//   let n = 0;               // variable privada
//   return () => ++n;        // closure: recuerda 'n'
// }
// const c = crearContador(); c() → 1, c() → 2, c() → 3
//
// FÁBRICA: función que devuelve función especializada
// function multiplicarPor(factor) { return n => n * factor; }
// const doble = multiplicarPor(2); doble(5) → 10
//
// RECURSIÓN: función que se llama a sí misma
// function factorial(n) { if (n<=1) return 1; return n * factorial(n-1); }
// SIEMPRE necesita un CASO BASE para detener la recursión.
// =============================================================

// RETO 1: Fábricas de funciones
// 1a: crearMultiplicador(factor) → devuelve n => n * factor
function crearMultiplicador(factor) { /* closure sobre factor */ }
const doble = crearMultiplicador(2);
const triple = crearMultiplicador(3);
console.log(doble(5), triple(5), crearMultiplicador(10)(5));

// 1b: crearSaludador(idioma) → devuelve fn(nombre) que saluda en ese idioma
// "es" → "¡Hola, X!", "en" → "Hello, X!", "fr" → "Bonjour, X!", otro → "Greetings, X!"
function crearSaludador(idioma) { /* closure sobre idioma */ }
console.log(crearSaludador("es")("Aragorn"));
console.log(crearSaludador("en")("Legolas"));

// 1c: crearValidador(min, max) → devuelve fn(n) → { valido, mensaje }
function crearValidador(min, max) { /* closure sobre min y max */ }
const validarNivel = crearValidador(1, 100);
console.log(validarNivel(50));
console.log(validarNivel(150));

// RETO 2: Counter con estado PRIVADO
// crearContadorGremio(nombre, inicial=0) → { incrementar, decrementar, reset, obtener, estado }
// 'contador' debe ser INACCESIBLE desde fuera — solo mediante los métodos
// reset() debe volver al valor 'inicial', NO a 0
function crearContadorGremio(nombre, inicial = 0) {
  let contador = inicial; // privada
  return {
    incrementar: (n = 1) => { contador += n; },
    decrementar: (n = 1) => { if (contador - n >= 0) contador -= n; },
    reset: () => { contador = inicial; },
    obtener: () => contador,
    estado: () => nombre + ": " + contador + " miembros",
  };
}
const g = crearContadorGremio("Norte", 10);
g.incrementar(5); g.incrementar(3); g.decrementar(2);
console.log(g.estado()); // Norte: 16 miembros
g.reset();
console.log(g.obtener()); // 10 (inicial, no 0)

// RETO 3: Memoización
// memoize(fn) → versión memoizada de fn (cachea resultado por argumentos)
// Al llamarla por segunda vez con los mismos args → usa cache, no recalcula
function memoize(fn) {
  const cache = {};
  return function(...args) {
    const key = JSON.stringify(args);
    if (key in cache) { console.log("Cache hit:", key); return cache[key]; }
    console.log("Calculando:", key);
    cache[key] = fn(...args);
    return cache[key];
  };
}
function fibLento(n) {
  if (n <= 1) return n;
  return fibLento(n - 1) + fibLento(n - 2);
}
const fibRapido = memoize(fibLento);
console.log(fibRapido(10));
console.log(fibRapido(10)); // cache hit

// RETO 4: Recursión (sin bucles)
// sumarArray(array): suma todos con recursión (slice + primer elemento)
function sumarArray(array) { /* Caso base: array vacío → 0 */ }
console.log(sumarArray([1,2,3,4,5])); // 15

// aplanar(array): aplana anidados a cualquier profundidad con recursión
function aplanar(array) {
  return array.reduce((acc, item) =>
    Array.isArray(item) ? acc.concat(aplanar(item)) : acc.concat(item), []);
}
console.log(aplanar([1, [2, [3, [4]], 5]])); // [1,2,3,4,5]

// factorial(n): recursivo, n! — incluye caso base
function factorial(n) { /* Tu código */ }
console.log(factorial(5)); // 120
console.log(factorial(0)); // 1`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS — Closures y Recursión:
1. RETO 1: crearMultiplicador, crearSaludador, crearValidador DEBEN devolver funciones. Las variables capturadas (factor, idioma, min, max) deben estar en el ámbito externo, no pasadas como parámetros a la función devuelta. REPROBAR si no hay closure real.
2. RETO 2: reset() DEBE volver al valor 'inicial' (no a 0). contador debe ser inaccesible (no en el objeto devuelto como propiedad directa). REPROBAR si reset vuelve a 0 o si contador es accesible como propiedad.
3. RETO 3: memoize DEBE usar cache y detectar cuando ya existe el resultado (key in cache). REPROBAR si el cache no funciona o si no imprime el mensaje de cache hit.
4. RETO 4: sumarArray DEBE ser recursiva sin bucles. aplanar ya está dada, pero factorial DEBE ser recursivo. REPROBAR si usa for/while en sumarArray o factorial.`,
  },

  // ═══ M07-DATA ══════════════════════════════════════════════
  {
    slug: 'M07-E01-arrays-metodos',
    module: 'M07-DATA',
    title: '⚔️ El Escuadrón de Héroes',
    description: 'Métodos mutables de arrays: push, pop, shift, unshift, splice, indexOf, includes, flat, flatMap. Implementa un gestor de escuadrón y una queue FIFO.',
    sort_order: 1,
    type: 'js',
    html_template: `// =============================================================
// TEORÍA: Métodos de Array
// =============================================================
// MUTABLES (modifican el array):
//   push(x)       → agrega al final, devuelve nueva longitud
//   pop()         → elimina y devuelve el último
//   unshift(x)    → agrega al inicio, devuelve nueva longitud
//   shift()       → elimina y devuelve el primero (FIFO)
//   splice(i,n)   → elimina n desde i, devuelve eliminados
//   splice(i,0,x) → inserta x en posición i sin eliminar
//   sort(fn)      → ordena in-place
//   reverse()     → invierte in-place
// INMUTABLES (no modifican):
//   slice(a,b)    → extrae subarray
//   concat(arr)   → une arrays, nuevo array
//   flat(n)       → aplana n niveles
//   flatMap(fn)   → map + flat(1)
//   indexOf(x)    → posición o -1
//   includes(x)   → true/false
//   join(sep)     → array a string
// =============================================================

// RETO 1: Gestor de Escuadrón con closures
function crearEscuadron(nombre) {
  let miembros = [];
  return {
    // reclutar(heroe): agrega al final si el nombre no está ya en el array
    reclutar(heroe) { /* usa findIndex o .some() para verificar duplicados */ },
    // expulsar(nombre): elimina por nombre. Usa findIndex + splice. Devuelve boolean.
    expulsar(nombre) { /* Tu código */ },
    // promover(nombre): mueve al héroe al INICIO (lider). findIndex + splice + unshift.
    promover(nombre) { /* Tu código */ },
    // reemplazar(viejoNombre, nuevoHeroe): reemplaza en la misma posición. splice(i,1,nuevo).
    reemplazar(viejoNombre, nuevoHeroe) { /* Tu código */ },
    listar: () => nombre + ": " + (miembros.map(h => h.nombre).join(", ") || "Vacío"),
    size: () => miembros.length,
  };
}
const eq = crearEscuadron("Guardias del Norte");
eq.reclutar({ nombre: "Aragorn", nivel: 15 });
eq.reclutar({ nombre: "Boromir", nivel: 10 });
eq.reclutar({ nombre: "Faramir", nivel: 8 });
eq.reclutar({ nombre: "Aragorn", nivel: 15 }); // no duplica
console.log(eq.listar()); // Aragorn, Boromir, Faramir
eq.promover("Faramir");
console.log(eq.listar()); // Faramir, Aragorn, Boromir
eq.reemplazar("Boromir", { nombre: "Eowyn", nivel: 12 });
console.log(eq.listar()); // Faramir, Aragorn, Eowyn

// RETO 2: flat y flatMap
const inventarioPorDia = [["Espada","Escudo"],["Arco","Flecha","Carcaj"],["Pocion"]];
const todoFlat = /* .flat() */ [];
const conEtiqueta = /* .flatMap con dia e index */  [];
console.log("flat:", todoFlat);
console.log("flatMap:", conEtiqueta);

// Ordena inventario por precio desc (no modifiques el original)
const items = [[101,"Espada",2500],[102,"Escudo",1800],[103,"Arco",3200],[104,"Amuleto",800]];
const ordenados = /* [...items].sort comparador */ [];
console.log("Por precio:", ordenados.map(i => i[1] + " $" + i[2]));

// RETO 3: Queue FIFO — crearQueue(capacidadMax)
// encolar(item): agrega al final si no excede capacidad, devuelve boolean
// desencolar(): saca y devuelve el primero (shift), null si vacía
// ver(): copia del array | isEmpty() | isFull()
function crearQueue(capacidadMax = 10) {
  const items = [];
  return {
    encolar(item) { if (items.length >= capacidadMax) return false; items.push(item); return true; },
    desencolar() { return items.length > 0 ? items.shift() : null; },
    ver: () => [...items],
    isEmpty: () => items.length === 0,
    isFull: () => items.length >= capacidadMax,
    size: () => items.length,
  };
}
const q = crearQueue(3);
console.log(q.encolar("A"), q.encolar("B"), q.encolar("C")); // true true true
console.log(q.encolar("D")); // false (llena)
console.log(q.desencolar()); // "A" (FIFO)
console.log(q.ver());        // ["B","C"]`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS — Arrays Métodos:
1. RETO 1 reclutar: DEBE verificar duplicados (findIndex o .some). REPROBAR si permite duplicados.
2. RETO 1 promover: DEBE usar findIndex + splice (sacar) + unshift (al inicio). REPROBAR si no usa unshift.
3. RETO 1 reemplazar: DEBE usar splice(i, 1, nuevoHeroe) para reemplazar en la misma posición. REPROBAR si elimina y agrega sin mantener posición.
4. RETO 2: DEBE usar .flat() y .flatMap(). REPROBAR si aplanar manualmente con bucles. Sort DEBE no modificar el original (spread o slice primero). REPROBAR si modifica items.
5. RETO 3 desencolar: DEBE usar shift() (FIFO). REPROBAR si usa pop() (que sería LIFO/Stack).`,
  },

  {
    slug: 'M07-E02-arrays-funcionales',
    module: 'M07-DATA',
    title: '🗺️ El Mapa del Tesoro',
    description: 'map, filter, reduce, sort con comparadores, find, some, every y encadenamiento complejo de métodos funcionales.',
    sort_order: 2,
    type: 'js',
    html_template: `// =============================================================
// MISIÓN: Métodos Funcionales de Arrays
// =============================================================

const misiones = [
  { id:1, titulo:"Recuperar Espada", dificultad:8, recompensa:1500, completada:true, tipo:"combate", participantes:["Aragorn","Boromir"] },
  { id:2, titulo:"Explorar Cueva",   dificultad:5, recompensa:800,  completada:false, tipo:"exploracion", participantes:["Legolas","Gimli"] },
  { id:3, titulo:"Proteger Aldea",   dificultad:3, recompensa:400,  completada:true,  tipo:"defensa",    participantes:["Sam","Frodo"] },
  { id:4, titulo:"Descifrar Código", dificultad:7, recompensa:1200, completada:false, tipo:"intelecto",  participantes:["Gandalf"] },
  { id:5, titulo:"El Gran Dragon",   dificultad:10,recompensa:5000, completada:false, tipo:"combate",   participantes:["Aragorn","Legolas","Gimli"] },
  { id:6, titulo:"Tesoro Perdido",   dificultad:6, recompensa:2000, completada:true,  tipo:"exploracion",participantes:["Aragorn","Gandalf"] },
  { id:7, titulo:"Negociacion",      dificultad:4, recompensa:600,  completada:false, tipo:"diplomacia", participantes:["Frodo","Sam","Gandalf"] },
];

// RETO 1: map — Transformar
// 1a: map a { id, tituloCaps, recompensaStr: "$X,XXX" }
const formateadas = misiones.map(m => ({
  id: m.id,
  tituloCaps: /* toUpperCase */,
  recompensaStr: /* "$" + m.recompensa.toLocaleString() */,
}));
console.log("1a:", formateadas.slice(0,2));

// 1b: map → { titulo, valor: recompensa/dificultad con 2 decimales }
const valoresMisiones = /* Tu map */;
console.log("1b:", valoresMisiones);

// RETO 2: filter
// 2a: pendientes con dificultad > 5
const dificilesPendientes = /* filter */;
console.log("2a:", dificilesPendientes.map(m => m.titulo));
// 2b: misiones donde participa "Aragorn" (usa m.participantes.includes)
const misionesAragorn = /* filter */;
console.log("2b Aragorn:", misionesAragorn.map(m => m.titulo));

// RETO 3: reduce
// 3a: total recompensas de COMPLETADAS
const totalGanado = /* filter completadas + reduce suma */;
console.log("3a total ganado: $" + totalGanado);
// 3b: agrupa por tipo → { combate: [...], ... }  (reduce que inicializa array si no existe)
const porTipo = /* reduce */;
console.log("3b:", Object.entries(porTipo).map(([t,ms]) => t+":"+ms.length).join(", "));
// 3c: recompensa total de misiones de "combate" no completadas (filter+reduce en cadena)
const combatePendiente = /* Tu código */;
console.log("3c combate pendiente: $" + combatePendiente);

// RETO 4: find, some, every
const hayEpica = /* some con recompensa > 4000 */;
console.log("4a hay épica:", hayEpica);                    // true
const todasCompletadasFaciles = misiones.filter(m => m.completada).every(m => m.dificultad <= 8);
console.log("4b completadas <= dif 8:", todasCompletadasFaciles);
const mejorPendiente = [...misiones].sort((a,b) => b.recompensa - a.recompensa).find(m => !m.completada);
console.log("4c mejor pendiente:", mejorPendiente?.titulo, "$"+mejorPendiente?.recompensa);

// RETO 5: Encadenamiento — EN UNA SOLA expresión sin variables intermedias
// 1. filter: misiones con 2+ participantes
// 2. map: { titulo, nPart, recompensaPP: Math.round(recompensa/nPart) }
// 3. sort: por recompensaPP desc
// 4. slice: primeras 3
const topPorPersona = /* Tu encadenamiento aquí */;
console.log("5 top:", topPorPersona);`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS — Métodos Funcionales:
1. RETO 1b: Debe usar .toFixed(2) para redondear el valor. REPROBAR si no formatea decimales.
2. RETO 2b: DEBE usar .includes("Aragorn") en el array de participantes. REPROBAR si usa indexOf.
3. RETO 3b: El reduce DEBE inicializar el array si la clave no existe. REPROBAR si no maneja el primer elemento de cada tipo.
4. RETO 3c: DEBE encadenar filter + reduce. REPROBAR si usa solo filter sin reduce o si lo calcula con bucle.
5. RETO 5: DEBE ser UNA SOLA expresión encadenada: filter().map().sort().slice(). REPROBAR si usa variables intermedias.`,
  },

  {
    slug: 'M07-E03-objetos',
    module: 'M07-DATA',
    title: '👤 Los Archivos del Gremio',
    description: 'Objetos literales con métodos, desestructuración anidada, spread operator, shallow vs deep copy, y Object.keys/values/entries/fromEntries.',
    sort_order: 3,
    type: 'js',
    html_template: `// =============================================================
// TEORÍA: Objetos, Destructuring y Spread
// =============================================================
// ACCESO: obj.clave   obj["clave"]   obj[variable]
// DESESTRUCTURACIÓN:
//   const { nombre, nivel } = heroe;          // básico
//   const { nombre: alias } = heroe;          // con alias
//   const { nivel = 1 } = heroe;             // con default
//   const { a: { b } } = obj;               // anidada
//   function f({ nombre, nivel = 1 }) { }   // en parámetros
// SPREAD: { ...obj1, ...obj2 }  → fusiona (el más derecho gana)
// SHALLOW COPY: spread copia referencias de objetos anidados
// DEEP COPY: structuredClone(obj) para copia verdaderamente independiente
// Object.keys(o) | Object.values(o) | Object.entries(o) → [[k,v], ...]
// Object.fromEntries([[k,v], ...]) → objeto
// =============================================================

// RETO 1: Objetos con métodos
const crearHeroe = (nombre, clase, nivel = 1) => ({
  nombre, clase, nivel, xp: 0, habilidades: [],
  // ganarXP(n): suma xp. Por cada 1000 xp sube un nivel. xp se resetea al acumulado restante.
  ganarXP(n) { /* this.xp += n; calcular niveles ganados = floor(xp/1000); this.nivel += niveles; this.xp %= 1000; */ },
  // aprenderHabilidad(h): agrega solo si no está ya en habilidades
  aprenderHabilidad(h) { if (!this.habilidades.includes(h)) this.habilidades.push(h); },
  toString() { return "[" + this.clase + "] " + this.nombre + " Lv." + this.nivel + " | " + this.habilidades.join(", "); }
});
const h = crearHeroe("Aragorn", "Guerrero", 10);
h.ganarXP(2500);
h.aprenderHabilidad("Espadachin"); h.aprenderHabilidad("Liderazgo"); h.aprenderHabilidad("Espadachin");
console.log(h.toString()); // nivel 12, solo 2 habilidades

// RETO 2: Desestructuración avanzada
const archivo = {
  id: "GLD-0042",
  nombre: "Legolas",
  estadisticas: { nivel: 18, atributos: { fuerza: 12, agilidad: 25 } },
  habilidades: ["Arco Elfico", "Vision Nocturna"],
  gremio: { nombre: "Eldalonde", rango: "Maestro" }
};

// 2a: Desestructura en UNA sola expresión:
// nombre como nombreHeroe, nivel (de estadisticas), agilidad (de estadisticas.atributos),
// gremio.nombre como nombreGremio, primera habilidad del array
const {
  nombre: nombreHeroe,
  estadisticas: { nivel, atributos: { agilidad } },
  gremio: { nombre: nombreGremio, rango },
  habilidades: [primeraHabilidad],
} = archivo;
console.log(nombreHeroe, nivel, agilidad, nombreGremio, rango, primeraHabilidad);

// 2b: Desestructura EN LOS PARÁMETROS de la función
function resumenHeroe({ nombre, estadisticas: { nivel }, gremio: { nombre: gremioN, rango } }) {
  return nombre + " [" + rango + " de " + gremioN + "] Lv." + nivel;
}
console.log(resumenHeroe(archivo));

// RETO 3: Spread — Fusión e inmutabilidad
const def = { tema: "oscuro", idioma: "es", debug: false, timeout: 30, maxReintentos: 3 };
const user = { tema: "claro", debug: true };
const prod = { debug: false, maxReintentos: 5 };
// prioridad: prod > user > def
const configFinal = /* spread en el orden correcto */;
console.log("Config:", configFinal);

// 3b: Demuestra shallow copy
const heroeConEquipo = { nombre: "Sam", equipo: { espada: "Aguijon", escudo: "Comarca" } };
const shallow = { ...heroeConEquipo };
shallow.nombre = "Sam (copia)";
shallow.equipo.espada = "Espada de Mithril"; // ← afecta al original?
console.log("Original nombre:", heroeConEquipo.nombre);      // "Sam" (NO afectado)
console.log("Original espada:", heroeConEquipo.equipo.espada); // "Espada de Mithril" (SÍ afectado!)
// Soluciona con structuredClone:
const deep = structuredClone(heroeConEquipo);
deep.equipo.espada = "Dagas del Shire";
console.log("Con deep clone, original:", heroeConEquipo.equipo.espada); // Espada de Mithril (sin cambios)

// RETO 4: Object.entries + fromEntries
const precios = { espada: 2500, escudo: 1800, arco: 3200, amuleto: 800, capa: 5000 };
// 4a: Aplica 20% descuento a todos → nuevo objeto (Object.fromEntries + entries + map)
const conDescuento = /* Tu código */;
console.log("Con descuento:", conDescuento);
// 4b: Filtra solo los que cuestan < 2000 → nuevo objeto
const baratos = /* Tu código */;
console.log("Baratos:", baratos);
// 4c: Invierte: { 2500: "espada", ... }
const invertido = /* Object.fromEntries(Object.entries(p).map([k,v] => [v,k])) */;
console.log("Invertido:", invertido);`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `REGLAS ESTRICTAS — Objetos y Spread:
1. RETO 1 ganarXP: DEBE calcular correctamente los niveles ganados (floor(xp/1000)) y xp restante (xp%1000). REPROBAR si no calcula niveles o si la XP no se acumula correctamente.
2. RETO 1 aprenderHabilidad: DEBE verificar duplicados con includes. REPROBAR si permite duplicados.
3. RETO 3 configFinal: El orden DEBE ser { ...def, ...user, ...prod } para que prod tenga mayor prioridad. REPROBAR si el orden es incorrecto.
4. RETO 3b: Los console.log DEBEN mostrar la diferencia: nombre no cambia con shallow (primitivo), pero equipo.espada SÍ cambia (referencia). REPROBAR si no hay comentarios o si el código no lo demuestra.
5. RETO 4: DEBE usar Object.fromEntries + Object.entries para 4a, 4b y 4c. REPROBAR si usa for...in o construye el objeto manualmente.`,
  },

  // ═══ M08-GIT ══════════════════════════════════════════════
  {
    slug: 'M08-E01-git-basico',
    module: 'M08-GIT',
    title: '🌿 Tu Primera Misión de Git',
    description: 'Aprende git init, add, commit, status, log, diff. Practica directamente en la terminal de VS Code y registra los outputs aquí.',
    sort_order: 1,
    type: 'terminal',
    html_template: `# MISIÓN: Tu Primera Misión de Git
## Ejecuta los comandos en la terminal integrada (Ctrl+\`)

### TEORIA
- git init          → inicializa repositorio en la carpeta actual
- git status        → ve el estado actual de los archivos
- git add archivo   → prepara un archivo para commit (staging)
- git add .         → prepara TODOS los archivos modificados
- git commit -m "msg" → guarda un snapshot con mensaje
- git log --oneline → historial compacto
- git diff          → cambios no preparados
- git diff --staged → cambios en staging

### RETO 1: Inicializar repositorio
En tu carpeta de trabajo, ejecuta:
  git init
  git status

### RETO 2: Primer commit
  - Crea README.md con "# Mi Proyecto del Gremio"
  - Crea heroes.txt con 3 nombres de héroes (uno por línea)
  - git add README.md (solo ese archivo)
  - git status (verifica que solo README.md está en staging)
  - git commit -m "feat: agregar README inicial"
  - git log --oneline

### RETO 3: Segundo commit
  - Modifica README.md (agrega una línea)
  - git add heroes.txt
  - git diff --staged
  - git commit -m "feat: agregar lista de heroes"
  - git log --oneline (deben aparecer 2 commits)

### RETO 4: Buenos mensajes de commit
Crea 3 archivos nuevos. Haz UN commit separado para cada uno:
  - misiones.txt  → "feat: agregar lista de misiones"
  - reglas.md     → "docs: documentar reglas del gremio"
  - config.json   → "chore: agregar configuracion inicial"

---
## RESPUESTAS — Pega los outputs aquí

Output de git init:
(pega aqui)

Output de git log --oneline final (debe tener 5 commits):
(pega aqui)

Diferencia entre git add . y git add archivo.txt:
(tu respuesta — minimo 2 oraciones)

Para que sirve el Staging Area:
(tu respuesta — minimo 2 oraciones)`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `Evalua el archivo de respuestas de Git. REGLAS:
1. Debe haber output de git init con "Initialized empty Git repository". REPROBAR si no hay output.
2. git log debe mostrar exactamente 5 commits. Los mensajes DEBEN seguir formato tipo: (feat:/docs:/chore: + descripcion). REPROBAR si hay menos de 5 commits o mensajes sin sentido.
3. La explicacion de "git add . vs git add archivo" debe demostrar comprension: add . agrega todo, add archivo solo ese especifico. REPROBAR si esta vacio.
4. La explicacion del Staging Area debe mencionar que permite seleccionar que cambios incluir en cada commit. REPROBAR si es vaga o esta vacia.`,
  },

  {
    slug: 'M08-E02-git-branches',
    module: 'M08-GIT',
    title: '🌿 Las Ramas del Gran Árbol',
    description: 'git branch, checkout/switch, merge, resolución de conflictos. Aprende el flujo de trabajo con ramas en Git.',
    sort_order: 2,
    type: 'terminal',
    html_template: `# MISIÓN: Ramas (Branches) en Git

## TEORIA
- git branch                    → ver ramas
- git branch nombre             → crear rama
- git checkout -b nueva-rama    → crear y cambiar en un paso
- git switch nombre             → cambiar de rama (comando moderno)
- git merge nombre-rama         → fusionar rama en la actual
- git branch -d nombre          → eliminar rama mergeada
- git log --oneline --graph --all → ver historial con ramas visuales

### Flujo: main ●─────●  ← merge
              \\       /
          feat ●──●──●

### Conflictos:
<<<<<<< HEAD          ← tu versión
codigo actual
=======               ← separador
codigo de la otra rama
>>>>>>> feature-branch ← fin del conflicto
Resuelve: elimina los marcadores, elige la version correcta, commit.

## RETO 1: Crear y usar ramas
  git branch                          (ver ramas actuales)
  git checkout -b feature/hechizos    (crea y cambia)
  - Crea hechizos.txt con 3 hechizos
  - git commit -m "feat: agregar lista de hechizos"

## RETO 2: Trabajo paralelo en main
  git switch main                     (vuelve a main)
  - Crea armas.txt con 3 armas
  - git commit -m "feat: agregar armas"
  git log --oneline --graph --all     (debe mostrar ramas divergentes)

## RETO 3: Merge sin conflictos
  git merge feature/hechizos
  git log --oneline --graph --all     (mostrar punto de merge)
  git branch -d feature/hechizos

## RETO 4: Simula un conflicto y resuélvelo
  1. git checkout -b feature/readme-v2
  2. Edita linea 1 de README.md → "# Gremio de Codigo - v2.0"
  3. git commit -m "feat: actualizar README v2"
  4. git switch main
  5. Edita linea 1 de README.md → "# Gremio de Codigo - Edicion Especial"
  6. git commit -m "feat: actualizar README edicion especial"
  7. git merge feature/readme-v2  → habrá conflicto
  8. Resuelve el conflicto en README.md (elimina marcadores <<<,===,>>>)
  9. git add README.md
  10. git commit -m "merge: resolver conflicto en README"

---
## RESPUESTAS

Output de git branch (con feature/hechizos visible):
(pega aqui)

Output de git log --graph --oneline --all con ramas divergentes:
(pega aqui - debe mostrar grafico de ramas)

Output de git log --graph despues del merge:
(pega aqui - debe mostrar punto de convergencia)

Como resolviste el conflicto del RETO 4:
(describe que version elegiste y por que)

Cuando usarias una rama vs commit directo en main:
(minimo 2 oraciones)`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `Evalua el conocimiento de ramas Git. REGLAS:
1. El output de git branch debe mostrar la rama feature/hechizos existente. REPROBAR sin output.
2. El log con --graph DEBE mostrar visualmente las ramas divergentes (asteriscos y lineas separadas). REPROBAR si no muestra divergencia.
3. El log post-merge DEBE mostrar Merge commit o la convergencia en el grafico. REPROBAR si no muestra merge.
4. La descripcion de resolucion de conflicto DEBE mencionar: que archivo tuvo conflicto, que version se eligio, que se eliminaron los marcadores. REPROBAR si esta vacia.
5. La explicacion de cuando usar ramas DEBE mencionar trabajo en equipo o features nuevas para no romper main. REPROBAR si es menos de 2 oraciones.`,
  },

  {
    slug: 'M08-E03-git-remote',
    module: 'M08-GIT',
    title: '🌍 El Gremio en la Nube',
    description: 'Repositorios remotos: remote, push, pull, clone, .gitignore y flujo de trabajo con GitHub. Conecta tu repositorio con el mundo.',
    sort_order: 3,
    type: 'terminal',
    html_template: `# MISIÓN: Repositorios Remotos en Git

## TEORIA
- git remote add origin URL     → conectar con remoto llamado "origin"
- git remote -v                 → ver remotos configurados
- git push -u origin main       → enviar + configurar rama de seguimiento
- git pull origin main          → traer + fusionar cambios del remoto
- git fetch origin              → traer cambios SIN fusionar
- .gitignore                    → archivos que Git NO debe rastrear

### Que NUNCA debes commitear:
  .env          (contiene secretos/passwords)
  node_modules/ (pesado, se regenera con npm install)
  *.log         (logs de debug)
  dist/         (build generado)

## RETO 1: Conectar con GitHub
  1. Crea repositorio en github.com → New Repository → Publico, sin README
  2. git remote add origin [tu-URL]
  3. git remote -v
  4. git push -u origin main
  5. Verifica en GitHub que aparecen tus commits

## RETO 2: El .gitignore
  - Crea .gitignore con: .env, secretos.txt, node_modules/, *.log
  - Crea secretos.txt con texto "password: 12345"
  - git status (secretos.txt NO debe aparecer)
  - git add .gitignore
  - git commit -m "chore: agregar .gitignore"
  - git push

## RETO 3: Simula trabajo en equipo
  1. En GitHub (interfaz web), edita README.md y agrega una linea
  2. Guarda el cambio (esto crea un commit en GitHub)
  3. Localmente, modifica otro archivo y haz commit
  4. git push → debe fallar (hay cambios remotos nuevos)
  5. git pull origin main → trae y fusiona
  6. git push → ahora si funciona

---
## RESPUESTAS

URL de tu repositorio en GitHub:
(pega la URL aqui)

Output de git remote -v:
(pega aqui)

Mensaje de error cuando push fallo en RETO 3:
(pega el mensaje aqui)

Output de git log --oneline final (al menos 8 commits):
(pega aqui)

Por que NUNCA debes commitear .env o node_modules:
(minimo 3 razones, una por linea)

Explica el flujo de Pull Request con tus propias palabras:
(desde crear rama hasta que el codigo llega a main)`,
    css_template: '',
    js_template: '',
    instruction_for_ai: `Evalua el conocimiento de repositorios remotos Git. REGLAS:
1. Debe haber URL real de GitHub. REPROBAR si no hay URL.
2. Output de git remote -v debe mostrar tanto fetch como push para origin. REPROBAR sin output.
3. El mensaje de error del push fallido debe estar copiado y debe mencionar que el remoto tiene cambios no locales (rejected, non-fast-forward). REPROBAR sin mensaje de error.
4. El log debe tener al menos 8 commits. REPROBAR si tiene menos de 6.
5. Las 3 razones de no commitear .env/node_modules deben incluir: seguridad de credenciales, tamano de node_modules, y que node_modules se regenera. REPROBAR si son menos de 2 razones reales.
6. La explicacion de Pull Request debe mencionar rama, push, PR en GitHub, revision, y merge. REPROBAR si omite la revision de codigo.`,
  },
];

// ─────────────────────────────────────────────────────────────
// SEED
// ─────────────────────────────────────────────────────────────
async function seed() {
  console.log('\n🚀 Launchpad v2 — Seed iniciado\n');

  // 1. Insertar módulos
  console.log('📦 Insertando módulos...');
  const { data: mods, error: modErr } = await supabase
    .from('modules')
    .upsert(MODULES, { onConflict: 'slug' })
    .select();
  if (modErr) { console.error('❌ Error módulos:', modErr.message); process.exit(1); }
  console.log(`✅ ${mods.length} módulos`);

  const moduleMap = Object.fromEntries(mods.map(m => [m.slug, m.id]));

  // 2. Insertar ejercicios
  let total = 0;
  for (const ex of EXERCISES) {
    const moduleId = moduleMap[ex.module];
    if (!moduleId) { console.warn('⚠️  Módulo no encontrado:', ex.module); continue; }

    const { module: _m, ...exData } = ex;
    const { data, error } = await supabase
      .from('exercises')
      .upsert({ ...exData, module_id: moduleId, status: 'approved' }, { onConflict: 'slug' })
      .select('id, slug');

    if (error) console.error(`❌ [${ex.slug}]:`, error.message);
    else { console.log(`  ✅ ${ex.slug}`); total++; }
  }

  console.log(`\n🎉 Seed terminado. ${total} ejercicios en ${mods.length} módulos.`);
}

seed().catch(err => { console.error('Fatal:', err); process.exit(1); });
