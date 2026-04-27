// =============================================
// Launchpad: Seed Script v2 — 8 Módulos, 24 Misiones
// Ejecutar con: node seed2.mjs
// =============================================
import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
config();

const supabase = createClient(process.env.PROJECT_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// ─────────────────────────────────────────────────────────────
// MÓDULOS
// ─────────────────────────────────────────────────────────────
const MODULES = [
  { slug: 'M01-HTML', title: 'HTML: Los Cimientos', description: 'Aprende a estructurar el contenido de la web con etiquetas semánticas, formularios y tablas.', icon: '🏗️', sort_order: 1 },
  { slug: 'M02-CSS',  title: 'CSS: Dominando el Estilo', description: 'Selectores, el modelo de cajas, Flexbox y el poder de las variables CSS.', icon: '🎨', sort_order: 2 },
  { slug: 'M03-VARS', title: 'JS: Variables & Tipos', description: 'var, let, const, tipos de datos, typeof, coerción de tipos y template literals.', icon: '📦', sort_order: 3 },
  { slug: 'M04-IF',   title: 'JS: Decisiones', description: 'if/else, switch/case, operador ternario, nullish coalescing y optional chaining.', icon: '🚦', sort_order: 4 },
  { slug: 'M05-FOR',  title: 'JS: Ciclos', description: 'for, for...of, while, do-while, break, continue y bucles anidados.', icon: '🔁', sort_order: 5 },
  { slug: 'M06-FN',   title: 'JS: Funciones', description: 'Declaración, expresión, arrow functions, scope, hoisting, closures y recursión.', icon: '🛠️', sort_order: 6 },
  { slug: 'M07-DATA', title: 'JS: Arrays & Objetos', description: 'Métodos de array (map/filter/reduce), objetos literales, destructuring y spread.', icon: '🗃️', sort_order: 7 },
  { slug: 'M08-GIT',  title: 'Git: Control de Versiones', description: 'Comandos esenciales de Git: init, add, commit, branch, merge y repositorios remotos.', icon: '🌿', sort_order: 8 },
];

// ─────────────────────────────────────────────────────────────
// HELPER — construye el bloque de teoría para JS
// ─────────────────────────────────────────────────────────────
const box = (title, lines) =>
  `// ${'═'.repeat(62)}\n// ║  ${title.padEnd(59)}║\n// ${'═'.repeat(62)}\n//\n${lines.map(l => `//  ${l}`).join('\n')}\n//`;

// ─────────────────────────────────────────────────────────────
// EJERCICIOS — organizados por módulo
// ─────────────────────────────────────────────────────────────
const EXERCISES_BY_MODULE = {

  // ──────────────────────────────────────────────────────────
  'M01-HTML': [
    // ── M01 E1 ────────────────────────────────────────────
    {
      slug: 'M01-E01-semantica',
      title: '🏛️ Los Cimientos del Templo',
      description: 'Construye la estructura semántica completa de una página usando las etiquetas correctas de HTML5: header, nav, main, section, article, footer y figure.',
      sort_order: 1,
      type: 'html',
      html_template: `<!-- 
══════════════════════════════════════════════════════
📖 TEORÍA: HTML Semántico
══════════════════════════════════════════════════════

Las etiquetas semánticas le dan SIGNIFICADO al contenido:

  <header>   → Encabezado de la página o sección
  <nav>      → Menú de navegación
  <main>     → Contenido principal (SOLO uno por página)
  <section>  → Sección temática de contenido
  <article>  → Contenido independiente (post, card, etc.)
  <aside>    → Contenido secundario / barra lateral
  <footer>   → Pie de página o sección
  <figure>   → Imagen con su descripción
  <figcaption> → Pie de la imagen

  JERARQUÍA de headings (nunca saltes niveles):
  <h1> → Título principal (solo UNO por página)
  <h2> → Subtítulos de secciones
  <h3> → Subtítulos dentro de secciones

══════════════════════════════════════════════════════
🎮 MISIÓN: El Templo del Gremio
══════════════════════════════════════════════════════
El Gremio de Código necesita su página oficial.
Construye la estructura completa siguiendo los retos.
══════════════════════════════════════════════════════
-->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gremio de Código</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <!-- RETO 1: Crea el <header> del Gremio.
         Dentro debe tener:
         - Un <h1> con el nombre "Gremio de Código ⚔️"
         - Un <nav> con una lista <ul> de 4 enlaces <li><a href="#">:
           Inicio, Misiones, Miembros, Contacto -->


    <!-- RETO 2: Crea el <main> de la página.
         Dentro debe haber DOS <section>:
         
         SECCIÓN 1 — "Sobre el Gremio":
           - <h2> con "¿Quiénes somos?"
           - Un <article> con <h3> "Nuestra Historia" y un <p> de 2+ oraciones.
           - Otro <article> con <h3> "Nuestra Misión" y un <p> de 2+ oraciones.
         
         SECCIÓN 2 — "Miembro Destacado":
           - <h2> con "Héroe del Mes"
           - Un <figure> con un párrafo de emoji (usa 🧙) como "imagen"
             y un <figcaption> describiendo al héroe.
           - Un <p> con la descripción del héroe. -->


    <!-- RETO 3: Crea el <footer> de la página.
         Debe contener:
         - Un <p> con "© 2025 Gremio de Código. Todos los derechos reservados." -->


</body>
</html>`,
      css_template: `/* Estilos base — no modifiques esto */
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: Georgia, serif; background: #1a1a2e; color: #e0e0e0; line-height: 1.6; }
header { background: #16213e; padding: 20px 40px; border-bottom: 3px solid #e94560; }
header h1 { color: #e94560; font-size: 1.8em; }
nav ul { list-style: none; display: flex; gap: 20px; margin-top: 10px; }
nav ul li a { color: #a8dadc; text-decoration: none; font-size: 0.95em; }
main { max-width: 900px; margin: 40px auto; padding: 0 20px; }
section { margin-bottom: 40px; border-left: 4px solid #e94560; padding-left: 20px; }
section h2 { color: #e94560; margin-bottom: 15px; font-size: 1.4em; }
article { background: #16213e; padding: 15px; border-radius: 6px; margin-bottom: 12px; }
article h3 { color: #a8dadc; margin-bottom: 8px; }
figure { text-align: center; background: #16213e; padding: 15px; border-radius: 6px; }
figure p { font-size: 4em; }
figcaption { color: #a8dadc; font-style: italic; margin-top: 8px; }
footer { background: #16213e; text-align: center; padding: 20px; color: #888; border-top: 1px solid #333; margin-top: 40px; }`,
      js_template: '',
      instruction_for_ai: `Evalúa el HTML semántico. REGLAS ESTRICTAS:
1. Debe existir un <header> con <h1> y un <nav> con <ul> de 4 ítems con <a>.
2. Debe existir un <main> con EXACTAMENTE dos <section>.
3. Primera sección: debe tener <h2>, dos <article> cada uno con <h3> y <p>.
4. Segunda sección: debe tener <h2>, un <figure> con contenido Y <figcaption>, y un <p>.
5. Debe existir un <footer> con <p>.
6. NO deben existir etiquetas sin cerrar. Validar cierre de todas las etiquetas.
7. REPROBAR si falta cualquiera de estos elementos. La estructura semántica completa es OBLIGATORIA.`
    },

    // ── M01 E2 ────────────────────────────────────────────
    {
      slug: 'M01-E02-formularios',
      title: '📋 El Formulario de Reclutamiento',
      description: 'Crea un formulario completo de reclutamiento con múltiples tipos de input, asociación correcta label/id, select, textarea, fieldset y validación HTML5.',
      sort_order: 2,
      type: 'html',
      html_template: `<!-- 
══════════════════════════════════════════════════════
📖 TEORÍA: Formularios en HTML
══════════════════════════════════════════════════════

  <form action="#" method="post"> → Contenedor del formulario
  <label for="id">              → Texto descriptivo del campo
  <input type="text" id="id" name="name"> → Campo de texto

  Tipos de input importantes:
  - text       → Texto genérico
  - email      → Valida formato email automáticamente
  - password   → Oculta el texto
  - number     → Solo permite números
  - tel        → Para teléfonos
  - date       → Selector de fecha
  - checkbox   → Casilla de verificación (¡usa name y value!)
  - radio      → Selección única de grupo (mismo name)
  - file       → Subir archivos

  Atributos esenciales:
  - required   → Campo obligatorio
  - placeholder → Texto de ayuda
  - min / max  → Para números y fechas
  - disabled   → Deshabilitado

  <select> y <option> → Menú desplegable
  <textarea>          → Texto multi-línea
  <fieldset>          → Agrupa campos relacionados
  <legend>            → Título del fieldset
  <button type="submit"> → Botón de envío

══════════════════════════════════════════════════════
🎮 MISIÓN: Recluta al Gremio de Código
══════════════════════════════════════════════════════
El Gremio necesita un formulario de solicitud de membresía.
Construye el formulario completo con TODOS los campos.
══════════════════════════════════════════════════════
-->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reclutamiento - Gremio de Código</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>⚔️ Solicitud de Membresía</h1>
        <p class="subtitle">Completa todos los campos para unirte al Gremio.</p>

        <!-- Crea aquí el formulario con action="#" y method="post" -->
        <!-- INSTRUCCIONES DENTRO: -->

        <!-- RETO 1 — DATOS PERSONALES:
             Usa un <fieldset> con <legend>"Datos del Aventurero"</legend>.
             Dentro, crea los siguientes campos (cada uno con su <label> conectado):
             - Nombre completo: input type="text", id="nombre", required, placeholder
             - Email: input type="email", id="email", required, placeholder
             - Teléfono: input type="tel", id="telefono", placeholder
             - Fecha de nacimiento: input type="date", id="fecha_nacimiento", required -->

        <!-- RETO 2 — DATOS DE LA MISIÓN:
             Usa un segundo <fieldset> con <legend>"Datos de la Misión"</legend>.
             Dentro:
             - Un <label> + <select> con id="especialidad" y name="especialidad":
               Opciones: "Selecciona...", "Frontend", "Backend", "Diseño", "DevOps"
               La primera opción debe tener value="" y disabled y selected.
             - Un <label> + <input type="number"> para "Años de experiencia"
               id="experiencia", min="0", max="50", required
             - Un <label> + <textarea> para "¿Por qué quieres unirte?"
               id="motivacion", rows="4", placeholder, required -->

        <!-- RETO 3 — HABILIDADES:
             Usa un tercer <fieldset> con <legend>"Habilidades"</legend>.
             Crea 4 checkboxes (cada uno con su label) para:
             HTML, CSS, JavaScript, Git
             Todos deben tener name="habilidades" y su propio id y value. -->

        <!-- RETO 4 — NIVEL:
             Fuera de los fieldset pero dentro del form, agrega:
             - Un grupo de 3 radio buttons con name="nivel":
               "Principiante", "Intermedio", "Avanzado"
               Cada uno con su <label> y un id único.
               "Principiante" debe estar marcado por defecto con checked. -->

        <!-- RETO 5 — BOTÓN:
             Un <button type="submit"> con el texto "🚀 Enviar Solicitud"
             Un <button type="reset"> con el texto "🔄 Limpiar" -->

    </div>
</body>
</html>`,
      css_template: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', sans-serif; background: #0f0f23; color: #cdd6f4; min-height: 100vh; display: flex; justify-content: center; align-items: flex-start; padding: 40px 20px; }
.container { background: #1e1e2e; border-radius: 12px; padding: 40px; width: 100%; max-width: 600px; border: 1px solid #313244; }
h1 { color: #cba6f7; margin-bottom: 8px; }
.subtitle { color: #6c7086; margin-bottom: 30px; font-size: 0.95em; }
fieldset { border: 1px solid #313244; border-radius: 8px; padding: 20px; margin-bottom: 20px; }
legend { color: #89b4fa; font-weight: bold; padding: 0 10px; }
label { display: block; margin-bottom: 5px; color: #a6adc8; font-size: 0.9em; }
input[type="text"], input[type="email"], input[type="password"], input[type="tel"],
input[type="number"], input[type="date"], select, textarea {
  width: 100%; padding: 10px 14px; background: #313244; border: 1px solid #45475a;
  border-radius: 6px; color: #cdd6f4; font-size: 1em; margin-bottom: 16px;
}
input:focus, select:focus, textarea:focus { outline: none; border-color: #89b4fa; }
.checkbox-group, .radio-group { display: flex; flex-direction: column; gap: 8px; margin-bottom: 16px; }
.checkbox-group label, .radio-group label { display: flex; align-items: center; gap: 8px; cursor: pointer; margin: 0; }
input[type="checkbox"], input[type="radio"] { width: auto; margin: 0; accent-color: #cba6f7; }
button { padding: 12px 24px; border: none; border-radius: 6px; cursor: pointer; font-size: 1em; font-weight: bold; margin-right: 10px; margin-top: 10px; }
button[type="submit"] { background: #cba6f7; color: #1e1e2e; }
button[type="reset"] { background: #313244; color: #cdd6f4; }`,
      js_template: '',
      instruction_for_ai: `Evalúa el formulario HTML. REGLAS:
1. Debe existir un <form> con action y method.
2. Deben existir TRES <fieldset> cada uno con <legend>. REPROBAR si falta alguno.
3. Fieldset 1: debe tener inputs de tipo text, email, tel, date — todos con label for/id correctos.
4. Fieldset 2: debe tener un <select> con mínimo 4 options, un input number con min/max, y un textarea. Todos con label.
5. Fieldset 3: debe tener 4 checkboxes con el mismo name="habilidades", cada uno con label e id único.
6. Fuera de fieldset: debe haber 3 radio buttons con el mismo name="nivel", uno con checked.
7. Debe existir button type="submit" y button type="reset".
8. Los campos con required deben estar marcados como tal.
9. Validar que TODOS los label tengan for="" que coincida con el id del input correspondiente.
10. REPROBAR si falta cualquier sección o la asociación label/id es incorrecta.`
    },

    // ── M01 E3 ────────────────────────────────────────────
    {
      slug: 'M01-E03-tablas',
      title: '📊 El Registro de Misiones',
      description: 'Construye una tabla HTML completa con thead/tbody/tfoot, usa colspan y rowspan, y añade enlaces e imágenes correctamente.',
      sort_order: 3,
      type: 'html',
      html_template: `<!-- 
══════════════════════════════════════════════════════
📖 TEORÍA: Tablas, Imágenes y Enlaces
══════════════════════════════════════════════════════

TABLAS:
  <table>           → Tabla completa
  <thead>           → Cabecera (agrupa filas de encabezado)
  <tbody>           → Cuerpo (datos reales)
  <tfoot>           → Pie (totales, resumen)
  <tr>              → Fila (table row)
  <th>              → Celda de encabezado (bold, centrado)
  <td>              → Celda de datos
  colspan="N"       → La celda ocupa N columnas
  rowspan="N"       → La celda ocupa N filas

IMÁGENES:
  <img src="url" alt="descripción">
  - alt es OBLIGATORIO para accesibilidad
  - width y height para controlar tamaño

ENLACES:
  <a href="https://...">Texto</a>
  target="_blank"   → Abre en nueva pestaña
  target="_self"    → Abre en la misma pestaña (default)
  download          → Fuerza la descarga del archivo

══════════════════════════════════════════════════════
🎮 MISIÓN: Registro Oficial del Gremio
══════════════════════════════════════════════════════
Crea el registro de misiones completas del Gremio.
══════════════════════════════════════════════════════
-->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro de Misiones</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>📜 Registro de Misiones</h1>

        <!-- RETO 1 — LA TABLA PRINCIPAL:
             Crea una tabla con:
             - <thead>: una fila con TH para: Misión, Héroe, Dificultad, Recompensa, Estado
             - <tbody>: al menos 4 filas de datos con misiones inventadas.
               Usa emojis para la dificultad (⭐, ⭐⭐, ⭐⭐⭐) y el estado (✅, ⏳, ❌).
             - <tfoot>: una fila donde la primera celda tiene colspan="4" 
               con el texto "Total de misiones:" y la última celda tiene el número total. -->

        <!-- RETO 2 — COLSPAN y ROWSPAN:
             Crea una SEGUNDA tabla de 3 columnas llamada "Ranking del Gremio":
             - Cabecera con: Posición, Héroe, Puntaje
             - Fila 1: la primera celda debe tener rowspan="2" con el texto "🏆 Top 2"
               y las demás celdas con datos del héroe 1.
             - Fila 2: solo 2 celdas (héroe 2) porque la primera está cubierta por rowspan.
             - Fila 3: datos del héroe 3 sin rowspan. -->

        <!-- RETO 3 — IMÁGENES Y ENLACES:
             Debajo de las tablas, crea una sección <section> con <h2>"Recursos del Gremio"</h2>
             que contenga una lista <ul> con 3 elementos:
             1. Un enlace a https://developer.mozilla.org que abra en NUEVA pestaña
                con el texto "📚 Documentación MDN"
             2. Un enlace a https://github.com que abra en la MISMA pestaña
                con el texto "🐙 GitHub del Gremio"
             3. Una imagen con src="https://via.placeholder.com/100x100?text=Gremio"
                y alt="Logo del Gremio", width="100", height="100" -->

    </div>
</body>
</html>`,
      css_template: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', sans-serif; background: #1a1a2e; color: #e0e0e0; padding: 30px; }
.container { max-width: 900px; margin: 0 auto; }
h1 { color: #ffd700; margin-bottom: 24px; font-size: 2em; }
h2 { color: #ffd700; margin: 30px 0 16px; font-size: 1.4em; }
table { width: 100%; border-collapse: collapse; margin-bottom: 40px; background: #16213e; border-radius: 8px; overflow: hidden; }
th { background: #e94560; color: white; padding: 12px 16px; text-align: left; }
td { padding: 11px 16px; border-bottom: 1px solid #2d2d44; }
tr:last-child td { border-bottom: none; }
tbody tr:hover { background: #1f2d4f; }
tfoot td { background: #0f3460; font-weight: bold; padding: 12px 16px; }
section ul { list-style: none; display: flex; flex-direction: column; gap: 12px; }
section ul li { display: flex; align-items: center; gap: 10px; background: #16213e; padding: 12px 16px; border-radius: 6px; border-left: 3px solid #e94560; }
a { color: #a8dadc; text-decoration: none; }
a:hover { text-decoration: underline; }
img { border-radius: 6px; }`,
      js_template: '',
      instruction_for_ai: `Evalúa las tablas, enlaces e imágenes HTML. REGLAS ESTRICTAS:
1. Debe haber una primera tabla con <thead>, <tbody> y <tfoot>. REPROBAR si falta alguna sección.
2. El <tfoot> debe usar colspan para combinar 4 celdas en una. REPROBAR si no hay colspan.
3. Debe haber una segunda tabla con rowspan="2" en una celda. REPROBAR si no hay rowspan.
4. Debe haber una <section> con <h2>, <ul> con 3 elementos.
5. Debe haber al menos un enlace con target="_blank" y al menos uno sin esa propiedad.
6. Debe haber una imagen con src Y alt definidos. REPROBAR si falta el alt.
7. Validar que todas las etiquetas estén correctamente cerradas.`
    },
  ],

  // ──────────────────────────────────────────────────────────
  'M02-CSS': [
    // ── M02 E1 ────────────────────────────────────────────
    {
      slug: 'M02-E01-selectores',
      title: '🎯 El Arsenal de Selectores',
      description: 'Domina los selectores CSS: de elemento, clase, ID, descendente, hijo directo, pseudo-clases (:hover, :nth-child, :first-child, :last-child) y aprende sobre especificidad.',
      sort_order: 1,
      type: 'html',
      html_template: `<!-- 
══════════════════════════════════════════════════════
📖 TEORÍA: Selectores CSS y Especificidad
══════════════════════════════════════════════════════

SELECTORES BÁSICOS:
  p {}            → Todos los <p>
  .clase {}       → Todos los elementos con class="clase"
  #id {}          → El elemento con id="id"
  * {}            → Todos los elementos

SELECTORES DE RELACIÓN:
  div p {}        → <p> que son DESCENDIENTES de <div> (cualquier nivel)
  div > p {}      → <p> que son HIJOS DIRECTOS de <div>
  h2 + p {}       → <p> inmediatamente después de <h2> (hermano adyacente)
  h2 ~ p {}       → Todos los <p> después de <h2> (hermanos generales)

PSEUDO-CLASES (estado del elemento):
  a:hover {}               → Enlace al pasar el mouse
  li:first-child {}        → El primer <li> del padre
  li:last-child {}         → El último <li> del padre
  li:nth-child(2) {}       → El segundo <li>
  li:nth-child(even) {}    → Los pares (2, 4, 6...)
  li:nth-child(odd) {}     → Los impares (1, 3, 5...)
  input:focus {}           → Input con el foco

PSEUDO-ELEMENTOS (partes del elemento):
  p::first-line {}         → Primera línea del párrafo
  p::before { content:"" } → Inserta contenido antes del elemento
  p::after  { content:"" } → Inserta contenido después del elemento

ESPECIFICIDAD (mayor número = más prioridad):
  !important   → 10000
  #id          → 100
  .clase       → 10
  elemento     → 1

══════════════════════════════════════════════════════
🎮 MISIÓN: Estiliza el Tablero del Gremio
══════════════════════════════════════════════════════
Edita el CSS para aplicar todos los selectores.
══════════════════════════════════════════════════════
-->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Arsenal de Selectores</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="tablero">
        <h1>Tablero del Gremio</h1>
        <p class="subtitulo">El lugar donde los aventureros se reúnen.</p>
        <p>Esta es información general del tablero.</p>

        <h2>Lista de Misiones</h2>
        <ul class="lista-misiones">
            <li>Recuperar el Artefacto Perdido</li>
            <li class="urgente">⚠️ Proteger al Comerciante (URGENTE)</li>
            <li>Explorar la Cueva del Norte</li>
            <li>Entregar el Mensaje al Rey</li>
            <li class="urgente">⚠️ Derrotar al Dragón del Este (URGENTE)</li>
            <li>Recolectar Hierbas Mágicas</li>
        </ul>

        <h2>Estadísticas</h2>
        <table class="stats-table">
            <thead>
                <tr><th>Héroe</th><th>Misiones</th><th>Nivel</th></tr>
            </thead>
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
                <p>Esto está dentro de .caja-anuncio (hijo directo de .anuncios > div).</p>
                <span><p>Este p es descendiente lejano — también debe ser afectado.</p></span>
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
      css_template: `/* ─── RETO 1: Selectores básicos ──────────────────────────
   - El <body> debe tener fondo #0f0f23, color de texto #cdd6f4 y font-family sans-serif
   - El <h1> dentro de .tablero debe ser color #cba6f7 y font-size 2em
   - El .subtitulo (solo esa clase) debe ser itálico y color #6c7086 */

/* Tu código aquí: */


/* ─── RETO 2: Selector descendiente vs hijo directo ───────
   - Todos los <p> DESCENDIENTES de .anuncios → color #a6e3a1
   - Solo los <p> HIJOS DIRECTOS de .caja-anuncio → font-weight: bold
   Nota: el segundo selector debe afectar solo el p directo, no el p dentro del span */

/* Tu código aquí: */


/* ─── RETO 3: Pseudo-clases en la lista ──────────────────
   - El PRIMER <li> de .lista-misiones → color #89b4fa, font-weight bold
   - El ÚLTIMO <li> de .lista-misiones → color #f38ba8
   - Los <li> con índice PAR → background #1e1e2e
   - Los <li> con clase .urgente → background #3d1515, color #f38ba8 border-left 3px solid */

.lista-misiones li { padding: 10px 14px; border-radius: 4px; margin-bottom: 4px; }

/* Tu código aquí: */


/* ─── RETO 4: Pseudo-clases en la tabla ──────────────────
   - Las filas pares del <tbody> de .stats-table → background distinto al default
   - Las filas del <tbody> de .stats-table al hacer :hover → highlight diferente */

.stats-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
.stats-table th, .stats-table td { padding: 10px; border: 1px solid #313244; }
.stats-table th { background: #1e1e2e; color: #cba6f7; }

/* Tu código aquí: */


/* ─── RETO 5: :hover con transición en los botones ───────
   .btn debe tener:
   - background #89b4fa, color #1e1e2e, padding 10px 20px, border-radius 6px,
     margin 5px, display inline-block, text-decoration none
   Al hacer :hover:
   - transform: translateY(-3px) y box-shadow visible + transition 0.2s
   .btn-peligro debe además tener background #f38ba8 por defecto */

.botones { margin-top: 20px; }

/* Tu código aquí: */


/* ─── RETO 6 (BONUS): ::before pseudo-elemento ───────────
   Añade un ícono "► " antes de cada <li> de .lista-misiones
   usando el pseudo-elemento ::before con content: "► " y color #cba6f7 */

/* Tu código aquí: */`,
      js_template: '',
      instruction_for_ai: `Evalúa los selectores CSS. REGLAS ESTRICTAS:
1. Debe estilizar body, h1 dentro de .tablero, y .subtitulo con selectores correctos (no inline styles).
2. Debe usar selector descendiente para .anuncios p Y selector hijo directo para .caja-anuncio > p. Son DISTINTOS selectores. REPROBAR si solo usa uno.
3. Debe usar :first-child, :last-child, y :nth-child(even) en la lista. REPROBAR si falta alguno.
4. Debe usar :nth-child(even) o :nth-child(odd) en filas de tabla Y :hover en filas. REPROBAR si no hay hover en tabla.
5. Debe usar :hover con transform Y transition en .btn. REPROBAR si solo cambia color sin transform/transition.
6. BONUS (no obligatorio para aprobar): ::before en li. Si lo tiene, mencionar como punto extra.`
    },

    // ── M02 E2 ────────────────────────────────────────────
    {
      slug: 'M02-E02-flexbox',
      title: '⚔️ El HQ del Gremio',
      description: 'Construye la interfaz completa del cuartel general del Gremio usando Flexbox: navbar, hero section, grid de cards, y footer. Una UI real de principio a fin.',
      sort_order: 2,
      type: 'html',
      html_template: `<!-- 
══════════════════════════════════════════════════════
📖 TEORÍA: Flexbox Completo
══════════════════════════════════════════════════════
El contenedor flex controla sus hijos directos.

PROPIEDADES DEL CONTENEDOR (padre):
  display: flex            → Activa flexbox
  flex-direction: row      → Horizontal (default)
  flex-direction: column   → Vertical
  flex-wrap: wrap          → Los hijos saltan a la siguiente línea
  justify-content:         → Distribución en el eje principal:
    flex-start | flex-end | center | space-between | space-around | space-evenly
  align-items:             → Alineación en el eje cruzado:
    flex-start | flex-end | center | stretch | baseline
  gap: 20px                → Espacio entre hijos

PROPIEDADES DE LOS HIJOS:
  flex-grow: 1    → Cuánto crece. 0=nada, 1+=proporcional
  flex-shrink: 1  → Cuánto encoge (default 1)
  flex-basis: 200px → Tamaño inicial antes de crecer/encoger
  flex: 1         → Shorthand de grow/shrink/basis (flex: 1 = flex: 1 1 0)
  align-self:     → Sobreescribe align-items solo para este hijo
  order: 2        → Orden visual (sin cambiar HTML, default 0)

══════════════════════════════════════════════════════
🎮 MISIÓN: Construye el HQ completo
══════════════════════════════════════════════════════
Todas las secciones están en el HTML. Tu trabajo está
en el CSS: hacer que se vean como una UI profesional.
══════════════════════════════════════════════════════
-->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HQ del Gremio</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- RETO 1: NAVBAR — Logo a la izquierda, nav a la derecha,
         todo centrado verticalmente. Usa justify-content: space-between -->
    <header class="navbar">
        <span class="logo">⚔️ Gremio HQ</span>
        <nav class="nav-links">
            <a href="#">Misiones</a>
            <a href="#">Héroes</a>
            <a href="#">Tienda</a>
            <a href="#" class="btn-nav">Ingresar</a>
        </nav>
    </header>

    <!-- RETO 2: HERO SECTION — Centra el contenido vertical y horizontalmente.
         El título y subtítulo van en columna. Los botones van en fila con gap. -->
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

    <!-- RETO 3: CARDS — 3 cards en fila.
         Al reducir el espacio, deben saltar a la siguiente línea (flex-wrap).
         Una card "destacada" debe ser más larga (flex-grow) -->
    <section class="cards-section">
        <h2>¿Por qué unirte al Gremio?</h2>
        <div class="cards-container">
            <div class="card">
                <div class="card-icon">🧠</div>
                <h3>Aprende en serio</h3>
                <p>Ejercicios reales, revisados por IA experta. Sin relleno.</p>
            </div>
            <div class="card card-featured">
                <div class="card-icon">⚡</div>
                <h3>Progresa rápido</h3>
                <p>Ruta de aprendizaje optimizada. De cero a desarrollador junior en meses.</p>
                <a href="#" class="card-link">Empezar ahora →</a>
            </div>
            <div class="card">
                <div class="card-icon">🏆</div>
                <h3>Certifícate</h3>
                <p>Cada misión completada queda registrada en tu perfil de GitHub.</p>
            </div>
        </div>
    </section>

    <!-- RETO 4: FOOTER — 3 columnas con flex.
         Logo a la izquierda, dos listas de links al centro y derecha. -->
    <footer class="footer">
        <div class="footer-brand">
            <span class="logo">⚔️ Gremio HQ</span>
            <p>Formando desarrolladores desde 2025.</p>
        </div>
        <div class="footer-links">
            <h4>Recursos</h4>
            <ul>
                <li><a href="#">Documentación</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Changelog</a></li>
            </ul>
        </div>
        <div class="footer-links">
            <h4>Comunidad</h4>
            <ul>
                <li><a href="#">Discord</a></li>
                <li><a href="#">GitHub</a></li>
                <li><a href="#">Twitter</a></li>
            </ul>
        </div>
    </footer>
</body>
</html>`,
      css_template: `/* Reset */
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Segoe UI', sans-serif; background: #0a0a1a; color: #e0e0e0; }

/* ─── RETO 1: NAVBAR ────────────────────────────────────
   .navbar debe usar flexbox para poner logo a la izquierda
   y .nav-links a la derecha. Alineados verticalmente al centro.
   Usa: background oscuro, padding, position sticky, top: 0, z-index */

.navbar {
    padding: 0 40px;
    height: 64px;
    /* Tu flexbox aquí */
}
.logo { font-size: 1.3em; font-weight: bold; color: #ffd700; }
/* .nav-links debe ser flex con gap entre links */
.nav-links { /* Tu código aquí */ }
.nav-links a { color: #ccc; text-decoration: none; }
.btn-nav { background: #e94560; color: white; padding: 8px 16px; border-radius: 20px; }


/* ─── RETO 2: HERO SECTION ──────────────────────────────
   .hero debe ocupar 80vh y usar flexbox para centrar todo.
   .hero-content (hijo) debe arranging en columna con gap.
   .hero-buttons debe ser flex en fila con gap y flex-wrap. */

.hero {
    min-height: 80vh;
    background: linear-gradient(135deg, #0f0f23, #1a1a3a);
    /* Centrado total con flexbox: */
    /* Tu código aquí */
}
.hero-content { text-align: center; max-width: 600px; padding: 20px; /* Tu código flexbox en columna */ }
.hero-content h1 { font-size: 2.5em; color: #ffd700; margin-bottom: 16px; }
.hero-content p { color: #a0a0b0; margin-bottom: 24px; font-size: 1.1em; }
.hero-buttons { /* Tu flexbox fila con gap y wrap */ }
.btn-primary { background: #e94560; color: white; padding: 14px 28px; border: none; border-radius: 8px; font-size: 1em; cursor: pointer; }
.btn-secondary { background: transparent; color: #ffd700; border: 2px solid #ffd700; padding: 14px 28px; border-radius: 8px; font-size: 1em; cursor: pointer; }


/* ─── RETO 3: CARDS ─────────────────────────────────────
   .cards-section: padding general.
   .cards-container: flex con wrap, gap, justify-content center.
   .card: tamaño mínimo de 220px, padding, background, border-radius.
          Dentro: flex en columna con align-items center y gap.
   .card-featured: debe crecer el doble que las demás (flex-grow: 2).
   .card-link: debe usar align-self para ir al fondo (auto margin o flex). */

.cards-section { padding: 80px 40px; }
.cards-section h2 { text-align: center; color: #ffd700; font-size: 1.8em; margin-bottom: 40px; }
.cards-container { /* Tu flexbox aquí */ }
.card { /* padding, background, border-radius, min-width */ }
.card-icon { font-size: 2.5em; margin-bottom: 10px; }
.card h3 { color: #ffd700; margin-bottom: 10px; }
.card p { color: #a0a0b0; text-align: center; font-size: 0.9em; }
.card-link { color: #e94560; text-decoration: none; font-weight: bold; margin-top: auto; }


/* ─── RETO 4: FOOTER ────────────────────────────────────
   .footer: flex en fila, gap, wrap.
   Columnas con flex: 1 para que se distribuyan.
   .footer-links ul: list-style none, flex en columna, gap. */

.footer {
    background: #050510;
    padding: 40px;
    border-top: 1px solid #1a1a2e;
    /* Tu flexbox aquí */
}
.footer-brand p { color: #666; margin-top: 8px; font-size: 0.9em; }
.footer-links { /* flex: 1, padding */ }
.footer-links h4 { color: #ffd700; margin-bottom: 12px; }
.footer-links ul { /* lista flex columna */ }
.footer-links ul li { list-style: none; }
.footer-links a { color: #888; text-decoration: none; }`,
      js_template: '',
      instruction_for_ai: `Evalúa el uso de Flexbox. REGLAS ESTRICTAS:
1. .navbar DEBE usar display:flex con justify-content:space-between y align-items:center. REPROBAR si no hay ambas propiedades.
2. .hero DEBE usar display:flex para centrar vertical y horizontalmente (justify-content:center + align-items:center). REPROBAR si falta.
3. .hero-content DEBE ser flex-direction:column con gap. REPROBAR si no.
4. .hero-buttons DEBE ser flex en fila con gap y flex-wrap (para responsividad). REPROBAR si no.
5. .cards-container DEBE ser display:flex con flex-wrap:wrap y gap. REPROBAR si no.
6. .card-featured DEBE tener flex-grow mayor a 1 (para crecer más). REPROBAR si no.
7. .footer DEBE ser display:flex con flex-wrap. REPROBAR si no.
8. REPROBAR el uso de float o position absolute/fixed para lograr los layouts.`
    },

    // ── M02 E3 ────────────────────────────────────────────
    {
      slug: 'M02-E03-variables-css',
      title: '🎨 La Sala de las Runas',
      description: 'Crea un sistema de diseño completo con variables CSS (custom properties), modo oscuro/claro con :root, tipografía con Google Fonts, y micro-animaciones con transition y transform.',
      sort_order: 3,
      type: 'html',
      html_template: `<!-- 
══════════════════════════════════════════════════════
📖 TEORÍA: Variables CSS, Tipografía y Animaciones
══════════════════════════════════════════════════════

VARIABLES CSS (Custom Properties):
  :root {
    --color-primario: #6c63ff;  /* Variable global */
    --espaciado: 16px;
  }
  .btn { background: var(--color-primario); }   /* Uso */
  .btn { padding: var(--espaciado); }

GOOGLE FONTS (en el <head>, antes del CSS):
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
  body { font-family: 'Inter', sans-serif; }

TRANSICIONES:
  transition: propiedad duración función-de-tiempo retardo;
  transition: all 0.3s ease;
  transition: background 0.2s ease, transform 0.3s cubic-bezier(0.2,-0.8,0.2,2);

TRANSFORMACIONES:
  transform: translateY(-5px);   /* Mover verticalmente */
  transform: scale(1.05);        /* Escalar */
  transform: rotate(45deg);      /* Rotar */
  transform: translateX(-50%) translateY(-50%); /* Combinar */

ANIMACIONES @keyframes:
  @keyframes aparecer {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .elemento { animation: aparecer 0.5s ease forwards; }

:root vs .dark-mode:
  :root { --fondo: white; --texto: black; }
  .dark-mode { --fondo: #0a0a0a; --texto: white; }

══════════════════════════════════════════════════════
🎮 MISIÓN: La Sala de las Runas Mágicas
══════════════════════════════════════════════════════
Construye un sistema de diseño con variables y animaciones.
══════════════════════════════════════════════════════
-->
<!DOCTYPE html>
<html lang="es" class="light-mode">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- RETO 1: Agrega el import de Google Fonts "Inter" (weights 400, 600, 700) -->
    <title>La Sala de las Runas</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <header class="topbar">
        <span class="site-title">🔮 Sala de las Runas</span>
        <!-- RETO 5: Este botón cambiará entre modo claro/oscuro con JS -->
        <button id="toggleMode" class="btn-toggle">🌙 Modo Oscuro</button>
    </header>

    <main class="main-content">
        <section class="hero-runa">
            <h1 class="titulo-principal">Las Runas del Código</h1>
            <p class="subtitulo">Cada runa contiene el poder de un concepto fundamental.</p>
        </section>

        <section class="runas-grid">
            <div class="runa-card">
                <div class="runa-icono">⚡</div>
                <h3>Variables</h3>
                <p>El poder de almacenar y transformar datos.</p>
                <a href="#" class="btn-runa">Explorar</a>
            </div>
            <div class="runa-card">
                <div class="runa-icono">🔄</div>
                <h3>Ciclos</h3>
                <p>La magia de repetir acciones sin esfuerzo.</p>
                <a href="#" class="btn-runa">Explorar</a>
            </div>
            <div class="runa-card runa-especial">
                <div class="runa-icono">🧠</div>
                <h3>Funciones</h3>
                <p>Encapsula el conocimiento y reutiliza el poder.</p>
                <a href="#" class="btn-runa">Explorar</a>
            </div>
        </section>

        <section class="input-demo">
            <h2>Prueba las Runas</h2>
            <input type="text" class="input-magico" placeholder="Escribe tu hechizo...">
            <button class="btn-hechizo">✨ Lanzar Hechizo</button>
        </section>
    </main>

    <script>
        // RETO 5: Implementa el toggle de modo claro/oscuro.
        // Al hacer click en #toggleMode:
        // - Si el html tiene clase "light-mode": quítala y agrega "dark-mode", cambia el texto del botón a "☀️ Modo Claro"
        // - Si tiene "dark-mode": quítala y agrega "light-mode", cambia el texto a "🌙 Modo Oscuro"
        const btn = document.getElementById('toggleMode');
        btn.addEventListener('click', () => {
            // Tu código aquí
        });
    </script>
</body>
</html>`,
      css_template: `/* ─── RETO 1: Importa 'Inter' desde Google Fonts (también en el HTML <head>) ── */

/* ─── RETO 2: Define las variables CSS en :root y .dark-mode ──────────────── */
/* Define al menos estas 6 variables para cada modo:
   --color-fondo, --color-superficie, --color-texto, 
   --color-primario, --color-acento, --color-borde
   El modo light debe tener colores claros, el dark colores oscuros. */

:root, .light-mode {
  /* Tu código aquí */
  font-family: 'Inter', sans-serif;
}

.dark-mode {
  /* Tu código aquí con los mismos nombres de variable pero valores oscuros */
}

/* ─── RETO 3: Aplica las variables al diseño ──────────────────────────────── */
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background-color: var(--color-fondo);
  color: var(--color-texto);
  transition: background-color 0.3s ease, color 0.3s ease;
  min-height: 100vh;
}

.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 40px;
  background: var(--color-superficie);
  border-bottom: 1px solid var(--color-borde);
}
.site-title { font-size: 1.2em; font-weight: 700; color: var(--color-primario); }

.main-content { padding: 60px 40px; max-width: 900px; margin: 0 auto; }

.hero-runa { text-align: center; margin-bottom: 60px; }
/* .titulo-principal: font-size grande (2.5em+), font-weight 700, color primario.
   DEBE tener una animación @keyframes que lo haga aparecer (desde opacity 0 + translateY) */
.titulo-principal { /* Tu código aquí */ }
/* .subtitulo: color --color-texto con opacidad, tamaño 1.1em, margin-top */
.subtitulo { /* Tu código aquí */ }

/* ─── RETO 4: Estilos de las cards con hover animations ──────────────────── */
.runas-grid {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 60px;
}

/* .runa-card:
   - background: var(--color-superficie)
   - border: 1px solid var(--color-borde)
   - padding, border-radius, text-align center
   - TRANSITION para el hover (transform + box-shadow)
   - flex: 1, min-width: 200px */
.runa-card { /* Tu código aquí */ }

/* .runa-card:hover:
   - transform: translateY(-8px)
   - box-shadow con el color primario (usa rgba o la variable) */
.runa-card:hover { /* Tu código aquí */ }

.runa-icono { font-size: 2.5em; margin-bottom: 12px; }
.runa-card h3 { color: var(--color-primario); margin-bottom: 8px; }

/* .runa-especial debe tener el borde izquierdo de --color-acento y background ligeramente diferente */
.runa-especial { /* Tu código aquí */ }

/* .btn-runa:
   - display inline-block, margin-top 16px
   - background: var(--color-primario), color blanco, padding, border-radius
   - text-decoration: none
   - TRANSITION + :hover con transform: scale(1.05) */
.btn-runa { /* Tu código aquí */ }
.btn-runa:hover { /* Tu código aquí */ }

/* ─── Input mágico ──────────────────────────────────────────────────────── */
.input-demo { text-align: center; }
.input-demo h2 { color: var(--color-primario); margin-bottom: 20px; }
.input-magico {
  padding: 12px 20px; border: 2px solid var(--color-borde);
  border-radius: 8px; font-size: 1em; width: 280px;
  background: var(--color-superficie); color: var(--color-texto);
  transition: border-color 0.2s ease;
}
/* :focus en .input-magico → border-color: var(--color-primario), outline none */
.input-magico:focus { /* Tu código aquí */ }

.btn-hechizo {
  margin-left: 10px; padding: 12px 24px; border: none; border-radius: 8px;
  background: var(--color-primario); color: white; cursor: pointer; font-size: 1em;
  transition: transform 0.2s ease;
}
.btn-hechizo:hover { transform: scale(1.08); }

/* .btn-toggle del header */
.btn-toggle {
  padding: 8px 16px; border: 1px solid var(--color-borde); border-radius: 20px;
  background: transparent; color: var(--color-texto); cursor: pointer; transition: all 0.2s;
}

/* ─── RETO 4b: @keyframes para el .titulo-principal ──────────────────────── */
@keyframes aparecer {
  /* Tu código aquí: from con opacity 0 y translateY(30px), to con opacity 1 y translateY(0) */
}`,
      js_template: '',
      instruction_for_ai: `Evalúa el sistema de diseño con CSS Variables y animaciones. REGLAS:
1. Debe importar Google Fonts (link en HTML o @import en CSS). REPROBAR si no usa ninguna fuente web.
2. Debe definir variables CSS en :root o .light-mode. Mínimo 4 variables diferentes (colores). REPROBAR si no.
3. Debe definir un segundo conjunto de variables para .dark-mode con valores diferentes. REPROBAR si no.
4. Los estilos del cuerpo DEBEN usar var() para los colores. REPROBAR si usa colores hardcoded sin variables.
5. transition: background/color en body para el cambio suave de modo. REPROBAR si no.
6. .runa-card DEBE tener :hover con transform: translateY AND transition definida. REPROBAR si solo cambia color.
7. @keyframes DEBE existir y aplicarse a .titulo-principal con animation propiedad. REPROBAR si no hay animación.
8. El botón toggle JS debe funcionar: debe alternar las clases light-mode y dark-mode en el elemento html. REPROBAR si el JS está vacío.`
    },
  ],

  // ──────────────────────────────────────────────────────────
  'M03-VARS': [
    // ── M03 E1 ────────────────────────────────────────────
    {
      slug: 'M03-E01-variables',
      title: '📦 El Sistema de Inventario',
      description: 'Domina var, let y const. Explora los tipos primitivos, typeof, operadores aritméticos y template literals construyendo el sistema de inventario del Gremio.',
      sort_order: 1,
      type: 'js',
      html_template: `// ╔══════════════════════════════════════════════════════════════╗
// ║   📖 TEORÍA: Variables y Tipos de Datos en JavaScript        ║
// ╠══════════════════════════════════════════════════════════════╣
//
//  var   → Ámbito global/función. Se puede redeclarar. ⚠️ EVITAR.
//  let   → Ámbito de bloque {}. Reasignable. Usa cuando el valor cambia.
//  const → Ámbito de bloque {}. No reasignable. Usa para valores fijos.
//
//  Tipos Primitivos:
//  ┌──────────────────┬───────────────────────────────────────────┐
//  │  "texto"         │ string  - Texto con comillas o backticks   │
//  │  42 / 3.14       │ number  - Enteros y decimales              │
//  │  true / false    │ boolean - Verdadero o falso                │
//  │  undefined       │         - Variable declarada sin valor     │
//  │  null            │         - Ausencia INTENCIONAL de valor    │
//  └──────────────────┴───────────────────────────────────────────┘
//
//  typeof variable   → Devuelve el tipo como string
//  Ej: typeof 42 === "number"   typeof "hola" === "string"
//
//  Operadores: +  -  *  /  %  **  +=  -=  ++  --
//
//  Template Literals (backticks):
//  const msg = \`Hola \${nombre}, tienes \${edad} años y sumas \${a + b}\`;
//
// ╚══════════════════════════════════════════════════════════════╝

// ╔══════════════════════════════════════════════════════════════╗
// ║   🎮 MISIÓN: El Sistema de Inventario del Gremio            ║
// ╠══════════════════════════════════════════════════════════════╣
//  El Gremio necesita rastrear sus items mágicos.
//  Construye el sistema de inventario desde cero.
// ╚══════════════════════════════════════════════════════════════╝

// ─── RETO 1: El Item Mágico ────────────────────────────────────────────────
// Declara variables para representar el item "Espada del Amanecer":
// - nombre: string "Espada del Amanecer" → ¿const o let? (no cambia)
// - precio: number 2500 → ¿const o let? (va a cambiar con descuentos)
// - disponible: boolean true → ¿const o let? (puede cambiar)
// - codigo: necesitas declarar la variable pero NO asignarle valor todavía
//   (debe quedar undefined por ahora)
//
// Tu código aquí:



// ─── RETO 2: El Descuento ──────────────────────────────────────────────────
// Se aplicó un descuento del 18%. Calcula:
// 1. El nuevo precio con descuento (reasigna 'precio', no redeclares).
// 2. El precio final con 12% de impuesto. Guárdalo en una const 'precioFinal'.
// 3. El ahorro total (precio original - precioFinal). Guárdalo en 'ahorro'.
//    Hay que guardar el precio original antes de modificarlo!
//    Pista: declara const precioOriginal = precio; ANTES de modificar precio.
//
// Tu código aquí:



console.log("Precio con descuento:", precio);
console.log("Precio final:", precioFinal);
console.log("Ahorro:", ahorro);

// ─── RETO 3: El Template Literal ──────────────────────────────────────────
// Construye el mensaje del item usando un template literal:
// "📦 Item: [nombre] | Precio: $[X.XX] | Estado: [Disponible/Agotado] | Código: [codigo o 'SIN CÓDIGO']"
// - Usa .toFixed(2) para el precio.
// - Usa operador ternario DENTRO del template para el estado.
// - Para código: si es undefined, muestra "SIN CÓDIGO" (pista: usa ?? o ternario con typeof).
//
const mensajeItem = ``;  // ← completa aquí
console.log(mensajeItem);

// ─── RETO 4: Inspector de Tipos ───────────────────────────────────────────
// Crea un objeto 'reporte' que contenga el tipo de CADA variable declarada.
// Usa typeof. El objeto debe tener una clave por cada variable.
// Luego imprime cada par clave-valor en un loop.
//
const reporte = {
  // Tu código aquí (usa typeof para cada variable)
};

for (const clave in reporte) {
  console.log(\`\${clave}: \${reporte[clave]}\`);
}

// ─── RETO 5: El Carrito ────────────────────────────────────────────────────
// El Gremio quiere comprar 3 items. Declara 3 objetos simples con nombre y precio.
// Suma los 3 precios in una variable 'subtotal'.
// Aplica impuesto del 12% → 'totalConImpuesto'.
// Muestra: "🛒 Carrito: [item1], [item2], [item3] | Subtotal: $XX.XX | Total: $XX.XX"
//
// Tu código aquí:`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa el código JavaScript de variables y tipos. REGLAS ESTRICTAS:
1. RETO 1: Debe usar 'const' para nombre + al menos 2 variables con 'let'. REPROBAR si usa var o si usa const para una variable que luego reasigna.
2. RETO 1: La variable 'codigo' debe estar declarada con let sin valor asignado (= undefined implícito). REPROBAR si no existe.
3. RETO 2: Debe reasignar precio (no redeclarar). Debe calcular correctamente el 18% y 12%. REPROBAR si usa var para nuevas declaraciones en este reto.
4. RETO 3: DEBE usar backtick template literal, no concatenación con +. DEBE usar ternario para el estado. REPROBAR si usa concatenación.
5. RETO 4: Debe existir el objeto 'reporte' con valores obtenidos mediante typeof. REPROBAR si hardcodea los tipos como strings sin usar typeof.
6. RETO 5: Debe declarar 3 items, calcular subtotal y total con impuesto, y mostrar el mensaje. REPROBAR si falta el cálculo del impuesto.
7. El código debe ejecutarse sin errores de sintaxis. REPROBAR si hay errores obvios.`
    },

    // ── M03 E2 ────────────────────────────────────────────
    {
      slug: 'M03-E02-tipos-conversion',
      title: '🔄 El Convertidor de Grimorios',
      description: 'Aprende coerción de tipos, funciones de conversión (parseInt, parseFloat, Number, String, Boolean), métodos de String y las trampas del tipo dinámico de JS.',
      sort_order: 2,
      type: 'js',
      html_template: `// ╔══════════════════════════════════════════════════════════════╗
// ║   📖 TEORÍA: Conversión y Coerción de Tipos                 ║
// ╠══════════════════════════════════════════════════════════════╣
//
//  COERCIÓN IMPLÍCITA (JS lo convierte automáticamente):
//  "5" + 3    → "53"   (number se convierte a string)
//  "5" - 3    → 2      (string se convierte a number)
//  "5" * "2"  → 10     (ambos a number)
//  true + 1   → 2      (boolean a number: true=1, false=0)
//  null + 1   → 1      (null a number 0)
//  undefined + 1 → NaN
//
//  CONVERSIÓN EXPLÍCITA (tú la controlas):
//  Number("42")      → 42          Number("hola") → NaN
//  Number(true)      → 1           Number(false)  → 0
//  Number(null)      → 0           Number(undefined) → NaN
//  parseInt("42px")  → 42          parseInt("precio") → NaN
//  parseFloat("3.14km") → 3.14
//  String(42)        → "42"        String(true) → "true"
//  Boolean(0)        → false       Boolean("") → false
//  Boolean(null)     → false       Boolean(undefined) → false
//  Boolean(NaN)      → false
//  Boolean("texto")  → true        Boolean(1) → true
//  // Falsy values: 0, "", null, undefined, NaN, false
//
//  NaN (Not a Number):
//  isNaN("hola")  → true     Number.isNaN("hola") → false ← más preciso
//  Number.isNaN(NaN) → true  Number.isFinite(Infinity) → false
//
//  COMPARACIÓN:
//  == (igualdad débil): "5" == 5  → true  (coerción implícita)
//  === (igualdad estricta): "5" === 5 → false  (no coerciona)
//  SIEMPRE usa === en código real.
//
//  MÉTODOS DE STRING:
//  "hola".toUpperCase()          → "HOLA"
//  "MUNDO".toLowerCase()         → "mundo"
//  "  hola  ".trim()             → "hola"
//  "hola mundo".includes("mund") → true
//  "hola".startsWith("ho")       → true
//  "hola".endsWith("la")         → true
//  "hola mundo".split(" ")       → ["hola", "mundo"]
//  "hola".replace("h", "b")      → "bola"
//  "hola".slice(1, 3)            → "ol"
//  "abc".repeat(3)               → "abcabcabc"
//  "42".padStart(5, "0")         → "00042"
//  "hola mundo".indexOf("mundo") → 5
//
// ╚══════════════════════════════════════════════════════════════╝

// ╔══════════════════════════════════════════════════════════════╗
// ║   🎮 MISIÓN: El Convertidor de Grimorios                    ║
// ╠══════════════════════════════════════════════════════════════╣
//  El Gremio recibe datos de varias fuentes (formularios, APIs)
//  con tipos mezclados. Tu trabajo: normalizar y validar todo.
// ╚══════════════════════════════════════════════════════════════╝

// ─── RETO 1: Predice y verifica la coerción implícita ────────────────────
// Sin ejecutar, predice el resultado de cada operación.
// Luego declara las variables y verifica con console.log.
// Comenta al lado de cada console.log cuál era tu predicción.
//
const r1 = "10" + 5;           // Predicción: 
const r2 = "10" - 5;           // Predicción: 
const r3 = true + true + 1;    // Predicción: 
const r4 = null + undefined;    // Predicción: 
const r5 = "5" * "3";          // Predicción: 
const r6 = false + "1";        // Predicción: 
console.log(r1, r2, r3, r4, r5, r6);

// ─── RETO 2: Convierte datos del formulario de reclutamiento ─────────────
// El formulario envió estos strings. Conviértelos a los tipos correctos:
const edadStr    = "23";
const precioStr  = "  1500.75  ";   // Tiene espacios extra
const niveStr    = "3";
const dañoStr    = "999daño";       // Tiene texto mezclado
const inputRoto  = "no-es-numero";  // Este no puede convertirse

// Convierte cada uno al tipo numérico adecuado:
const edadNum    = /* Tu código */;    // Number o parseInt
const precioNum  = /* Tu código */;    // Elimina spaces primero, luego parseFloat
const nivelNum   = /* Tu código */;    // parseInt
const dañoNum    = /* Tu código */;    // parseInt funciona incluso con texto al final
const inputNum   = /* Tu código */;    // Intenta Number()

console.log(edadNum, typeof edadNum);
console.log(precioNum, typeof precioNum);
console.log(nivelNum, typeof nivelNum);
console.log(dañoNum, typeof dañoNum);
console.log(inputNum, typeof inputNum);

// ─── RETO 3: Validador de datos con isNaN ────────────────────────────────
// Crea una función 'esNumeroValido(valor)' que:
// 1. Primero convierte el valor a Number
// 2. Verifica que NO sea NaN usando Number.isNaN()
// 3. Verifica que NO sea Infinity usando Number.isFinite()
// 4. Devuelve true si es un número válido y finito, false si no.
//
// Tu código aquí:



console.log(esNumeroValido("42"));         // true
console.log(esNumeroValido("hola"));       // false
console.log(esNumeroValido(""));           // false (Number("") es 0, pero string vacío no es número válido)
// Truco: un string vacío convierte a 0, que sí es Number.isFinite... ¿cómo lo manejas?
console.log(esNumeroValido(null));         // false
console.log(esNumeroValido(Infinity));     // false

// ─── RETO 4: El Transformador de Nombres ─────────────────────────────────
// El Gremio recibe nombres de héroes con diferentes formatos.
// Normaliza TODOS a "Nombre Apellido" (Title Case, sin espacios extra).
// Usa: trim, split, map con toUpperCase/slice, y join.
//
const nombres = [
  "  aragorn  el viajero  ",
  "LEGOLAS VERDEBOSQUE",
  "gimli hijo de gloin",
  "  GANDALF  "
];

// Pista: "hello world".split(" ").map(p => p[0].toUpperCase() + p.slice(1).toLowerCase()).join(" ")
// ¡Pero cuidado con los espacios extra en los extremos!

const nombresNormalizados = /* Tu código aquí (usa .map() sobre el array) */;
console.log(nombresNormalizados);

// ─── RETO 5: === vs == — Las trampas del Gremio ──────────────────────────
// Evalúa cada comparación y explica en un comentario POR QUÉ da ese resultado.
// Luego verifica con console.log.
//
const trap1 = (0 == false);    // Resultado esperado y por qué:
const trap2 = (0 === false);   // Resultado esperado y por qué:
const trap3 = ("" == false);   // Resultado esperado y por qué:
const trap4 = (null == undefined);   // Resultado esperado y por qué:
const trap5 = (null === undefined);  // Resultado esperado y por qué:
const trap6 = (NaN === NaN);         // Resultado esperado y por qué:

console.log({ trap1, trap2, trap3, trap4, trap5, trap6 });
// Bonus: ¿Cómo verificas si algo es NaN si NaN !== NaN?`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa el dominio de tipos y coerción JS. REGLAS ESTRICTAS:
1. RETO 1: Las 6 constantes deben tener los valores correctos. Verificar: r1="105", r2=5, r3=3, r4=NaN, r5=15, r6="false1". REPROBAR si los resultados comentados son incorrectos O si no hay comentarios con predicciones.
2. RETO 2: Debe usar trim() para precioStr antes de parseFloat. Debe usar parseInt para dañoStr (para obtener 999). REPROBAR si usa Number() para dañoStr (daría NaN).
3. RETO 3: La función esNumeroValido DEBE existir y usar Number.isNaN (no isNaN global). Debe manejar string vacío correctamente. REPROBAR si no existe la función.
4. RETO 4: Debe usar trim() Y manejar espacios múltiples entre palabras (split con regex /\s+/ o similar). Debe producir "Aragorn El Viajero", "Legolas Verdebosque", etc. REPROBAR si no normaliza correctamente.
5. RETO 5: Debe haber comentarios que expliquen el por qué de cada resultado. trap1=true, trap2=false, trap3=true, trap4=true, trap5=false, trap6=false. REPROBAR si los comentarios están vacíos.`
    },

    // ── M03 E3 ────────────────────────────────────────────
    {
      slug: 'M03-E03-strings',
      title: '📜 El Grimorio de los Strings',
      description: 'Domina todos los métodos de String: manipulación, búsqueda, transformación, y construcción de strings complejos con template literals avanzados.',
      sort_order: 3,
      type: 'js',
      html_template: `// ╔══════════════════════════════════════════════════════════════╗
// ║   🎮 MISIÓN: El Grimorio de los Strings                     ║
// ╠══════════════════════════════════════════════════════════════╣
//  Los strings son el tipo de dato más usado en el desarrollo.
//  Dominar sus métodos es esencial para cualquier aventurero.
// ╚══════════════════════════════════════════════════════════════╝

// ─── RETO 1: El Validador de Contraseñas del Gremio ──────────────────────
// Crea una función 'validarContraseña(pass)' que verifique:
// 1. Tiene al menos 8 caracteres (.length)
// 2. No empieza ni termina con espacio (.trim() + comparación)
// 3. Contiene al menos un número (pista: /\d/.test(pass))
// 4. Contiene al menos una mayúscula (pista: /[A-Z]/.test(pass))
//
// La función devuelve un objeto: 
// { valida: boolean, errores: [] (array con mensajes de errores encontrados) }
//
function validarContraseña(pass) {
  const errores = [];
  // Tu código aquí (agrega a 'errores' cuando no cumple una regla)
  
  return { valida: errores.length === 0, errores };
}

console.log(validarContraseña("hola"));           // inválida (corta, sin número, sin mayúscula)
console.log(validarContraseña(" MiPass1 "));      // inválida (espacios en extremos)
console.log(validarContraseña("MiContraseña1")); // válida

// ─── RETO 2: El Formateador de Mensajes del Gremio ───────────────────────
// El Gremio envía mensajes así: "nombre_heroe|nivel|misiones_completadas|rango"
// Ej: "aragorn|15|42|maestro"
// Crea una función 'parsearMensaje(msg)' que:
// 1. Separe el mensaje por "|"
// 2. Convierta el nivel y misiones a números
// 3. Capitalice el nombre (primera letra mayúscula)
// 4. Ponga el rango en MAYÚSCULAS
// 5. Devuelva: { nombre, nivel, misiones, rango, resumen }
//    donde resumen = "Héroe [Nombre] | Rango: [RANGO] | Lv.[nivel] | [misiones] misiones"
//
function parsearMensaje(msg) {
  // Tu código aquí
}

console.log(parsearMensaje("aragorn|15|42|maestro"));
console.log(parsearMensaje("legolas|20|89|legendario"));

// ─── RETO 3: El Buscador de Runas ───────────────────────────────────────
// Dado un texto largo del Grimorio, encuentra y reemplaza runas.
// Crea una función 'procesarGrimorio(texto, runaOculta, runaNueva)' que:
// 1. Cuente cuántas veces aparece runaOculta en el texto (pista: split + length - 1)
// 2. Reemplace TODAS las ocurrencias de runaOculta por runaNueva
//    (pista: .replaceAll() o new RegExp con flag 'g')
// 3. Devuelva: { texto: textoModificado, ocurrencias: número }
//
function procesarGrimorio(texto, runaOculta, runaNueva) {
  // Tu código aquí
}

const grimorio = "El fuego consume a los débiles. El fuego purifica a los fuertes. El fuego es el origen de toda magia. Sin fuego no hay luz.";
console.log(procesarGrimorio(grimorio, "fuego", "🔥"));

// ─── RETO 4: El Generador de IDs Únicos ─────────────────────────────────
// El Gremio necesita generar IDs para sus miembros en este formato:
// "GLD-[INICIALES]-[AÑO]-[NÚMERO_PADDED]"
// Ej: para "Juan Carlos Pérez", año 2025, número 7 → "GLD-JCP-2025-0007"
//
// Crea 'generarId(nombreCompleto, año, número)' que:
// 1. Saque las iniciales de cada palabra del nombre (primera letra de cada palabra)
// 2. Las ponga en mayúsculas y las una sin separador
// 3. Convierta el año a string
// 4. Formatee el número con zeros a la izquierda hasta 4 dígitos (.toString().padStart(4, "0"))
// 5. Una todo con el formato correcto
//
function generarId(nombreCompleto, año, numero) {
  // Tu código aquí
}

console.log(generarId("Aragorn El Viajero", 2025, 1));    // "GLD-AEV-2025-0001"
console.log(generarId("Legolas Verdebosque", 2025, 23));  // "GLD-LV-2025-0023"
console.log(generarId("Gandalf El Gris", 2024, 999));     // "GLD-GEG-2024-0999"

// ─── RETO 5: El Cifrado del Gremio ──────────────────────────────────────
// El Gremio usa un cifrado simple: desplaza cada letra N posiciones en el alfabeto.
// A→D, B→E, ... Z→C (con N=3, se wrappea)
// 
// Crea 'cifrar(texto, desplazamiento)' que cifre solo letras (mayúsculas y minúsculas).
// Deja espacios, números y símbolos sin cambio.
// Crea 'descifrar(texto, desplazamiento)' que revierta el cifrado.
//
// Pista: usa charCodeAt() y fromCharCode(). Rango A-Z: 65-90, a-z: 97-122.
// Fórmula: ((charCode - base + desplazamiento) % 26) + base
//
function cifrar(texto, desplazamiento) {
  // Tu código aquí
}

function descifrar(texto, desplazamiento) {
  // Tu código aquí (aplica el cifrado inverso)
}

const mensaje = "Gremio de Codigo";
const cifrado = cifrar(mensaje, 3);
const descifrado = descifrar(cifrado, 3);
console.log("Original:", mensaje);
console.log("Cifrado:", cifrado);
console.log("Descifrado:", descifrado);
console.log("Coinciden:", mensaje === descifrado);`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa las operaciones de String en JavaScript. REGLAS:
1. RETO 1: La función validarContraseña DEBE existir y verificar las 4 condiciones. Debe devolver { valida, errores }. REPROBAR si falta alguna validación o si no devuelve objeto con ambas propiedades.
2. RETO 2: parsearMensaje DEBE usar split("|"), convertir nivel y misiones con Number/parseInt, capitalizar nombre, y devolver objeto con resumen usando template literal. REPROBAR si no usa split.
3. RETO 3: procesarGrimorio DEBE contar ocurrencias Y reemplazar TODAS (no solo la primera). REPROBAR si usa .replace() simple sin regex global o .replaceAll().
4. RETO 4: generarId DEBE extraer iniciales de CADA palabra, convertirlas a mayúsculas, y usar padStart(4, "0"). REPROBAR si hardcodea resultados o no usa padStart.
5. RETO 5: cifrar Y descifrar DEBEN existir y funcionar correctamente. El texto debe descifrar al original. REPROBAR si solo implementa una función o si el cifrado es incorrecto.`
    },
  ],

  // ──────────────────────────────────────────────────────────
  'M04-IF': [
    {
      slug: 'M04-E01-if-else',
      title: '🚪 El Guardián de las Puertas',
      description: 'Domina if/else, operadores lógicos (&&, ||, !), condiciones anidadas y el operador ternario construyendo el sistema de control de acceso del Gremio.',
      sort_order: 1,
      type: 'js',
      html_template: `// ╔══════════════════════════════════════════════════════════════╗
// ║   📖 TEORÍA: Estructuras de Decisión                        ║
// ╠══════════════════════════════════════════════════════════════╣
//
//  if (condición) { ... } else if (...) { ... } else { ... }
//
//  OPERADORES LÓGICOS:
//  &&  (AND): true solo si AMBOS son true
//  ||  (OR):  true si AL MENOS UNO es true
//  !   (NOT): invierte el boolean
//
//  OPERADORES DE COMPARACIÓN:
//  ===  igual estricto     !==  diferente estricto
//  >    mayor que          <    menor que
//  >=   mayor o igual      <=   menor o igual
//
//  OPERADOR TERNARIO:
//  condición ? valorSiTrue : valorSiFalse
//  const msg = edad >= 18 ? "Mayor" : "Menor";
//
//  NULLISH COALESCING (??) — nuevo en ES2020:
//  const nombre = usuario.nombre ?? "Invitado";
//  // Si usuario.nombre es null o undefined → "Invitado"
//  // OJO: ?? solo actúa con null/undefined, no con "" o 0
//
//  OPTIONAL CHAINING (?.) — nuevo en ES2020:
//  const ciudad = usuario?.direccion?.ciudad;
//  // Si usuario o usuario.direccion no existen → undefined (sin error)
//
//  SWITCH:
//  switch (valor) {
//    case "a": ...; break;
//    case "b": ...; break;
//    default:  ...;
//  }
//
// ╚══════════════════════════════════════════════════════════════╝

// ╔══════════════════════════════════════════════════════════════╗
// ║   🎮 MISIÓN: El Sistema de Control de Acceso del Gremio     ║
// ╚══════════════════════════════════════════════════════════════╝

// ─── RETO 1: El Guardián de la Puerta Principal ──────────────────────────
// Crea una función 'puedeEntrar(heroe)' que recibe un objeto heroe con:
// { nombre, nivel, esActivo, rangos: [] }
// El guardián PERMITE el acceso SI:
//   - nivel >= 5 AND esActivo === true
//   - OR está en lista de rangos especiales: ["Maestro", "Leyenda", "Guardián"]
// El guardián RECHAZA con mensaje específico, nunca genérico.
//
function puedeEntrar(heroe) {
  const rangosEspeciales = ["Maestro", "Leyenda", "Guardián"];
  // Tu código aquí usando if/else con && y ||
  // Devuelve: { acceso: boolean, mensaje: string }
}

console.log(puedeEntrar({ nombre: "Frodo", nivel: 3, esActivo: true, rangos: [] }));
console.log(puedeEntrar({ nombre: "Aragorn", nivel: 15, esActivo: true, rangos: ["Maestro"] }));
console.log(puedeEntrar({ nombre: "Sauron", nivel: 99, esActivo: false, rangos: [] }));
console.log(puedeEntrar({ nombre: "Gandalf", nivel: 2, esActivo: true, rangos: ["Leyenda"] }));

// ─── RETO 2: Clasificador de Misiones ────────────────────────────────────
// Crea 'clasificarMision(dificultad, recompensa, tiempoEstimado)' que:
// - dificultad: número del 1-10
// - recompensa: oro en número
// - tiempoEstimado: horas en número
// 
// Clasifica la misión en una categoría Y determina si es rentable:
// Categoría por dificultad:
//   1-3: "Aprendiz", 4-6: "Veterano", 7-9: "Élite", 10: "Legendaria"
// Es rentable si: recompensa / tiempoEstimado >= 100 (oro por hora)
// Prioridad: "ALTA" si es Élite/Legendaria Y rentable. "MEDIA" si solo una. "BAJA" si ninguna.
//
function clasificarMision(dificultad, recompensa, tiempoEstimado) {
  // Tu código aquí — usa if/else if para categoría y ternarios para rentable/prioridad
}

console.log(clasificarMision(8, 800, 4));   // Élite, rentable, ALTA
console.log(clasificarMision(5, 50, 10));   // Veterano, no rentable, BAJA
console.log(clasificarMision(10, 500, 10)); // Legendaria, no rentable, MEDIA

// ─── RETO 3: Switch — El Menú de Comandos del Gremio ────────────────────
// Crea 'ejecutarComando(cmd, heroe)' con switch.
// Comandos válidos: "estado", "inventario", "misiones", "salir"
// - "estado": muestra nombre y nivel del héroe
// - "inventario": muestra "Mochila de [nombre]: [items] items"
//   heroe.items puede ser undefined → usa ?? con valor por defecto de 0
// - "misiones": muestra "Misiones activas: [misionesActivas]"
//   usa optional chaining para acceder a heroe.progreso?.misionesActivas ?? 0
// - "salir": "Hasta la próxima, [nombre]."
// - default: "Comando '[cmd]' no reconocido. Comandos válidos: estado, inventario, misiones, salir"
// Devuelve el mensaje como string.
//
function ejecutarComando(cmd, heroe) {
  // Tu código con switch
}

const heroe = { nombre: "Bilbo", nivel: 7, items: 12, progreso: { misionesActivas: 3 } };
console.log(ejecutarComando("estado", heroe));
console.log(ejecutarComando("inventario", heroe));
console.log(ejecutarComando("inventario", { nombre: "Sméagol", nivel: 5 })); // sin items
console.log(ejecutarComando("misiones", heroe));
console.log(ejecutarComando("misiones", { nombre: "Frodo", nivel: 8 })); // sin progreso
console.log(ejecutarComando("atacar", heroe));

// ─── RETO 4: El Sistema de Descuentos Encadenados ────────────────────────
// Crea 'calcularDescuento(precio, usuario)' donde usuario tiene:
// { esVIP, antiguedadAnios, misionesCompletadas, codigoCupon }
// Reglas de descuento (son ACUMULABLES, aplica todos los que correspondan):
//   - esVIP: -10%
//   - antiguedadAnios >= 2: -5%
//   - misionesCompletadas >= 50: -5%
//   - codigoCupon === "GREMIO2025": -15%
//   - El descuento máximo total es 30%.
// Devuelve: { precioOriginal, descuentoTotal, precioFinal, descuentos: [] }
// donde descuentos es un array de strings describiendo cada descuento aplicado.
//
function calcularDescuento(precio, usuario) {
  const descuentos = [];
  let descuentoTotal = 0;
  // Tu código aquí — suma los descuentos y registra cada uno
  
  descuentoTotal = Math.min(descuentoTotal, 30); // máximo 30%
  const precioFinal = precio * (1 - descuentoTotal / 100);
  return { precioOriginal: precio, descuentoTotal, precioFinal: +precioFinal.toFixed(2), descuentos };
}

const u1 = { esVIP: true, antiguedadAnios: 3, misionesCompletadas: 60, codigoCupon: "GREMIO2025" };
const u2 = { esVIP: false, antiguedadAnios: 1, misionesCompletadas: 10, codigoCupon: null };
console.log(calcularDescuento(1000, u1));  // Todos los descuentos, máx 30%
console.log(calcularDescuento(1000, u2));  // Sin descuento`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa las estructuras de decisión. REGLAS:
1. RETO 1: puedeEntrar DEBE usar && y || combinados. DEBE devolver objeto {acceso, mensaje}. El mensaje debe ser específico para cada caso de rechazo. REPROBAR si solo tiene if/else simple sin operadores lógicos.
2. RETO 2: clasificarMision DEBE usar if/else if para 4 categorías. DEBE calcular rentabilidad. DEBE determinar prioridad. REPROBAR si no calcula rentabilidad por hora.
3. RETO 3: ejecutarComando DEBE usar switch con al menos 4 cases + default. DEBE usar ?? para items y ?. para optional chaining. REPROBAR si usa if/else en vez de switch o si no usa ?? y ?..
4. RETO 4: calcularDescuento DEBE verificar las 4 condiciones, acumular porcentajes, y aplicar el límite de 30% con Math.min. DEBE devolver el array 'descuentos' con los nombres de cada descuento aplicado. REPROBAR si no limita al 30%.`
    },

    {
      slug: 'M04-E02-switch-ternario',
      title: '⚡ La Máquina de Decisiones',
      description: 'Profundiza en switch con fall-through, operadores ternarios anidados, short-circuit evaluation (&&, ||) y el operador nullish coalescing (??).',
      sort_order: 2,
      type: 'js',
      html_template: `// ╔══════════════════════════════════════════════════════════════╗
// ║   🎮 MISIÓN: La Máquina de Decisiones del Gremio            ║
// ╠══════════════════════════════════════════════════════════════╣
//  CONCEPTOS CLAVE DE ESTA MISIÓN:
//
//  FALL-THROUGH en switch (cuando no pones break, cae al siguiente case):
//  switch(dia) {
//    case "Lunes":
//    case "Martes":    // ← fall-through: Lunes Y Martes ejecutan esto
//      console.log("Día de entrenamiento");
//      break;
//    case "Domingo": console.log("Descanso"); break;
//  }
//
//  SHORT-CIRCUIT EVALUATION:
//  a && b  → Si a es falsy, devuelve a. Si a es truthy, devuelve b.
//  a || b  → Si a es truthy, devuelve a. Si a es falsy, devuelve b.
//  
//  Uso práctico:
//  usuario.nombre && console.log(usuario.nombre);  // Solo ejecuta si nombre es truthy
//  const nombre = usuario.nombre || "Invitado";    // Fallback
//  const nombre = usuario.nombre ?? "Invitado";    // Fallback con ?? (mejor para 0 y "")
//
// ╚══════════════════════════════════════════════════════════════╝

// ─── RETO 1: Switch con Fall-Through ─────────────────────────────────────
// Crea 'planDeDia(dia)' usando switch con fall-through para:
// - Lunes, Miércoles, Viernes → "Día de entrenamiento + estudio de código"
// - Martes, Jueves → "Día de misiones + práctica de combate"  
// - Sábado → "Día libre + revisión semanal"
// - Domingo → "Descanso total + planificación"
// - default → "Día inválido: " + dia
// Devuelve el mensaje como string.
//
function planDeDia(dia) {
  // Tu código con switch y fall-through
}

["Lunes", "Martes", "Sábado", "Domingo", "Festivo"].forEach(d => 
  console.log(d + ":", planDeDia(d))
);

// ─── RETO 2: Ternarios anidados (con moderación) ─────────────────────────
// Clasifica la posición de un héroe en el ranking:
// top 1 → "🥇 Campeón"
// top 2-3 → "🥈🥉 Podio"
// top 4-10 → "⭐ Top 10"
// top 11-50 → "✅ Clasificado"
// resto → "📋 Participante"
//
// Implementa 'obtenerInsignia(posicion)' SIN if/else, solo con ternarios.
//
const obtenerInsignia = (posicion) => 
  /* Tu cadena de ternarios aquí */;

[1, 2, 5, 25, 100].forEach(p => console.log(\`Posición \${p}: \${obtenerInsignia(p)}\`));

// ─── RETO 3: Short-Circuit para defaults seguros ─────────────────────────
// Sin usar if, usa || y ?? para proporcionar valores por defecto:
// Si el objeto heroe no tiene una propiedad, usa el default indicado.
//
function perfilCompleto(heroe) {
  const nombre = /* Tu código: heroe.nombre con fallback "Héroe Desconocido" */;
  const nivel  = /* Tu código: heroe.nivel con fallback 1 (usa ?? para que 0 sea válido) */;
  const gremio = /* Tu código: heroe.gremio con fallback "Sin Gremio" */;
  const misiones = /* Tu código: heroe.progreso?.misiones ?? 0 */;
  const titulo = /* Tu código: nivel >= 10 && "Veterano" || nivel >= 5 && "Aprendiz" || "Novato" */;
  
  return \`[\${titulo}] \${nombre} | Gremio: \${gremio} | Lv.\${nivel} | Misiones: \${misiones}\`;
}

console.log(perfilCompleto({ nombre: "Aragorn", nivel: 15, gremio: "Norteños", progreso: { misiones: 42 } }));
console.log(perfilCompleto({ nombre: "", nivel: 0 }));       // nombre vacío → "Héroe Desconocido"? 
// OJO: "" es falsy para ||, pero ?? solo actúa con null/undefined.
// El nombre "" con || daría "Héroe Desconocido". ¿Es correcto para tu lógica? Comenta tu decisión.
console.log(perfilCompleto({}));

// ─── RETO 4: El Sistema de Alertas por Niveles ────────────────────────────
// Crea 'evaluarSistema(metricas)' donde metricas es:
// { cpu, memoria, errores, uptime }
// Niveles de alerta:
//   cpu > 90 O memoria > 90 → "🔴 CRÍTICO: Recursos al límite"
//   errores > 50 → "🔴 CRÍTICO: Demasiados errores"
//   cpu > 70 O memoria > 70 → "🟡 ADVERTENCIA: Recursos elevados"
//   errores > 10 → "🟡 ADVERTENCIA: Errores detectados"
//   uptime < 99.9 → "🟡 ADVERTENCIA: Uptime bajo"
//   todo bien → "🟢 SISTEMA ESTABLE"
// Devuelve el nivel más grave (si hay múltiples alertas, devuelve solo CRÍTICO si hay uno).
//
function evaluarSistema(metricas) {
  // Tu código aquí — usa if/else con && y || combinados
}

console.log(evaluarSistema({ cpu: 95, memoria: 60, errores: 5, uptime: 99.9 }));
console.log(evaluarSistema({ cpu: 50, memoria: 50, errores: 100, uptime: 100 }));
console.log(evaluarSistema({ cpu: 75, memoria: 65, errores: 5, uptime: 99.5 }));
console.log(evaluarSistema({ cpu: 50, memoria: 50, errores: 5, uptime: 100 }));`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa el uso de switch, ternarios y short-circuit. REGLAS:
1. RETO 1: DEBE usar switch con fall-through (sin break entre cases del mismo grupo). REPROBAR si usa if/else en vez de switch o si pone break en cada case sin fall-through.
2. RETO 2: obtenerInsignia DEBE implementarse con SOLO ternarios, sin if/else. REPROBAR si usa if/else para algún nivel.
3. RETO 3: perfilCompleto DEBE usar ?? para 'nivel' (para que nivel=0 sea válido). DEBE usar ?. para optional chaining en progreso. REPROBAR si usa || para nivel (ya que 0 con || daría 1 en vez de 0).
4. RETO 3: El comentario sobre nombre="" es importante — el estudiante debe demostrar que entiende la diferencia entre || y ??.
5. RETO 4: evaluarSistema DEBE manejar TODOS los casos con la prioridad correcta. REPROBAR si no devuelve "CRÍTICO" cuando hay múltiples alertas y una es crítica.`
    },

    {
      slug: 'M04-E03-logica-avanzada',
      title: '🧩 El Árbol de Decisiones',
      description: 'Construye sistemas de decisión complejos: reglas de negocio encadenadas, memoización de resultados de decisiones, y el patrón de early return.',
      sort_order: 3,
      type: 'js',
      html_template: `// ╔══════════════════════════════════════════════════════════════╗
// ║   🎮 MISIÓN: El Árbol de Decisiones Complejas               ║
// ╠══════════════════════════════════════════════════════════════╣
//  Conceptos: Early return, guard clauses, decisiones complejas
// ╚══════════════════════════════════════════════════════════════╝

// ─── RETO 1: Guard Clauses (Early Return) ────────────────────────────────
// El patrón "guard clause" valida condiciones al inicio y retorna early,
// evitando el "pyramid of doom" (if anidados profundos).
//
// VERSIÓN MALA (evitar):
// function procesar(x) {
//   if (x !== null) {
//     if (x > 0) {
//       if (x < 100) {
//         return x * 2;
//       } else { return "muy grande"; }
//     } else { return "negativo"; }
//   } else { return "null"; }
// }
//
// VERSIÓN BUENA (guard clauses):
// function procesar(x) {
//   if (x === null) return "null";
//   if (x < 0) return "negativo";
//   if (x >= 100) return "muy grande";
//   return x * 2;
// }
//
// Refactoriza esta función USANDO guard clauses (mínimo 4 returns tempranos):
function procesarSolicitudMision(solicitud) {
  // VALIDACIONES (guard clauses):
  // 1. Si solicitud es null/undefined → "Error: solicitud inválida"
  // 2. Si solicitud.heroe no existe → "Error: héroe requerido"
  // 3. Si solicitud.heroe.nivel < solicitud.nivelMinimo → "Nivel insuficiente: requiere nivel X, tienes Y"
  // 4. Si solicitud.plazas <= 0 → "Sin plazas disponibles"
  // 5. Si pasa todo: "✅ Solicitud aceptada para [nombre de misión]"
  //    usa solicitud.mision?.nombre ?? "Sin nombre"
  
  // Tu código aquí con guard clauses
}

console.log(procesarSolicitudMision(null));
console.log(procesarSolicitudMision({ nivelMinimo: 5, plazas: 3, mision: { nombre: "Guardar el reino" } }));
console.log(procesarSolicitudMision({ heroe: { nombre: "Frodo", nivel: 3 }, nivelMinimo: 10, plazas: 2, mision: null }));
console.log(procesarSolicitudMision({ heroe: { nombre: "Aragorn", nivel: 15 }, nivelMinimo: 10, plazas: 0, mision: { nombre: "Derrotar a Sauron" } }));
console.log(procesarSolicitudMision({ heroe: { nombre: "Gandalf", nivel: 99 }, nivelMinimo: 5, plazas: 1, mision: { nombre: "El Anillo" } }));

// ─── RETO 2: Motor de Reglas de Negocio ─────────────────────────────────
// El Gremio tiene un motor de reglas donde cada regla es: { condicion, mensaje, prioridad }
// Crea 'evaluarReglas(datos, reglas)' que:
// 1. Evalúa TODAS las reglas (condicion es una función que recibe datos)
// 2. Filtra solo las que su condicion(datos) devuelva true
// 3. Las ordena por prioridad (menor número = mayor prioridad)
// 4. Devuelve array de mensajes en ese orden (o ["✅ Sin alertas"] si ninguna aplica)
//
function evaluarReglas(datos, reglas) {
  // Tu código aquí
}

const datosServidor = { cpu: 85, memoria: 92, errores: 55, uptime: 99.5 };
const reglasServidor = [
  { prioridad: 1, mensaje: "🔴 MEMORIA CRÍTICA", condicion: (d) => d.memoria > 90 },
  { prioridad: 1, mensaje: "🔴 ERRORES CRÍTICOS", condicion: (d) => d.errores > 50 },
  { prioridad: 2, mensaje: "🟡 CPU ELEVADO", condicion: (d) => d.cpu > 80 },
  { prioridad: 3, mensaje: "ℹ️ UPTIME MEJORABLE", condicion: (d) => d.uptime < 99.9 },
];
console.log(evaluarReglas(datosServidor, reglasServidor));
console.log(evaluarReglas({ cpu: 30, memoria: 40, errores: 2, uptime: 100 }, reglasServidor));

// ─── RETO 3: Máquina de Estados Finitos ─────────────────────────────────
// Una misión puede estar en estados: "pendiente" → "en_curso" → "completada" / "fallida"
// Las transiciones válidas son:
//   "pendiente" → "en_curso" (al iniciar)
//   "en_curso" → "completada" (al terminar con éxito)
//   "en_curso" → "fallida" (al terminar con fracaso)
// Cualquier otra transición es inválida.
//
// Crea 'transicionarMision(estadoActual, nuevoEstado)' que:
// - Use switch sobre estadoActual
// - Dentro de cada case, verifique si nuevoEstado es válido con if  
// - Devuelva: { exito: boolean, estado: nuevoEstado o estadoActual, mensaje: string }
//
function transicionarMision(estadoActual, nuevoEstado) {
  // Tu código con switch + if/else
}

console.log(transicionarMision("pendiente", "en_curso"));     // ✅
console.log(transicionarMision("pendiente", "completada"));   // ❌ transición inválida
console.log(transicionarMision("en_curso", "completada"));    // ✅
console.log(transicionarMision("en_curso", "fallida"));       // ✅
console.log(transicionarMision("completada", "en_curso"));    // ❌ ya terminó`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa lógica de decisión avanzada. REGLAS:
1. RETO 1: DEBE usar guard clauses (múltiples return tempranos) con al menos 4 validaciones diferentes. REPROBAR si usa if/else anidados en lugar de guard clauses (el código debe ser "plano" sin indentaciones profundas).
2. RETO 2: evaluarReglas DEBE filtrar reglas cuya condicion(datos) sea true, ordenarlas por prioridad, y devolver ["✅ Sin alertas"] cuando no hay ninguna. REPROBAR si no ordena o si no devuelve el mensaje de "sin alertas".
3. RETO 3: transicionarMision DEBE usar switch para el estado actual. Dentro de cada case debe verificar el nuevo estado. REPROBAR si usa if/else para estadoActual en vez de switch.`
    },
  ],

  // ──────────────────────────────────────────────────────────
  'M05-FOR': [
    {
      slug: 'M05-E01-for-loops',
      title: '🔄 La Forja del Artesano',
      description: 'Domina el bucle for clásico, for...of, for...in, break y continue construyendo herramientas reales de procesamiento de datos para el Gremio.',
      sort_order: 1,
      type: 'js',
      html_template: `// ╔══════════════════════════════════════════════════════════════╗
// ║   📖 TEORÍA: Bucles en JavaScript                           ║
// ╠══════════════════════════════════════════════════════════════╣
//
//  FOR CLÁSICO:
//  for (let i = 0; i < 10; i++) { ... }
//  for (let i = 10; i >= 0; i--) { ... }  // inverso
//
//  FOR...OF (para iterables: arrays, strings, Sets, Maps):
//  for (const item of array) { ... }
//  for (const char of "texto") { ... }
//
//  FOR...IN (para claves de objetos):
//  for (const clave in objeto) { ... }
//  // OJO: no garantiza orden, para arrays usa for...of
//
//  WHILE:
//  while (condición) { ... }  // Verifica ANTES de ejecutar
//
//  DO...WHILE:
//  do { ... } while (condición);  // Ejecuta al menos UNA VEZ
//
//  CONTROL DE FLUJO:
//  break    → Sale del bucle inmediatamente
//  continue → Salta a la siguiente iteración
//
// ╚══════════════════════════════════════════════════════════════╝

// ─── RETO 1: Generador de Tablas de Multiplicar del Artesano ─────────────
// Crea 'tablaMultiplicar(numero, hasta)' que:
// 1. Imprima la tabla del número del 1 al 'hasta' (por defecto 10)
//    Formato: "7 x 1 = 7", "7 x 2 = 14", ...
// 2. Devuelva un array con los resultados (no los strings, los números)
// 3. Usa un for clásico
//
function tablaMultiplicar(numero, hasta = 10) {
  const resultados = [];
  // Tu código aquí
  return resultados;
}

tablaMultiplicar(7);
const tabla9 = tablaMultiplicar(9, 5);
console.log("Tabla del 9 hasta el 5:", tabla9);

// ─── RETO 2: Búsqueda con break y continue ────────────────────────────────
// Array de misiones con diferentes estados:
const misiones = [
  { id: 1, nombre: "Explorar Caverna", dificultad: 3, completada: false, rechazada: false },
  { id: 2, nombre: "Proteger Aldea", dificultad: 7, completada: true, rechazada: false },
  { id: 3, nombre: "Recuperar Artefacto", dificultad: 9, completada: false, rechazada: true },
  { id: 4, nombre: "Escoltar Comerciante", dificultad: 2, completada: false, rechazada: false },
  { id: 5, nombre: "Derrotar Dragón", dificultad: 10, completada: false, rechazada: false },
  { id: 6, nombre: "Descifrar Grimorio", dificultad: 6, completada: false, rechazada: false },
];

// 2a: Usando for...of + continue, construye un array de misiones ACTIVAS
// (ni completadas ni rechazadas)
function getMisionesActivas(misiones) {
  const activas = [];
  for (const mision of misiones) {
    // Usa continue para saltar las completadas y rechazadas
    // Agrega las activas al array
  }
  return activas;
}
console.log("Activas:", getMisionesActivas(misiones).map(m => m.nombre));

// 2b: Usando for clásico + break, encuentra la PRIMERA misión con dificultad >= 9
// (y detén la búsqueda cuando la encuentres)
function primeraMisionDificil(misiones, dificultadMin = 9) {
  // Tu código aquí
}
console.log("Primera difícil:", primeraMisionDificil(misiones));

// ─── RETO 3: Procesador de Stats con for...of ─────────────────────────────
// Dado un array de héroes, calcula estadísticas sin usar métodos de array:
// (Prohíbido usar .filter, .map, .reduce — usa solo bucles)
//
const heroes = [
  { nombre: "Aragorn", nivel: 15, misiones: 42, activo: true },
  { nombre: "Legolas", nivel: 18, misiones: 38, activo: true },
  { nombre: "Gimli", nivel: 12, misiones: 29, activo: false },
  { nombre: "Gandalf", nivel: 50, misiones: 99, activo: true },
  { nombre: "Frodo", nivel: 5, misiones: 7, activo: true },
  { nombre: "Sam", nivel: 4, misiones: 6, activo: true },
];

function calcularStats(heroes) {
  let niveles = 0;
  let maxNivel = 0;
  let heroMaxNivel = "";
  let totalMisiones = 0;
  let heroesActivos = 0;
  
  for (const heroe of heroes) {
    // Tu código aquí — calcula todo en UN SOLO BUCLE sin usar métodos de array
  }
  
  return {
    promedio: (niveles / heroes.length).toFixed(1),
    maxNivel,
    heroMaxNivel,
    totalMisiones,
    heroesActivos
  };
}

console.log(calcularStats(heroes));

// ─── RETO 4: for...in — Inspector de Configuración ───────────────────────
// Usando for...in, itera sobre el objeto de configuración del servidor.
// Para cada clave:
//   - Si el valor es un boolean → muestra "✅ [clave]: Activado" o "❌ [clave]: Desactivado"
//   - Si el valor es un number → muestra "🔢 [clave]: [valor]"
//   - Si el valor es un string → muestra "📝 [clave]: '[valor]'"
//
const configServidor = {
  debug: true,
  maxConexiones: 100,
  entorno: "producción",
  cacheActivo: true,
  timeout: 30,
  logLevel: "warn",
  mantenimiento: false,
};

function inspeccionar(config) {
  for (const clave in config) {
    // Tu código aquí usando typeof para determinar el tipo
  }
}

inspeccionar(configServidor);`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa el uso de bucles. REGLAS:
1. RETO 1: tablaMultiplicar DEBE usar for clásico. Debe imprimir en console.log Y devolver array. REPROBAR si usa forEach o métodos de array.
2. RETO 2a: getMisionesActivas DEBE usar for...of CON continue para saltar. REPROBAR si usa filter() o si no usa continue.
3. RETO 2b: primeraMisionDificil DEBE usar break al encontrar el primer resultado. REPROBAR si no usa break y sigue iterando.
4. RETO 3: calcularStats DEBE calcular todo en UN SOLO bucle for...of. REPROBAR si usa .filter, .map o .reduce.
5. RETO 4: inspeccionar DEBE usar for...in (no for...of o Object.keys). DEBE usar typeof para mostrar formato diferente por tipo. REPROBAR si hardcodea los tipos o no usa for...in.`
    },

    {
      slug: 'M05-E02-while-loops',
      title: '⏳ El Centinela Eterno',
      description: 'Domina while y do-while, aprende cuándo usar cada uno versus for, y construye simulaciones de proceso continuo y validadores de entrada.',
      sort_order: 2,
      type: 'js',
      html_template: `// ╔══════════════════════════════════════════════════════════════╗
// ║   🎮 MISIÓN: El Centinela Eterno — while y do...while       ║
// ╠══════════════════════════════════════════════════════════════╣
//  CUÁNDO USAR CADA BUCLE:
//  - for: cuando SABES cuántas veces iterar (i hasta N)
//  - for...of: cuando iteras sobre una colección
//  - while: cuando iteras MIENTRAS una condición sea true
//           (no sabes cuántas iteraciones habrá)
//  - do...while: como while pero garantiza AL MENOS una ejecución
// ╚══════════════════════════════════════════════════════════════╝

// ─── RETO 1: El Generador de Secuencia de Fibonacci ──────────────────────
// Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...
// Cada número es la suma de los dos anteriores.
// Crea 'fibonacci(limite)' que devuelva un array con todos los números
// de Fibonacci MENORES O IGUALES al límite usando while.
//
function fibonacci(limite) {
  // Tu código aquí con while
  // Pista: necesitas rastrear los dos últimos números
}

console.log(fibonacci(100));  // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89]
console.log(fibonacci(10));   // [0, 1, 1, 2, 3, 5, 8]

// ─── RETO 2: Simulador de Proceso por Lotes ───────────────────────────────
// El Gremio procesa solicitudes en lotes de máximo 3 a la vez.
// Usa while para procesar TODAS las solicitudes de la cola.
//
const cola = [
  { id: 1, tipo: "reclutamiento", prioridad: "alta" },
  { id: 2, tipo: "mision", prioridad: "normal" },
  { id: 3, tipo: "recompensa", prioridad: "alta" },
  { id: 4, tipo: "mision", prioridad: "normal" },
  { id: 5, tipo: "reclutamiento", prioridad: "baja" },
  { id: 6, tipo: "recompensa", prioridad: "alta" },
  { id: 7, tipo: "mision", prioridad: "normal" },
];

function procesarCola(cola, tamañoLote = 3) {
  const colaLocal = [...cola]; // copia para no modificar el original
  let loteNum = 1;
  const historial = [];
  
  while (colaLocal.length > 0) {
    const lote = [];
    // Extrae hasta tamañoLote elementos del FRENTE de la cola
    let i = 0;
    while (/* Tu condición: i < tamañoLote y todavía hay cosas en colaLocal */) {
      lote.push(colaLocal.shift()); // shift() saca el primer elemento
      i++;
    }
    
    console.log(\`Lote \${loteNum} (\${lote.length} solicitudes):\`, lote.map(s => \`#\${s.id}\`).join(", "));
    historial.push({ lote: loteNum, procesados: lote.length });
    loteNum++;
  }
  
  console.log("✅ Cola procesada. Total de lotes:", loteNum - 1);
  return historial;
}

procesarCola(cola);

// ─── RETO 3: do...while — La Rueda de Entrenamiento ─────────────────────
// En el entrenamiento, un héroe lanza un dado y suma puntos HASTA que:
//   - Acumule 20+ puntos, O
//   - Lance el dado 10 veces
// Al final muestra cuántas rondas y cuántos puntos.
//
// IMPORTANTE: do...while garantiza al menos 1 lanzamiento.
// Simula el dado con: Math.floor(Math.random() * 6) + 1  (1-6)
//
function sesionEntrenamiento(nombre) {
  let puntos = 0;
  let rondas = 0;
  
  do {
    const dado = Math.floor(Math.random() * 6) + 1;
    puntos += dado;
    rondas++;
    console.log(\`  Ronda \${rondas}: 🎲 \${dado} → Total: \${puntos}\`);
  } while (/* Tu condición de continuación */);
  
  console.log(\`\${nombre} finalizó: \${rondas} rondas, \${puntos} puntos. \${puntos >= 20 ? "🏆 ¡Superó los 20!" : "❌ Llegó al límite de rondas."}\`);
  return { nombre, rondas, puntos };
}

sesionEntrenamiento("Frodo");

// ─── RETO 4: Búsqueda Binaria ────────────────────────────────────────────
// La búsqueda binaria es un algoritmo eficiente para arrays ORDENADOS.
// Funciona dividiendo el array a la mitad en cada paso.
// Implementa 'busquedaBinaria(array, objetivo)' usando while:
//
// Algoritmo:
//   izquierda = 0, derecha = array.length - 1
//   mientras izquierda <= derecha:
//     medio = Math.floor((izquierda + derecha) / 2)
//     si array[medio] === objetivo → devuelve { indice: medio, pasos }
//     si array[medio] < objetivo → izquierda = medio + 1
//     si array[medio] > objetivo → derecha = medio - 1
//   Si no encontró → devuelve { indice: -1, pasos }
//
function busquedaBinaria(array, objetivo) {
  let pasos = 0;
  // Tu código aquí
}

const nivelesOrdenados = [1, 3, 5, 7, 10, 12, 15, 18, 20, 25, 30, 42, 50, 75, 99];
console.log("Buscando 42:", busquedaBinaria(nivelesOrdenados, 42));
console.log("Buscando 5:", busquedaBinaria(nivelesOrdenados, 5));
console.log("Buscando 100:", busquedaBinaria(nivelesOrdenados, 100)); // no existe`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa el uso de while y do-while. REGLAS:
1. RETO 1: fibonacci DEBE usar while. El resultado debe ser correcto (0,1,1,2,3,5,8,13,21,34,55,89 para límite 100). REPROBAR si usa for.
2. RETO 2: procesarCola DEBE usar while externo basado en colaLocal.length > 0. DEBE usar while interno para extraer el lote. REPRODUCIR si usa for o slice para el lote.
3. RETO 3: sesionEntrenamiento DEBE usar do...while. La condición DEBE verificar AMBAS condiciones de salida (puntos < 20 Y rondas < 10). REPROBAR si usa while normal o si solo verifica una condición.
4. RETO 4: busquedaBinaria DEBE implementar el algoritmo correcto con while y actualizar izquierda/derecha correctamente. REPROBAR si hace búsqueda lineal o si el algoritmo es incorrecto.`
    },

    {
      slug: 'M05-E03-bucles-avanzados',
      title: '🌀 Los Laberintos del Código',
      description: 'Bucles anidados, matrices (arrays de arrays), patrones con for, y algoritmos clásicos de ordenamiento.',
      sort_order: 3,
      type: 'js',
      html_template: `// ╔══════════════════════════════════════════════════════════════╗
// ║   🎮 MISIÓN: Los Laberintos — Bucles Anidados              ║
// ╚══════════════════════════════════════════════════════════════╝

// ─── RETO 1: El Mapa del Laberinto (Matrices / Array 2D) ─────────────────
// Una matriz es un array de arrays. Se accede con: matriz[fila][columna]
//
// Crea 'crearMapa(filas, columnas, valorDefault)' que devuelva una matriz
// de filas x columnas rellena con valorDefault usando bucles anidados.
// Luego crea 'imprimirMapa(mapa)' que muestre la matriz visualmente.
//
function crearMapa(filas, columnas, valorDefault = "⬛") {
  const mapa = [];
  for (let i = 0; i < filas; i++) {
    const fila = [];
    for (let j = 0; j < columnas; j++) {
      fila.push(valorDefault);
    }
    mapa.push(fila);
  }
  return mapa;
}

function imprimirMapa(mapa) {
  for (const fila of mapa) {
    console.log(fila.join(""));
  }
}

const mapa = crearMapa(5, 8);
mapa[0][0] = "🧙"; // Posición del héroe
mapa[4][7] = "🏆"; // Tesoro
mapa[2][3] = "🧱"; // Pared
mapa[2][4] = "🧱";
mapa[3][3] = "🧱";
imprimirMapa(mapa);

// ─── RETO 2: Tablas de Multiplicar — Patrón de Bucles Anidados ───────────
// Genera y muestra la tabla de multiplicar completa del 1 al N.
// Formato de cada celda: " 12" (alineado a la derecha con padStart)
// Ejemplo para N=5:
//     1   2   3   4   5
//     2   4   6   8  10
//     3   6   9  12  15
//     4   8  12  16  20
//     5  10  15  20  25
//
function tablaCompleta(n) {
  for (let i = 1; i <= n; i++) {
    let fila = "";
    for (let j = 1; j <= n; j++) {
      fila += String(i * j).padStart(4); // 4 caracteres de ancho
    }
    console.log(fila);
  }
}

console.log("\\n=== Tabla de multiplicar 1-8 ===");
tablaCompleta(8);

// ─── RETO 3: Bubble Sort — Algoritmo de Ordenamiento ─────────────────────
// Bubble sort compara pares adyacentes y los intercambia si están en el orden incorrecto.
// Repite hasta que no haya más intercambios.
//
// Implementa 'bubbleSort(array)' que:
// 1. NO modifique el array original (crea una copia)
// 2. Use bucles anidados para el algoritmo
// 3. Cuente el número de intercambios realizados
// 4. Devuelva: { ordenado: [], intercambios: número }
//
function bubbleSort(array) {
  const arr = [...array]; // copia
  let intercambios = 0;
  
  // Tu código aquí — bucle externo (pasadas) + bucle interno (comparaciones)
  // Cuando arr[j] > arr[j+1], intercambia usando desestructuración: [arr[j], arr[j+1]] = [arr[j+1], arr[j]]
  
  return { ordenado: arr, intercambios };
}

const niveles = [15, 3, 8, 1, 42, 7, 23, 5, 99, 12];
const resultado = bubbleSort(niveles);
console.log("Original:", niveles);
console.log("Ordenado:", resultado.ordenado);
console.log("Intercambios:", resultado.intercambios);

// ─── RETO 4: Búsqueda en Matriz ──────────────────────────────────────────
// Busca un valor en una matriz 2D y devuelve su posición [fila, columna].
// Si no existe, devuelve null.
// Devuelve TODAS las ocurrencias (puede aparecer múltiples veces).
//
function buscarEnMatriz(matriz, valor) {
  const posiciones = [];
  // Tu código con bucles anidados
  return posiciones.length > 0 ? posiciones : null;
}

const mapaNumeros = [
  [5, 3, 8, 1],
  [2, 9, 3, 7],
  [4, 3, 6, 2],
  [8, 1, 5, 3],
];
console.log(buscarEnMatriz(mapaNumeros, 3)); // [[0,1], [1,2], [2,1], [3,3]]
console.log(buscarEnMatriz(mapaNumeros, 99)); // null`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa el uso de bucles anidados y matrices. REGLAS:
1. RETO 1: crearMapa DEBE usar bucles for anidados para crear la matriz 2D. REPROBAR si usa Array.from() o métodos funcionales.
2. RETO 2: tablaCompleta DEBE usar bucles anidados. Debe usar padStart para alineación. REPROBAR si no hay alineación numérica.
3. RETO 3: bubbleSort DEBE implementar el algoritmo Bubble Sort con bucles anidados. Debe contar intercambios. REPROBAR si usa Array.prototype.sort(). El resultado debe ser correcto.
4. RETO 4: buscarEnMatriz DEBE usar bucles anidados y devolver TODAS las posiciones [fila, columna]. REPROBAR si devuelve solo la primera o si no devuelve null cuando no se encuentra.`
    },
  ],

  // ──────────────────────────────────────────────────────────
  'M06-FN': [
    {
      slug: 'M06-E01-funciones-base',
      title: '🛠️ La Librería de Utilidades',
      description: 'Domina declaraciones de función, expresiones de función, parámetros por defecto, rest parameters, hoisting y el concepto de scope (ámbito de variables).',
      sort_order: 1,
      type: 'js',
      html_template: `// ╔══════════════════════════════════════════════════════════════╗
// ║   📖 TEORÍA: Funciones en JavaScript                        ║
// ╠══════════════════════════════════════════════════════════════╣
//
//  DECLARACIÓN (function declaration):
//  function saludar(nombre) { return "Hola " + nombre; }
//  → Sujeta a HOISTING: puedes llamarla ANTES de declararla.
//
//  EXPRESIÓN (function expression):
//  const saludar = function(nombre) { return "Hola " + nombre; };
//  → NO tiene hoisting. Se asigna cuando se ejecuta esa línea.
//
//  ARROW FUNCTION (función flecha):
//  const saludar = (nombre) => "Hola " + nombre;  // return implícito
//  const doble = n => n * 2;                        // un parámetro: sin paréntesis
//  const suma  = (a, b) => { const r = a + b; return r; }  // con cuerpo
//  → NO tiene su propio 'this' (importante para POO)
//
//  PARÁMETROS POR DEFECTO:
//  function saludar(nombre = "Aventurero") { ... }
//
//  REST PARAMETERS (...args):
//  function sumar(...numeros) { return numeros.reduce((a,b) => a+b, 0); }
//  sumar(1, 2, 3, 4, 5) → 15
//
//  SCOPE (ámbito):
//  const x = 1;             // ← ámbito global
//  function f() {
//    const y = 2;            // ← ámbito local a f()
//    console.log(x);         // ✅ puede acceder al global
//    console.log(y);         // ✅ accede al local
//  }
//  console.log(y);           // ❌ ReferenceError: y not defined
//
//  HOISTING:
//  saludar();                // ✅ funciona (hoisting de declaration)
//  function saludar() { console.log("hola"); }
//
//  calcular();               // ❌ error (expresiones NO tienen hoisting)
//  const calcular = () => { ... };
//
// ╚══════════════════════════════════════════════════════════════╝

// ─── RETO 1: Una función de cada tipo ────────────────────────────────────
// Implementa la misma lógica de 3 formas diferentes:
// La función recibe un nombre y un nivel, y devuelve:
// "Bienvenido al Gremio, [NOMBRE EN MAYÚSCULAS]! — Nivel [nivel] — Rango: [rango]"
// Donde rango = nivel >= 50 ? "Leyenda" : nivel >= 20 ? "Maestro" : nivel >= 10 ? "Veterano" : "Aprendiz"

// Versión 1: function declaration
function bienvenidaDeclarada(nombre, nivel = 1) {
  // Tu código aquí
}

// Versión 2: function expression
const bienvenidaExpresion = function(nombre, nivel = 1) {
  // Tu código aquí
};

// Versión 3: arrow function
const bienvenidaArrow = (nombre, nivel = 1) => {
  // Tu código aquí
};

// Comprueba que las 3 devuelven lo mismo:
console.log(bienvenidaDeclarada("aragorn", 15));
console.log(bienvenidaExpresion("Legolas", 25));
console.log(bienvenidaArrow("gandalf", 99));
console.log(bienvenidaArrow("Sam")); // nivel por defecto = 1

// ─── RETO 2: Rest Parameters y parámetros por defecto ────────────────────
// Crea 'calcularStats(nombre, ...puntuaciones)' que:
// - nombre: string
// - ...puntuaciones: cualquier cantidad de números
// - Calcula: min, max, promedio, total
// - Devuelve un objeto y también imprime un resumen formateado
//
function calcularStats(nombre, ...puntuaciones) {
  if (puntuaciones.length === 0) return { nombre, error: "Sin puntuaciones" };
  
  // Tu código aquí — calcula min, max, promedio, total SIN métodos de array (usa bucles o spread con Math)
  // Pista para min/max: Math.min(...puntuaciones) y Math.max(...puntuaciones)
}

calcularStats("Aragorn", 85, 90, 72, 88, 95, 91);
calcularStats("Frodo", 60);
calcularStats("Sin datos");

// ─── RETO 3: Scope — El Laberinto de Variables ────────────────────────────
// Predice la salida de cada console.log. Luego verifica.
// Para cada uno, escribe un comentario con tu predicción ANTES de ejecutar.
//
const nivel = 99; // global

function crearHeroe() {
  const nivel = 5; // local a crearHeroe
  console.log("Dentro de crearHeroe:", nivel); // Predicción:
  
  function subirNivel() {
    // No declara 'nivel' → ¿cuál nivel ve?
    console.log("Dentro de subirNivel:", nivel); // Predicción:
  }
  
  subirNivel();
  return nivel;
}

const resultado = crearHeroe();
console.log("Fuera de crearHeroe:", nivel); // Predicción:
console.log("Resultado de crearHeroe:", resultado); // Predicción:

// ─── RETO 4: La Librería de Utilidades del Gremio ────────────────────────
// Crea un objeto 'Utils' que contenga al menos 5 funciones de utilidad:
//
const Utils = {
  // 1. capitalizar(str): "hola mundo" → "Hola Mundo"
  capitalizar: (str) => { /* Tu código */ },
  
  // 2. aplanar(array): [[1,2],[3,[4,5]]] → [1,2,3,4,5] usando recursión o flat()
  aplanar: (array) => { /* Tu código */ },
  
  // 3. esperar(ms): devuelve una Promise que resuelve después de ms milisegundos
  //    uso: await Utils.esperar(1000)  (no necesitas async/await aquí, solo devuelve la Promise)
  esperar: (ms) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // 4. limitarDecimales(num, decimales): limita decimales sin toFixed (que devuelve string)
  //    Pista: Math.round(num * 10**decimales) / 10**decimales
  limitarDecimales: (num, decimales = 2) => { /* Tu código */ },
  
  // 5. generarRango(inicio, fin, paso): genera array [inicio, inicio+paso, ..., fin]
  //    como range() de Python. Si fin < inicio y paso > 0, devuelve []
  generarRango: (inicio, fin, paso = 1) => { /* Tu código con while */ },
};

console.log(Utils.capitalizar("el señor de los anillos"));
console.log(Utils.aplanar([1, [2, 3], [4, [5, 6]]]));
console.log(Utils.limitarDecimales(3.14159, 3));
console.log(Utils.generarRango(1, 10));
console.log(Utils.generarRango(0, 20, 5));
console.log(Utils.generarRango(10, 1));  // []`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa el dominio de funciones en JavaScript. REGLAS:
1. RETO 1: Deben existir las 3 versiones (declaration, expression, arrow). Todas deben tener parámetro por defecto nivel=1. REPROBAR si falta alguna versión o si no hay ternarios para el rango.
2. RETO 2: calcularStats DEBE usar rest parameters (...puntuaciones). Debe calcular min, max, promedio, total. REPROBAR si no usa rest parameters o si no maneja el caso de 0 puntuaciones.
3. RETO 3: Debe haber comentarios con predicciones. Las predicciones deben ser correctas (5, 5, 99, 5). REPROBAR si no hay comentarios de predicción.
4. RETO 4: El objeto Utils DEBE tener las 5 funciones implementadas. capitalizar debe hacer Title Case. generarRango debe devolver [] cuando fin < inicio con paso positivo. REPROBAR si más de 2 funciones están vacías.`
    },

    {
      slug: 'M06-E02-arrow-hof',
      title: '🏹 Las Flechas del Arquero',
      description: 'Arrow functions, funciones de orden superior (callbacks, map, filter, reduce), y el patrón de composición de funciones.',
      sort_order: 2,
      type: 'js',
      html_template: `// ╔══════════════════════════════════════════════════════════════╗
// ║   🎮 MISIÓN: Funciones de Orden Superior                    ║
// ╠══════════════════════════════════════════════════════════════╣
//  Funciones de Orden Superior (Higher-Order Functions, HOF):
//  Son funciones que:
//  a) Reciben otra función como argumento (callback), O
//  b) Devuelven una función
//
//  Los métodos de array SON funciones de orden superior:
//  array.map(fn)      → Transforma cada elemento
//  array.filter(fn)   → Filtra por condición
//  array.reduce(fn)   → Reduce a un solo valor
//  array.forEach(fn)  → Ejecuta para cada elemento (no devuelve array)
//  array.sort(fn)     → Ordena con comparador personalizado
//  array.find(fn)     → Devuelve el primer elemento que cumple la condición
//  array.every(fn)    → true si TODOS cumplen la condición
//  array.some(fn)     → true si AL MENOS UNO cumple la condición
// ╚══════════════════════════════════════════════════════════════╝

const héroes = [
  { nombre: "Aragorn", nivel: 15, clase: "Guerrero", misiones: 42, activo: true, xp: 15000 },
  { nombre: "Legolas", nivel: 18, clase: "Arquero", misiones: 38, activo: true, xp: 18500 },
  { nombre: "Gimli", nivel: 12, clase: "Guerrero", misiones: 29, activo: false, xp: 10800 },
  { nombre: "Gandalf", nivel: 50, clase: "Mago", misiones: 99, activo: true, xp: 75000 },
  { nombre: "Frodo", nivel: 5, clase: "Hobbit", misiones: 7, activo: true, xp: 3200 },
  { nombre: "Sam", nivel: 4, clase: "Hobbit", misiones: 6, activo: true, xp: 2900 },
  { nombre: "Boromir", nivel: 10, clase: "Guerrero", misiones: 15, activo: false, xp: 8500 },
  { nombre: "Saruman", nivel: 45, clase: "Mago", misiones: 55, activo: false, xp: 60000 },
];

// ─── RETO 1: Consultas con filter y map ──────────────────────────────────
// Usa SOLO arrow functions + métodos de array:

// 1a: Array de nombres de héroes ACTIVOS con nivel >= 10
const heroesActivos = /* Tu código: filter + map */;
console.log("Activos nivel 10+:", heroesActivos);

// 1b: Array de strings formateados para todos los héroes tipo:
// "Aragorn (Guerrero) — Lv.15"
const fichas = /* Tu código: map */;
console.log("Fichas:", fichas);

// 1c: Héroes con más de 30 misiones, ordenados de mayor a menor nivel
// Pista para sort: (a, b) => b.nivel - a.nivel
const veteranos = /* Tu código: filter + sort */;
console.log("Veteranos:", veteranos.map(h => h.nombre + " Lv." + h.nivel));

// ─── RETO 2: reduce — El Tesoro Total ────────────────────────────────────
// Usando SOLO reduce (no filter ni map antes del reduce):

// 2a: XP total de todos los héroes
const xpTotal = /* Tu código */;
console.log("XP total:", xpTotal);

// 2b: XP promedio de héroes activos (filtra en el reduce con lógica condicional)
// Pista: el acumulador puede ser un objeto { suma: 0, cantidad: 0 }
const xpPromedioActivos = /* Tu código */;
console.log("XP promedio activos:", xpPromedioActivos.toFixed(0));

// 2c: Agrupa héroes por clase en un objeto: { Guerrero: [...], Mago: [...], ... }
const porClase = héroes.reduce((acc, heroe) => {
  // Tu código: si acc[heroe.clase] no existe, inicialízalo como []. Luego agrega el héroe.
}, {});
console.log("Por clase:", Object.keys(porClase).map(k => k + ": " + porClase[k].length));

// ─── RETO 3: Funciones de Orden Superior personalizadas ──────────────────
// Implementa tus propios map, filter y reduce desde cero (sin usar los nativos):
//
function miMap(array, transformacion) {
  // Tu código: devuelve nuevo array con cada elemento transformado
}

function miFiltro(array, condicion) {
  // Tu código: devuelve nuevo array con solo los que cumplan la condición
}

function miReduce(array, fn, valorInicial) {
  // Tu código: acumula con fn(acumulador, elemento) para cada elemento
}

// Verifica que funcionan igual que los nativos:
const nombresTransformados = miMap(héroes, h => h.nombre.toUpperCase());
console.log("miMap nombres:", nombresTransformados);

const soloActivos = miFiltro(héroes, h => h.activo);
console.log("miFiltro activos:", soloActivos.length);

const totalMisiones = miReduce(héroes, (acc, h) => acc + h.misiones, 0);
console.log("miReduce misiones:", totalMisiones);

// ─── RETO 4: Composición de Funciones ────────────────────────────────────
// La composición de funciones combina funciones simples en cadenas.
// compose(f, g)(x) === f(g(x))  ← se aplica de derecha a izquierda
// pipe(f, g)(x) === g(f(x))     ← se aplica de izquierda a derecha
//
// Implementa:
const compose = (...fns) => (x) => /* Tu código: reduce de derecha a izquierda */;
const pipe    = (...fns) => (x) => /* Tu código: reduce de izquierda a derecha */;

// Usa composición para crear un pipeline de transformación de datos:
const trim        = str => str.trim();
const toLower     = str => str.toLowerCase();
const capitalize  = str => str[0].toUpperCase() + str.slice(1);
const addPrefix   = str => "Héroe: " + str;

const normalizar   = pipe(trim, toLower, capitalize);
const formatearHero = pipe(trim, toLower, capitalize, addPrefix);

console.log(normalizar("  ARAGORN  "));     // "Aragorn"
console.log(formatearHero("  LEGOLAS  "));  // "Héroe: Legolas"`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa las funciones de orden superior. REGLAS:
1. RETO 1: DEBE usar arrow functions y métodos nativos. heroesActivos DEBE usar filter Y map encadenados. veteranos DEBE usar sort con comparador (b.nivel - a.nivel). REPROBAR si usa bucles for en lugar de métodos.
2. RETO 2: xpTotal DEBE usar reduce. xpPromedioActivos DEBE calcular solo de activos dentro del reduce (no filtrar antes). porClase DEBE inicializar el array si la clave no existe. REPROBAR si usa filter antes del reduce de promedio.
3. RETO 3: miMap, miFiltro y miReduce DEBEN implementarse desde cero con bucles for. REPROBAR si usan los métodos nativos internamente.
4. RETO 4: compose Y pipe DEBEN implementarse con reduce. REPROBAR si solo implementa una o si no usa reduce internamente. Los pipelines deben funcionar correctamente.`
    },

    {
      slug: 'M06-E03-closures',
      title: '🔐 El Cofre Mágico — Closures',
      description: 'Comprende y aplica closures: funciones que "recuerdan" su ámbito. Construye contadores, fábricas de funciones, memoización y funciones recursivas.',
      sort_order: 3,
      type: 'js',
      html_template: `// ╔══════════════════════════════════════════════════════════════╗
// ║   📖 TEORÍA: Closures y Recursión                           ║
// ╠══════════════════════════════════════════════════════════════╣
//
//  CLOSURE: Una función que "cierra sobre" (recuerda) las variables
//  de su ámbito exterior, incluso después de que ese ámbito haya terminado.
//
//  Ejemplo:
//  function crearContador() {
//    let cuenta = 0;          // ← variable del ámbito exterior
//    return function() {      // ← closure: recuerda 'cuenta'
//      cuenta++;
//      return cuenta;
//    };
//  }
//  const contar = crearContador();
//  contar() → 1, contar() → 2, contar() → 3 (cuenta persiste!)
//
//  FÁBRICA DE FUNCIONES:
//  function multiplicarPor(factor) {
//    return (numero) => numero * factor;  // ← closure sobre 'factor'
//  }
//  const doble = multiplicarPor(2);
//  const triple = multiplicarPor(3);
//  doble(5) → 10, triple(5) → 15
//
//  RECURSIÓN: Una función que se llama a sí misma.
//  function factorial(n) {
//    if (n <= 1) return 1;     // ← CASO BASE (sin esto → bucle infinito)
//    return n * factorial(n-1); // ← llamada recursiva
//  }
//  factorial(5) → 120
//
// ╚══════════════════════════════════════════════════════════════╝

// ─── RETO 1: Fábricas de Funciones ───────────────────────────────────────
// Crea fábricas que devuelvan funciones especializadas:

// 1a: crearMultiplicador(factor) → devuelve función que multiplica por factor
function crearMultiplicador(factor) {
  // Tu código
}
const doble = crearMultiplicador(2);
const triple = crearMultiplicador(3);
const decuplicar = crearMultiplicador(10);
console.log(doble(5), triple(5), decuplicar(5));

// 1b: crearSaludador(idioma) → devuelve función que saluda en ese idioma
// Soporta: "es" → "¡Hola, [nombre]!", "en" → "Hello, [nombre]!", "fr" → "Bonjour, [nombre]!"
// Para idiomas desconocidos: "Greetings, [nombre]!"
function crearSaludador(idioma) {
  // Tu código — closure sobre 'idioma'
}
const saludarES = crearSaludador("es");
const saludarEN = crearSaludador("en");
console.log(saludarES("Aragorn"));
console.log(saludarEN("Legolas"));

// 1c: crearValidador(min, max) → devuelve función que valida si un número está en rango
function crearValidador(min, max) {
  // Tu código — closure sobre min y max
  // Devuelve función que recibe un número y devuelve { valido: boolean, mensaje: string }
}
const validarNivel = crearValidador(1, 100);
const validarXP    = crearValidador(0, 999999);
console.log(validarNivel(50));
console.log(validarNivel(150));
console.log(validarXP(-5));

// ─── RETO 2: Contador con estado privado ─────────────────────────────────
// Crea 'crearContadorGremio(nombre, inicial)' que devuelva un objeto con métodos.
// La variable 'contador' es privada (no accesible desde afuera directamente).
//
function crearContadorGremio(nombre, inicial = 0) {
  let contador = inicial; // PRIVADA gracias al closure
  
  return {
    incrementar: (n = 1) => { /* Tu código */ },
    decrementar: (n = 1) => { /* Tu código — no bajar de 0 */ },
    reset: () => { /* Tu código */ },
    obtener: () => contador,
    estado: () => \`[\${nombre}]: \${contador} miembros\`,
  };
}

const gremio = crearContadorGremio("Norte", 10);
gremio.incrementar(5);
gremio.incrementar(3);
gremio.decrementar(2);
console.log(gremio.estado());      // [Norte]: 16 miembros
gremio.reset();
console.log(gremio.obtener());     // 10 (vuelve al inicial, no a 0)
// OJO: el reset debe volver al valor 'inicial', no a 0.

// ─── RETO 3: Memoización ─────────────────────────────────────────────────
// La memoización guarda (cachea) resultados para evitar recalcularlos.
// Crea 'memoize(fn)' que recibe cualquier función y devuelve una versión memoizada.
//
function memoize(fn) {
  const cache = {}; // ← closure: el cache persiste entre llamadas
  
  return function(...args) {
    const clave = JSON.stringify(args);  // clave única por argumentos
    if (/* el resultado ya está en cache */) {
      console.log("  📦 Cache hit para:", clave);
      return cache[clave];
    }
    console.log("  🔄 Calculando para:", clave);
    const resultado = fn(...args);
    // Tu código: guarda en cache
    return resultado;
  };
}

// Función costosa de ejemplo: Fibonacci (sin memoizar es exponencial)
function fibLento(n) {
  if (n <= 1) return n;
  return fibLento(n - 1) + fibLento(n - 2);
}

const fibRapido = memoize(fibLento);
console.log("fib(10):", fibRapido(10));
console.log("fib(10):", fibRapido(10)); // ← debe usar cache
console.log("fib(20):", fibRapido(20));

// ─── RETO 4: Recursión ───────────────────────────────────────────────────
// Implementa estas funciones usando recursión (sin bucles):

// 4a: sumarArray(array) — suma todos los elementos de un array
function sumarArray(array) {
  // Caso base: array vacío → 0
  // Caso recursivo: primer elemento + sumarArray(resto)
  // Pista: puedes usar array[0] y array.slice(1)
}
console.log(sumarArray([1, 2, 3, 4, 5])); // 15

// 4b: aplanar(array) — aplana un array anidado a cualquier profundidad
function aplanar(array) {
  // Caso base: si no es array → devuelve [elemento]
  // Caso recursivo: para cada elemento, si es array → aplanar recursivamente
  // Pista: usa reduce + concat
}
console.log(aplanar([1, [2, [3, [4]], 5]])); // [1, 2, 3, 4, 5]

// 4c: contarPalabras(texto) — cuenta palabras sin usar split ni métodos de string que no sean charAt/length
// (Cuenta espacios + 1, ignorando espacios múltiples)
function contarPalabras(texto, i = 0, enPalabra = false, count = 0) {
  // Tu implementación recursiva
}
console.log(contarPalabras("El Gremio del Código es épico")); // 6`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa closures y recursión. REGLAS:
1. RETO 1: crearMultiplicador, crearSaludador y crearValidador DEBEN devolver funciones (fábricas). REPROBAR si no usan closures (si los valores no están en el ámbito exterior de la función devuelta).
2. RETO 2: La variable 'contador' DEBE ser privada. El reset DEBE volver al valor 'inicial' no a 0. REPROBAR si contador es accesible directamente o si reset vuelve a 0.
3. RETO 3: memoize DEBE implementar un cache con closure. Debe mostrar "Cache hit" en la segunda llamada. REPROBAR si el cache no funciona o si no usa JSON.stringify para la clave.
4. RETO 4: sumarArray y aplanar DEBEN ser recursivas (sin bucles). REPROBAR si usa for/while. El caso base debe existir.`
    },
  ],

  // ──────────────────────────────────────────────────────────
  'M07-DATA': [
    {
      slug: 'M07-E01-arrays',
      title: '⚔️ El Escuadrón de Héroes',
      description: 'Domina los métodos mutables de arrays: push, pop, shift, unshift, splice, slice, indexOf, includes, flat y concat.',
      sort_order: 1,
      type: 'js',
      html_template: `// ╔══════════════════════════════════════════════════════════════╗
// ║   📖 TEORÍA: Arrays en JavaScript                           ║
// ╠══════════════════════════════════════════════════════════════╣
//
//  CREAR ARRAYS:
//  const arr = [1, 2, 3];
//  const arr = new Array(5).fill(0);  // [0,0,0,0,0]
//  const arr = Array.from({ length: 5 }, (_, i) => i + 1); // [1,2,3,4,5]
//
//  MÉTODOS QUE MODIFICAN EL ARRAY ORIGINAL (mutables):
//  arr.push(4, 5)       → Agrega al final, devuelve nueva longitud
//  arr.pop()            → Elimina y devuelve el último
//  arr.unshift(0)       → Agrega al inicio, devuelve nueva longitud
//  arr.shift()          → Elimina y devuelve el primero
//  arr.splice(i, n)     → Elimina n elementos desde i, devuelve los eliminados
//  arr.splice(i, 0, x)  → Inserta x en posición i sin eliminar
//  arr.sort()           → Ordena in-place (cuidado: ordena como strings por defecto)
//  arr.reverse()        → Invierte in-place
//
//  MÉTODOS QUE NO MODIFICAN (inmutables):
//  arr.slice(inicio, fin)  → Extrae subarray sin modificar
//  arr.concat(otro)        → Une arrays, devuelve uno nuevo
//  arr.flat(profundidad)   → Aplana arrays anidados
//  arr.indexOf(x)          → Primera posición de x, -1 si no existe
//  arr.lastIndexOf(x)      → Última posición de x
//  arr.includes(x)         → true/false si existe x
//  arr.join(separador)     → Convierte a string
//
// ╚══════════════════════════════════════════════════════════════╝

// ─── RETO 1: Sistema de Gestión del Escuadrón ────────────────────────────
// Implementa una 'clase' simple usando closures para gestionar el escuadrón:

function crearEscuadron(nombre) {
  let miembros = [];
  
  return {
    // reclutar(heroe): agrega al final si no está ya (usa includes con los nombres)
    reclutar(heroe) { /* Tu código */ },
    
    // expulsar(nombre): elimina por nombre. Devuelve true si lo encontró, false si no.
    expulsar(nombre) {
      const idx = miembros.findIndex(h => h.nombre === nombre);
      // Tu código con splice
    },
    
    // promover(nombre): mueve al héroe al inicio del array (lider)
    promover(nombre) {
      // Tu código: findIndex + splice para sacar + unshift para poner al inicio
    },
    
    // reemplazar(nombreViejo, heroeNuevo): reemplaza un héroe por otro en la misma posición
    reemplazar(nombreViejo, heroeNuevo) {
      // Tu código con splice(idx, 1, heroeNuevo)
    },
    
    // listar(): devuelve string con todos los nombres en orden
    listar() {
      return \`[\${nombre}]: \${miembros.map(h => h.nombre).join(", ") || "Vacío"}\`;
    },
    
    size() { return miembros.length; }
  };
}

const escuadron = crearEscuadron("Guardias del Norte");
escuadron.reclutar({ nombre: "Aragorn", nivel: 15 });
escuadron.reclutar({ nombre: "Boromir", nivel: 10 });
escuadron.reclutar({ nombre: "Faramir", nivel: 8 });
escuadron.reclutar({ nombre: "Aragorn", nivel: 15 }); // no debe duplicar
console.log(escuadron.listar()); // Aragorn, Boromir, Faramir

escuadron.promover("Faramir");
console.log(escuadron.listar()); // Faramir, Aragorn, Boromir

escuadron.reemplazar("Boromir", { nombre: "Éowyn", nivel: 12 });
console.log(escuadron.listar()); // Faramir, Aragorn, Éowyn

escuadron.expulsar("Aragorn");
console.log(escuadron.listar()); // Faramir, Éowyn

// ─── RETO 2: Manipulación de Arrays Avanzada ─────────────────────────────
const inventario = [
  [101, "Espada del Amanecer", 2500],
  [102, "Escudo de Roble", 1800],
  [103, "Arco Élfico", 3200],
  [104, "Amuleto de Curación", 800],
  [105, "Capa de Invisibilidad", 5000],
];

// 2a: Extrae solo los nombres (segunda posición) de cada sub-array
const nombres = inventario.map(item => item[1]);
console.log("Nombres:", nombres);

// 2b: Usa flat() y flatMap() para entender la diferencia:
const inventarioPorDia = [
  ["Espada", "Escudo"],
  ["Arco", "Flecha", "Carcaj"],
  ["Poción"],
];
const todoFlat = inventarioPorDia.flat();
console.log("flat:", todoFlat);
// flatMap hace map + flat en un paso:
const conEtiqueta = inventarioPorDia.flatMap((dia, i) => dia.map(item => \`Día\${i+1}: \${item}\`));
console.log("flatMap:", conEtiqueta);

// 2c: Ordena el inventario por precio de mayor a menor
const ordenadoPorPrecio = [...inventario].sort((a, b) => b[2] - a[2]);
console.log("Más caro primero:", ordenadoPorPrecio.map(i => \`\${i[1]}: $\${i[2]}\`));

// 2d: Divide el inventario en "baratos" (<= 2000) e "Caros" (> 2000) sin filter:
// Usa reduce para crear { baratos: [], caros: [] }
const { baratos, caros } = inventario.reduce((acc, item) => {
  item[2] <= 2000 ? acc.baratos.push(item) : acc.caros.push(item);
  return acc;
}, { baratos: [], caros: [] });
console.log("Baratos:", baratos.map(i => i[1]));
console.log("Caros:", caros.map(i => i[1]));

// ─── RETO 3: Implementa una Cola (Queue) con arrays ──────────────────────
// Una queue es FIFO: First In, First Out (el primero en entrar es el primero en salir)
// Crea 'crearQueue(capacidadMax)' que:
//   - encolar(item): agrega al final si no supera la capacidad
//   - desencolar(): saca y devuelve el primero (FIFO)
//   - ver(): devuelve copia sin modificar
//   - isEmpty(): true si está vacía
//   - isFull(): true si llegó al máx
//
function crearQueue(capacidadMax = 10) {
  const items = [];
  return {
    encolar(item) { /* Tu código */ },
    desencolar() { /* Tu código - si está vacía devuelve null */ },
    ver() { return [...items]; },
    isEmpty() { return items.length === 0; },
    isFull() { return items.length >= capacidadMax; },
    size() { return items.length; },
  };
}

const colaMisiones = crearQueue(3);
console.log(colaMisiones.encolar("Misión A")); // true
console.log(colaMisiones.encolar("Misión B")); // true
console.log(colaMisiones.encolar("Misión C")); // true
console.log(colaMisiones.encolar("Misión D")); // false (llena)
console.log(colaMisiones.desencolar()); // "Misión A"
console.log(colaMisiones.ver());        // ["Misión B", "Misión C"]`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa el dominio de arrays. REGLAS:
1. RETO 1: reclutar DEBE verificar duplicados con findIndex/includes. expulsar DEBE usar findIndex + splice. promover DEBE usar splice para sacar + unshift para poner al inicio. REPROBAR si reemplazar no usa splice(idx, 1, nuevoHeroe) con sustitución en posición.
2. RETO 2c: Debe usar [...inventario] (copia) antes de sort, no modificar el original. REPROBAR si modifica inventario directamente.
3. RETO 2d: Debe usar reduce para la separación en baratos/caros. REPROBAR si usa filter.
4. RETO 3: encolar DEBE verificar capacidad y devolver boolean. desencolar DEBE usar shift() (FIFO). REPROBAR si desencolar usa pop() (que sería LIFO/Stack).`
    },

    {
      slug: 'M07-E02-arrays-funcionales',
      title: '🗺️ El Mapa del Tesoro',
      description: 'Domina los métodos funcionales de arrays: map, filter, reduce, find, findIndex, some, every, sort con comparadores, y el encadenamiento de métodos.',
      sort_order: 2,
      type: 'js',
      html_template: `// ╔══════════════════════════════════════════════════════════════╗
// ║   🎮 MISIÓN: El Mapa del Tesoro — Métodos Funcionales       ║
// ╚══════════════════════════════════════════════════════════════╝

const misiones = [
  { id: 1, titulo: "Recuperar la Espada", dificultad: 8, recompensa: 1500, completada: true,  tipo: "combate",    participantes: ["Aragorn", "Boromir"] },
  { id: 2, titulo: "Explorar la Cueva",   dificultad: 5, recompensa: 800,  completada: false, tipo: "exploracion", participantes: ["Legolas", "Gimli"] },
  { id: 3, titulo: "Proteger la Aldea",   dificultad: 3, recompensa: 400,  completada: true,  tipo: "defensa",    participantes: ["Sam", "Frodo"] },
  { id: 4, titulo: "Descifrar el Código", dificultad: 7, recompensa: 1200, completada: false, tipo: "intelecto",  participantes: ["Gandalf"] },
  { id: 5, titulo: "El Gran Dragón",       dificultad: 10, recompensa: 5000, completada: false, tipo: "combate",  participantes: ["Aragorn", "Legolas", "Gimli"] },
  { id: 6, titulo: "El Tesoro Perdido",   dificultad: 6, recompensa: 2000, completada: true,  tipo: "exploracion", participantes: ["Aragorn", "Gandalf"] },
  { id: 7, titulo: "Negociación con Elfos", dificultad: 4, recompensa: 600, completada: false, tipo: "diplomacia", participantes: ["Frodo", "Sam", "Gandalf"] },
];

// ─── RETO 1: map — Transformar ────────────────────────────────────────────

// 1a: Array con el título en mayúsculas y la recompensa con signo $
const misionesFormateadas = misiones.map(m => ({
  // Tu código: { id, titulo: en mayúsculas, recompensa: "$ X,XXX" }
  // Para formatear el número: m.recompensa.toLocaleString() o m.recompensa.toString() con padding
}));
console.log("1a:", misionesFormateadas.slice(0, 2));

// 1b: Calcula el "índice de valor" de cada misión = recompensa / dificultad
// Devuelve array de { titulo, valor: X.XX }
const valoresMisiones = /* Tu código: map + toFixed */;
console.log("1b valuación:", valoresMisiones);

// ─── RETO 2: filter — Seleccionar ────────────────────────────────────────

// 2a: Misiones pendientes (no completadas) con dificultad > 5
const misionesDificilesPendientes = /* Tu código */;
console.log("2a:", misionesDificilesPendientes.map(m => m.titulo));

// 2b: Misiones donde participa "Aragorn"
// Pista: m.participantes.includes("Aragorn")
const misionesAragorn = /* Tu código */;
console.log("2b Aragorn:", misionesAragorn.map(m => m.titulo));

// ─── RETO 3: reduce — Agregar ────────────────────────────────────────────

// 3a: Total de recompensas de misiones COMPLETADAS
const totalRecompensasGanadas = /* Tu código */;
console.log("3a total ganado: $" + totalRecompensasGanadas);

// 3b: Índice de misiones por tipo: { combate: [...], exploracion: [...], ... }
const misionesPorTipo = /* Tu código: reduce que agrupa por m.tipo */;
console.log("3b por tipo:", Object.entries(misionesPorTipo).map(([t, ms]) => \`\${t}: \${ms.length}\`));

// 3c: El pipeline completo: 
// De las misiones de "combate" no completadas, calcular la recompensa total prometida.
const recompensaCombatePendiente = /* Tu código: filter(combate + pendiente) + reduce(suma recompensas) */;
console.log("3c combate pendiente: $" + recompensaCombatePendiente);

// ─── RETO 4: find, findIndex, some, every ────────────────────────────────

// 4a: ¿Existe alguna misión con recompensa > 4000? (usa some)
const hayMisionEpica = /* Tu código */;
console.log("4a hay misión épica:", hayMisionEpica);

// 4b: ¿Todas las misiones completadas tienen dificultad <= 8? (usa every + filter o every internamente)
const todasFacilesCompletadas = /* Tu código */;
console.log("4b:", todasFacilesCompletadas);

// 4c: Encuentra la primera misión pendiente con mayor recompensa
// Pista: primero sort por recompensa desc, luego find pendiente
const mejorMisionPendiente = /* Tu código */;
console.log("4c mejor pendiente:", mejorMisionPendiente?.titulo, "- $" + mejorMisionPendiente?.recompensa);

// ─── RETO 5: Encadenamiento complejo ─────────────────────────────────────
// En una sola expresión encadenada (sin variables intermedias):
// 1. Filtra misiones con 2 o más participantes
// 2. Transforma a { titulo, nParticipantes, recompensaPorPersona }
//    donde recompensaPorPersona = Math.round(recompensa / nParticipantes)
// 3. Ordena por recompensaPorPersona de mayor a menor
// 4. Toma solo las 3 primeras (slice)
const topRentablesPorPersona = /* Tu código: filter.map.sort.slice encadenado */;
console.log("5 top rentables:", topRentablesPorPersona);`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa métodos funcionales de arrays. REGLAS:
1. RETO 1b: Debe usar toFixed(2) para el valor. REPROBAR si no formatea decimales.
2. RETO 2b: DEBE usar includes() para buscar en el array de participantes. REPROBAR si usa indexOf o indexOf.
3. RETO 3b: El groupBy con reduce DEBE inicializar el array si la clave no existe. REPROBAR si no maneja el caso del primer elemento de cada tipo.
4. RETO 3c: DEBE usar AMBOS filter y reduce encadenados (no una variable para lo filtrado si quiere hacerlo en una línea). REPROBAR si no usa ambos métodos.
5. RETO 4b: DEBE filtrar solo las completadas y luego usar every, o usar every con condición compuesta. REPROBAR si evalúa sobre todas las misiones.
6. RETO 5: DEBE ser una sola expresión encadenada: filter().map().sort().slice(). REPROBAR si usa variables intermedias.`
    },

    {
      slug: 'M07-E03-objetos',
      title: '👤 Los Archivos del Gremio',
      description: 'Domina objetos literales, métodos de Object, desestructuración, spread operator, shallow vs deep copy, y el patrón de objetos como módulos.',
      sort_order: 3,
      type: 'js',
      html_template: `// ╔══════════════════════════════════════════════════════════════╗
// ║   📖 TEORÍA: Objetos, Desestructuración y Spread            ║
// ╠══════════════════════════════════════════════════════════════╣
//
//  OBJETO LITERAL:
//  const obj = { clave: valor, método() { return this.clave; } };
//
//  ACCESO:
//  obj.clave         → notación punto
//  obj["clave"]      → notación corchete (útil para claves dinámicas)
//  obj[variable]     → clave dinámica con variable
//
//  DESESTRUCTURACIÓN:
//  const { nombre, nivel } = heroe;               // básico
//  const { nombre: alias } = heroe;               // con alias
//  const { nivel = 1 } = heroe;                   // con default
//  const { meta: { ciudad } } = heroe;            // anidada
//  const [primero, , tercero] = array;            // de arrays
//  function f({ nombre, nivel = 1 }) { ... }      // en parámetros
//
//  SPREAD OPERATOR (...):
//  const nuevo = { ...obj1, ...obj2 };  // fusiona objetos
//  const copia = { ...obj };            // copia superficial
//  const arrCopia = [...arr];           // copia array
//
//  ¡CUIDADO! Spread crea copia SUPERFICIAL (shallow copy):
//  El objeto copiado y el original comparten referencias a objetos anidados.
//  Para copia profunda (deep copy): structuredClone(obj) o JSON.parse(JSON.stringify(obj))
//
//  MÉTODOS DE OBJECT:
//  Object.keys(obj)    → array de claves
//  Object.values(obj)  → array de valores
//  Object.entries(obj) → array de [clave, valor]
//  Object.assign(dest, src) → copia propiedades de src a dest
//  Object.freeze(obj)  → hace el objeto inmutable
//
// ╚══════════════════════════════════════════════════════════════╝

// ─── RETO 1: Creación y Métodos de Objetos ────────────────────────────────
// Crea un objeto 'Heroe' con propiedades y métodos:
const crearHeroe = (nombre, clase, nivel = 1) => ({
  nombre,
  clase,
  nivel,
  xp: 0,
  habilidades: [],
  // método: ganarXP(cantidad) — suma XP y sube de nivel cada 1000 XP
  ganarXP(cantidad) {
    this.xp += cantidad;
    const nivelesSumados = Math.floor(this.xp / 1000);
    if (nivelesSumados > 0) {
      this.nivel += nivelesSumados;
      this.xp = this.xp % 1000;
      console.log(\`⬆️ \${this.nombre} subió a nivel \${this.nivel}!\`);
    }
  },
  // método: aprenderHabilidad(habilidad) — agrega solo si no la tiene
  aprenderHabilidad(habilidad) { /* Tu código */ },
  // método: toString() — devuelve representación legible
  toString() {
    return \`[\${this.clase}] \${this.nombre} — Lv.\${this.nivel} | XP:\${this.xp} | Skills: \${this.habilidades.join(", ") || "Ninguna"}\`;
  }
});

const h1 = crearHeroe("Aragorn", "Guerrero", 10);
h1.ganarXP(2500);
h1.aprenderHabilidad("Espadachín");
h1.aprenderHabilidad("Liderazgo");
h1.aprenderHabilidad("Espadachín"); // no debe duplicar
console.log(h1.toString());

// ─── RETO 2: Desestructuración Avanzada ──────────────────────────────────
const archivosDelGremio = {
  id: "GLD-0042",
  nombre: "Legolas",
  estadisticas: {
    nivel: 18,
    xp: 18500,
    atributos: { fuerza: 12, agilidad: 25, inteligencia: 15 }
  },
  habilidades: ["Arco Élfico", "Visión Nocturna", "Escudo de Viento"],
  gremio: { nombre: "Eldalondë", rango: "Maestro" }
};

// 2a: Desestructura en una sola línea:
// - nombre como 'nombreHeroe'
// - estadisticas.nivel
// - estadisticas.atributos.agilidad
// - gremio.nombre como 'nombreGremio'
// - La primera habilidad del array
const { 
  nombre: nombreHeroe,
  // Tu código aquí — desestructuración anidada en una expresión
} = archivosDelGremio;
console.log(nombreHeroe); // "Legolas"
// console.log(nivel, agilidad, nombreGremio, primeraHabilidad);

// 2b: Desestructuración en parámetros de función:
// Crea función 'resumenHeroe({ nombre, estadisticas: { nivel }, gremio: { nombre: gremioNombre, rango } })'
function resumenHeroe(/* Desestructura en los parámetros directamente */) {
  return \`\${nombre} [\${rango} de \${gremioNombre}] — Nivel \${nivel}\`;
}
console.log(resumenHeroe(archivosDelGremio));

// ─── RETO 3: Spread — Fusión e Inmutabilidad ──────────────────────────────
// 3a: Fusiona los objetos de configuración (los más específicos sobreescriben a los generales)
const configDefault = { tema: "oscuro", idioma: "es", debug: false, timeout: 30, maxReintentos: 3 };
const configUsuario = { tema: "claro", debug: true };
const configEntorno = { debug: false, maxReintentos: 5 };  // producción sobreescribe debug

// La prioridad es: configEntorno > configUsuario > configDefault
const configFinal = /* Tu código con spread en el orden correcto */;
console.log("Config final:", configFinal);

// 3b: Actualiza el objeto de héroe SIN mutarlo (devuelve uno nuevo)
const heroeOriginal = { nombre: "Frodo", nivel: 5, xp: 3200 };
const heroeActualizado = /* Tu código: spread + nuevas propiedades */;
heroeActualizado.nivel = 99; // No debe afectar a heroeOriginal
console.log("Original intacto:", heroeOriginal.nivel); // debe ser 5
console.log("Actualizado:", heroeActualizado);

// 3c: ¡La trampa del Shallow Copy!
// Demuestra que spread NO hace deep copy de objetos anidados:
const heroeConEquipo = { nombre: "Sam", equipo: { espada: "Aguijón", escudo: "De la Comarca" } };
const copiaDuperficial = { ...heroeConEquipo };
copiaDuperficial.nombre = "Sam (copia)";  // ← ¿afecta al original?
copiaDuperficial.equipo.espada = "Espada de Mithril"; // ← ¿afecta al original?
console.log("Original nombre:", heroeConEquipo.nombre);    // ¿Sam o Sam (copia)?
console.log("Original espada:", heroeConEquipo.equipo.espada); // ¿Aguijón o Espada de Mithril?
console.log("CONCLUSIÓN: El spread copia referencias de objetos anidados. Para evitar esto usa structuredClone()");

// Solución con structuredClone:
const copiaDeep = structuredClone(heroeConEquipo);
copiaDeep.equipo.espada = "Dagas del Shire";
console.log("Con structuredClone, original sigue siendo:", heroeConEquipo.equipo.espada);

// ─── RETO 4: Object.entries — Transformar objetos ─────────────────────────
// Transforma objetos usando Object.entries + reduce o Object.fromEntries
const precios = { espada: 2500, escudo: 1800, arco: 3200, amuleto: 800, capa: 5000 };

// 4a: Aplica descuento del 20% a todos los precios → nuevo objeto (no modifies el original)
const preciosConDescuento = /* Tu código: Object.fromEntries(Object.entries(p).map(...)) */;
console.log("Con descuento:", preciosConDescuento);

// 4b: Filtra solo los items que cuestan menos de $2000
const itemsBaratos = /* Tu código: Object.fromEntries(Object.entries(p).filter(...)) */;
console.log("Baratos:", itemsBaratos);

// 4c: Crea un inventario invertido: { 2500: "espada", 1800: "escudo", ... }
const preciosInvertidos = /* Tu código */;
console.log("Invertido:", preciosInvertidos);`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa objetos, desestructuración y spread. REGLAS:
1. RETO 1: aprenderHabilidad DEBE verificar duplicados antes de agregar. ganarXP DEBE calcular niveles correctamente basado en XP (cada 1000). REPROBAR si no verifica duplicados en habilidades.
2. RETO 2a: DEBE usar desestructuración anidada en una sola expresión (no múltiples líneas de desestructuración). REPROBAR si hace múltiples const separados.
3. RETO 2b: La función DEBE tener desestructuración en los PARÁMETROS, no en el cuerpo. REPROBAR si desestructura en el cuerpo con const.
4. RETO 3a: El orden de spread DEBE ser configDefault, configUsuario, configEntorno (para que configEntorno tenga mayor prioridad). REPROBAR si el orden es incorrecto.
5. RETO 3c: Los console.log deben mostrar evidencia del shallow copy: nombre NO se afecta pero equipo.espada SÍ se afecta. REPROBAR si el estudiante no ejecuta o no comenta los resultados.
6. RETO 4: DEBE usar Object.fromEntries + Object.entries para 4a y 4b. REPROBAR si construye el objeto manualmente con un bucle.`
    },
  ],

  // ──────────────────────────────────────────────────────────
  'M08-GIT': [
    {
      slug: 'M08-E01-git-basico',
      title: '🌿 Tu Primera Misión de Git',
      description: 'Aprende los comandos fundamentales de Git: init, add, commit, status, log, diff. Practica directamente en la terminal de VS Code.',
      sort_order: 1,
      type: 'terminal',
      html_template: `# 🌿 MISIÓN: Tu Primera Misión de Git

## 📖 TEORÍA: Sistema de Control de Versiones

Git te permite rastrear cambios en tu código y colaborar con otros.

### Conceptos clave:
- **Repositorio (repo)**: Carpeta donde Git rastrea los cambios
- **Working Directory**: Los archivos que ves y editas
- **Staging Area (Index)**: Zona de preparación antes del commit
- **Commit**: Snapshot permanente de los cambios preparados
- **HEAD**: Puntero al último commit de la rama actual

### Flujo de trabajo básico:
\`\`\`
Editar archivos → git add → git commit → (repetir)
Working Dir     →  Staging  →  History
\`\`\`

### Comandos esenciales:
\`\`\`bash
git init                    # Inicializa un nuevo repositorio
git status                  # Ver estado actual del repositorio
git add archivo.txt         # Preparar un archivo para commit
git add .                   # Preparar TODOS los archivos modificados
git commit -m "mensaje"     # Guardar snapshot con mensaje descriptivo
git log                     # Ver historial de commits
git log --oneline           # Historial compact
git diff                    # Ver cambios no preparados
git diff --staged           # Ver cambios preparados (en staging)
\`\`\`

---

## 🎮 MISIONES

> Abre la terminal integrada en VS Code (Ctrl+\` o Terminal > New Terminal)
> y ejecuta los comandos en tu carpeta de práctica.

### RETO 1: Inicializa el Repositorio
Crea una carpeta llamada \`mi-gremio\` y dentro:
1. Inicializa un repositorio Git
2. Verifica el estado inicial
3. **Anota el output de cada comando en las respuestas de abajo**

### RETO 2: Tu Primer Commit
1. Crea un archivo \`README.md\` con el texto "# Mi Primer Repositorio del Gremio"
2. Crea un archivo \`heroes.txt\` con al menos 3 nombres de héroes (uno por línea)
3. Usa \`git status\` y anota qué archivos aparecen como "Untracked"
4. Agrega SOLO \`README.md\` al staging con \`git add\`
5. Verifica con \`git status\` que solo README.md está en staging
6. Haz commit: "feat: agregar README inicial"
7. Verifica con \`git log --oneline\`

### RETO 3: Segundo Commit con Modificaciones
1. Modifica \`README.md\` agregando una línea: "Integrantes: [tus héroes]"
2. Agrega \`heroes.txt\` al staging
3. Verifica los cambios con \`git diff --staged\`
4. Haz commit: "feat: agregar lista de héroes"
5. Usa \`git log --oneline\` para ver los 2 commits

### RETO 4: El Arte del Mensaje de Commit
Un buen mensaje de commit sigue el formato: \`tipo: descripción breve\`
Tipos comunes: feat (nueva función), fix (bug), docs, style, refactor

Crea 3 archivos nuevos y haz un commit separado para cada uno:
- \`misiones.txt\` → commit "feat: agregar lista de misiones"
- \`reglas.md\` → commit "docs: documentar reglas del gremio"
- \`config.json\` → commit "chore: agregar configuración inicial"

Muestra el \`git log --oneline\` final con los 5 commits.

---

## ✏️ RESPUESTAS — Escribe los outputs aquí

**Output de git init:**
\`\`\`
(pega aquí el output)
\`\`\`

**Output de git status inicial:**
\`\`\`
(pega aquí)
\`\`\`

**Output de git log --oneline final (debe tener 5 commits):**
\`\`\`
(pega aquí)
\`\`\`

**¿Cuál es la diferencia entre \`git add .\` y \`git add archivo.txt\`?**
(Tu respuesta aquí)

**¿Para qué sirve el Staging Area? ¿Por qué no hacer commit directo?**
(Tu respuesta aquí)`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa el conocimiento de Git en este archivo de respuestas. REGLAS:
1. Debe haber un output real de 'git init' (debe contener "Initialized empty Git repository").
2. El output de git log --oneline DEBE mostrar exactamente 5 commits con mensajes descriptivos que sigan el formato feat:/docs:/chore:. REPROBAR si hay menos de 5 commits o si los mensajes no son descriptivos.
3. La explicación de git add . vs git add archivo.txt debe demostrar comprensión (add . agrega todo, add archivo agrega específico). REPROBAR si está en blanco.
4. La explicación del Staging Area debe mencionar que permite seleccionar qué cambios incluir en cada commit. REPROBAR si está en blanco o es muy superficial (menos de 2 oraciones).`
    },

    {
      slug: 'M08-E02-git-branches',
      title: '🌿 Las Ramas del Gran Árbol',
      description: 'Aprende a trabajar con ramas en Git: branch, checkout, switch, merge, y resolución básica de conflictos.',
      sort_order: 2,
      type: 'terminal',
      html_template: `# 🌿 MISIÓN: Ramas (Branches) en Git

## 📖 TEORÍA: Ramas en Git

Una **rama** es una línea independiente de desarrollo. Permite trabajar en features nuevas sin afectar el código principal.

### Comandos de ramas:
\`\`\`bash
git branch                  # Ver todas las ramas
git branch nombre-rama      # Crear nueva rama
git checkout nombre-rama    # Cambiar a una rama
git switch nombre-rama      # Cambiar (nuevo comando, más claro)
git checkout -b nueva-rama  # Crear Y cambiar en un paso
git switch -c nueva-rama    # Equivalente moderno

git merge nombre-rama       # Fusionar rama en la actual
git branch -d nombre-rama   # Eliminar rama ya mergeada
git branch -D nombre-rama   # Eliminar rama a la fuerza

git log --oneline --graph --all  # Ver historial con ramas
\`\`\`

### Flujo de trabajo con ramas:
\`\`\`
main ●─────────────────────────────● merge
      \\                            /
feature ●──●──●──●──●──●──●──────
\`\`\`

### Conflictos de merge:
Ocurren cuando dos ramas modifican la misma línea del mismo archivo.
Git marca el conflicto así:
\`\`\`
<<<<<<< HEAD
código de tu rama actual
=======
código de la otra rama
>>>>>>> feature-branch
\`\`\`
Debes elegir qué versión mantener, eliminar los marcadores, y hacer commit.

---

## 🎮 MISIONES

### RETO 1: Crear y Cambiar Ramas
En el repositorio \`mi-gremio\` del ejercicio anterior:
1. Muestra las ramas actuales con \`git branch\`
2. Crea una rama llamada \`feature/hechizos\`
3. Cámbiate a esa rama
4. Verifica que estás en la nueva rama
5. Crea un archivo \`hechizos.txt\` con 3 hechizos mágicos
6. Haz commit: "feat: agregar lista de hechizos"

### RETO 2: Trabajo Paralelo en Main
1. Vuelve a \`main\` (o \`master\`)
2. Sin cambiar de rama, crea un archivo \`armas.txt\` con 3 armas
3. Haz commit: "feat: agregar armas del gremio"
4. Verifica con \`git log --oneline --graph --all\` que las ramas divergen

### RETO 3: Merge Sin Conflictos
1. Estando en \`main\`, fusiona \`feature/hechizos\`
2. Verifica que \`hechizos.txt\` ahora está en \`main\`
3. Muestra el log final con --graph
4. Elimina la rama \`feature/hechizos\` ya mergeada

### RETO 4 (AVANZADO): Simula un Conflicto y Resuélvelo
1. Crea rama \`feature/actualizar-readme\`
2. En esa rama: modifica la primera línea de README.md a "# Gremio de Código - v2.0"
3. Haz commit en esa rama
4. Vuelve a main
5. Modifica la primera línea de README.md a "# Gremio de Código - Edición Especial"
6. Haz commit en main
7. Intenta hacer merge de \`feature/actualizar-readme\` → habrá conflicto
8. Resuelve el conflicto eligiendo la versión que quieras (o combinándolas)
9. Elimina los marcadores de conflicto <<<<<<, =======, >>>>>>>
10. Haz commit del merge resuelto

---

## ✏️ RESPUESTAS

**Rama creada y verificada (output de git branch):**
\`\`\`
(pega aquí)
\`\`\`

**Output de git log --graph --oneline --all (con ramas divergentes):**
\`\`\`
(pega aquí — debe mostrar ambas ramas)
\`\`\`

**Output después del merge (git log --graph --oneline --all):**
\`\`\`
(pega aquí — debe mostrar el punto de merge)
\`\`\`

**¿Cómo resolviste el conflicto del RETO 4? ¿Qué versión elegiste y por qué?**
(Tu respuesta aquí)

**¿Cuándo usarías una rama vs hacer commits directo en main?**
(Tu respuesta aquí — al menos 2 oraciones)`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa el conocimiento de ramas Git. REGLAS:
1. El output de git branch debe mostrar la rama feature/hechizos creada.
2. El log con --graph debe mostrar visualmente que las ramas divergen (con asteriscos y ramas). REPROBAR si no muestra divergencia.
3. El log post-merge debe mostrar un punto de convergencia (merge commit). REPROBAR si el log no muestra el merge.
4. La resolución del conflicto del RETO 4 debe describir las 3 partes: qué archivo tuvo conflicto, qué versión se eligió, y que se eliminaron los marcadores. REPROBAR si está en blanco.
5. La explicación de cuándo usar ramas debe mencionar: trabajo en equipo, features nuevas, o no romper el código en producción. REPROBAR si es menos de 2 oraciones.`
    },

    {
      slug: 'M08-E03-git-remote',
      title: '🌍 El Gremio en la Nube',
      description: 'Aprende a trabajar con repositorios remotos: remote, push, pull, clone, fetch, y el flujo de trabajo con GitHub.',
      sort_order: 3,
      type: 'terminal',
      html_template: `# 🌍 MISIÓN: Repositorios Remotos en Git

## 📖 TEORÍA: Trabajo con Remotos

Un repositorio **remoto** es una copia del repositorio alojada en un servidor (GitHub, GitLab, etc.). Permite colaborar con otros y hacer backup de tu código.

### Comandos de remotos:
\`\`\`bash
git remote -v                          # Ver remotos configurados
git remote add origin URL              # Conectar con un remoto llamado "origin"
git push origin main                   # Enviar commits al remoto
git push -u origin main               # Enviar + configurar como rama de seguimiento
git pull origin main                   # Descargar + fusionar cambios del remoto
git fetch origin                       # Descargar cambios sin fusionar
git clone URL                          # Clonar repositorio completo
git remote remove origin               # Eliminar configuración del remoto
\`\`\`

### Flujo de trabajo típico en equipo:
\`\`\`
1. git pull origin main          # Actualiza tu código local
2. git checkout -b feature/X     # Crea rama para tu feature
3. (hacer cambios + commits)
4. git push origin feature/X     # Envía tu rama al remoto
5. Crear Pull Request en GitHub  # Revisión de código
6. Merge aprobado               # Tu código llega a main
\`\`\`

### .gitignore:
Archivo que le dice a Git qué archivos NO rastrear:
\`\`\`
node_modules/     # Carpeta de dependencias (nunca commitear)
.env              # Variables de entorno (secretos!)
*.log             # Todos los archivos .log
dist/             # Build generado
.DS_Store         # Archivos de sistema macOS
\`\`\`

### Buenas prácticas:
- Siempre haz \`git pull\` antes de comenzar a trabajar
- Commit messages en inglés o consistentemente en el idioma del equipo
- Una feature = una rama = un Pull Request
- Nunca commitees credenciales (.env) o node_modules

---

## 🎮 MISIONES

### RETO 1: Conectar con GitHub
1. Crea un nuevo repositorio en GitHub (github.com → New Repository)
   - Nombre: "mi-gremio-git"
   - Público
   - SIN inicializar (sin README)
2. Conecta tu repositorio local con GitHub:
   \`git remote add origin [tu-URL-de-GitHub]\`
3. Verifica con \`git remote -v\`
4. Haz push de todo tu historial: \`git push -u origin main\`
5. Verifica en GitHub que los commits aparecen

### RETO 2: El .gitignore
1. Crea un archivo \`.gitignore\` con estas reglas:
   \`\`\`
   # Secretos
   .env
   secretos.txt
   
   # Dependencias
   node_modules/
   
   # Logs
   *.log
   
   # Sistema
   .DS_Store
   \`\`\`
2. Crea un archivo \`secretos.txt\` con texto "contraseña: 12345"
3. Verifica que Git NO rastrea secretos.txt (\`git status\`)
4. Haz commit del .gitignore: "chore: agregar .gitignore"
5. Haz push a GitHub

### RETO 3: Simula el Flujo de Equipo
Simula que un "compañero" hizo cambios en GitHub:
1. En GitHub (interfaz web), edita directamente \`README.md\` y agrega una línea
2. Guarda el cambio en GitHub (esto crea un commit remoto)
3. Localmente, crea también un cambio en otro archivo
4. Haz commit local
5. Intenta hacer push → debería fallar (hay cambios en remoto que no tienes)
6. Haz \`git pull origin main\` para traer los cambios del "compañero"
7. Resuelve el merge si hay conflicto
8. Haz push exitoso

---

## ✏️ RESPUESTAS

**URL de tu repositorio en GitHub:**
(pega la URL aquí)

**Output de git remote -v:**
\`\`\`
(pega aquí)
\`\`\`

**¿Por qué push falló en el RETO 3? ¿Cuál fue el mensaje de error?**
\`\`\`
(pega el error aquí)
\`\`\`

**Output final de git log --oneline (repositorio completo):**
\`\`\`
(pega aquí — debe tener al menos 8 commits)
\`\`\`

**¿Por qué NUNCA debes commitear tu .env o node_modules?**
(Tu respuesta — al menos 3 oraciones explicando las razones)

**Explica con tus palabras el flujo de trabajo de Pull Request:**
(Tu respuesta — describe los pasos desde crear una rama hasta que el código llega a main)`,
      css_template: '',
      js_template: '',
      instruction_for_ai: `Evalúa el conocimiento de repositorios remotos Git. REGLAS:
1. Debe haber una URL real de GitHub en las respuestas. REPROBAR si está vacía.
2. El output de git remote -v debe mostrar tanto (fetch) como (push) para origin. REPROBAR si no hay output.
3. El error del push fallido debe estar presente y debe mencionar que el remoto tiene cambios que no están localmente (rejected, non-fast-forward, o similar). REPROBAR si no hay mensaje de error.
4. El log debe tener al menos 8 commits incluyendo: los commits originales, el .gitignore, los de GitHub, y el merge. REPROBAR si tiene menos de 6.
5. La explicación de .env debe mencionar: seguridad (credenciales/contraseñas), que GitHub es público, y que node_modules es grande y se puede regenerar. REPROBAR si es menos de 2 razones.
6. La explicación de Pull Request debe mencionar: rama, push, PR en GitHub, revisión de código, merge. REPROBAR si omite la parte de revisión.`
    },
  ],
};

// ─────────────────────────────────────────────────────────────
// SEED FUNCTION
// ─────────────────────────────────────────────────────────────
async function seed() {
  console.log('\n🚀 Iniciando seed de Launchpad v2...\n');

  // 1. Insertar módulos
  console.log('📦 Insertando módulos...');
  const { data: modulesData, error: modulesError } = await supabase
    .from('modules')
    .upsert(MODULES, { onConflict: 'slug' })
    .select();

  if (modulesError) {
    console.error('❌ Error insertando módulos:', modulesError.message);
    process.exit(1);
  }
  console.log(`✅ ${modulesData.length} módulos insertados.`);

  // Crear mapa slug → id
  const moduleMap = {};
  for (const m of modulesData) moduleMap[m.slug] = m.id;

  // 2. Insertar ejercicios
  let totalInserted = 0;
  for (const [moduleSlug, exercises] of Object.entries(EXERCISES_BY_MODULE)) {
    const moduleId = moduleMap[moduleSlug];
    if (!moduleId) {
      console.warn(`⚠️  Módulo no encontrado: ${moduleSlug}`);
      continue;
    }

    const toInsert = exercises.map(ex => ({
      ...ex,
      module_id: moduleId,
      status: 'approved',
    }));

    const { data, error } = await supabase
      .from('exercises')
      .upsert(toInsert, { onConflict: 'slug' })
      .select('id, slug, title');

    if (error) {
      console.error(`❌ Error en módulo ${moduleSlug}:`, error.message);
    } else {
      console.log(`  ✅ [${moduleSlug}] ${data.length} ejercicios`);
      totalInserted += data.length;
    }
  }

  console.log(`\n🎉 Seed completado. Total ejercicios: ${totalInserted}`);
  console.log(`📊 Módulos: ${modulesData.length}`);
}

seed().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
