const pg = require('pg');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const dbClient = new pg.Client({
    connectionString: process.env.CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
});

const exercises = [
    {
        title: "El Interruptor Nocturno 🌙",
        folderName: "11-Interruptor",
        description: "Usa JavaScript para crear un modo oscuro real. Escucha el click del botón y añade la clase 'dark-mode' al <body>.",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Interruptor</title>
</head>
<body>
    <button id="toggleBtn">Cambiar Modo</button>
    <script src="script.js"></script>
</body>
</html>`,
        cssTemplate: `body { transition: background 0.5s, color 0.5s; background: white; color: black; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
body.dark-mode { background: #121212; color: white; }
button { padding: 15px 30px; font-size: 18px; cursor: pointer; }`,
        jsTemplate: `// Selecciona el botón y el body, y añade un Event Listener
`,
        instructionForAI: "REGLA ESTRICTA 1: DEBEN USAR 'const' o 'let', no 'var'. REGLA ESTRICTA 2: OBLIGATORIO usar 'addEventListener' en el botón ('click'). REGLA ESTRICTA 3: DEBEN usar 'document.body.classList.toggle(\"dark-mode\")' u otra manipulación equivalente de className."
    },
    {
        title: "Invasión de Gatitos 🐱",
        folderName: "12-Gatitos-JS",
        description: "Haz que al presionar el botón aparezcan gatitos en la pantalla creando elementos dinámicamente usando document.createElement.",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Invasión</title>
</head>
<body>
    <button id="invadirBtn">¡INVASIÓN!</button>
    <div id="contenedorGatitos" class="grid"></div>
    <script src="script.js"></script>
</body>
</html>`,
        cssTemplate: `.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 10px; margin-top: 20px; }
img { width: 100px; height: 100px; object-fit: cover; }`,
        jsTemplate: `// Usa document.createElement('img') y appendChild
const btn = document.getElementById('invadirBtn');
const contenedor = document.getElementById('contenedorGatitos');

// Añade la lógica aquí...
`,
        instructionForAI: "REGLA ESTRICTA 1: Obligatorio instanciar la imagen con `document.createElement('img')`. REGLA ESTRICTA 2: Asignar un src válido a la imagen y obligatoriamente usar `appendChild` sobre el contendor. REGLA 3: Prohibido usar innerHTML = '<img...>'."
    },
    {
        title: "Despegue Inminente 🚀",
        folderName: "13-Timer",
        description: "Maneja el tiempo en Javascript usando setInterval. Haz que un número vaya de 10 a 0 y luego escriba '¡DESPEGUE!'.",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Cohete</title>
</head>
<body>
    <h1 id="contador">10</h1>
    <script src="script.js"></script>
</body>
</html>`,
        cssTemplate: `body { display: flex; justify-content: center; align-items: center; height: 100vh; background: #0b3d91; color: white; font-size: 5rem; font-family: monospace; }`,
        jsTemplate: `// Usa setInterval para restar el número. No olvides usar clearInterval
`,
        instructionForAI: "REGLA ESTRICTA 1: DEBE usar `setInterval`. REGLA ESTRICTA 2: DEBE usar `clearInterval` cuando llegue a ceros. REGLA ESTRICTA 3: DEBE modificar el textContent/innerText a '¡DESPEGUE!' (o similar). Solo permite arrow functions."
    },
    {
        title: "El Ladrón de Teclados 🕵️",
        folderName: "14-Keylogger",
        description: "Aprende sobre Eventos de Teclado. Lee individualmente las teclas que presiona el usuario en el input y ponlas en un span de alerta con color rojo.",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Espía</title>
</head>
<body>
    <input type="text" id="secreto" placeholder="Escribe tu secreto...">
    <div style="margin-top:20px;">Interceptado: <span id="robo" style="color:red; font-weight:bold;"></span></div>
    <script src="script.js"></script>
</body>
</html>`,
        cssTemplate: `body { font-family: sans-serif; padding: 40px; } input { padding: 10px; font-size: 16px; }`,
        jsTemplate: `// Usa un event listener de tipo 'keyup' o 'input' en el input element
`,
        instructionForAI: "REGLA ESTRICTA 1: Usar 'addEventListener' con 'keyup', 'keydown' o 'input'. REGLA ESTRICTA 2: Actualizar el contenedor robo en tiempo real (leyendo e.target.value o e.key). Sin innerHTML (usar textContent)."
    },
    {
        title: "Máquina de Chistes (Fetch API) 🤖",
        folderName: "15-FetchAPI",
        description: "Tu primera petición HTTP. Haz una llamada 'fetch' a la API 'v2.jokeapi.dev/joke/Programming?format=txt' y muestra el resultado en pantalla cuando le den click.",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <title>Chistes</title>
</head>
<body>
    <button id="chisteBtn">Pedir Chiste Nuevo</button>
    <p id="pantalla" style="font-size:24px; margin-top:20px; font-family: monospace;"></p>
    <script src="script.js"></script>
</body>
</html>`,
        cssTemplate: `body { padding: 50px; background: #eee; }`,
        jsTemplate: `// Async / Await o Promesas con .then()
const apiURL = "https://v2.jokeapi.dev/joke/Programming?format=txt";

`,
        instructionForAI: "REGLA ESTRICTA 1: DEBEN usar 'fetch(apiURL)' y tratar la promesa con un await o un .then. REGLA ESTRICTA 2: Deben usar res.text() o res.json() y modificar el DOM. Validar uso estricto de 'const' y arrow functions."
    }
];


async function runSeed() {
    try {
        await dbClient.connect();
        console.log("Connected to DB...");

        for (const ex of exercises) {
            console.log(`Inserting ${ex.title}...`);
            await dbClient.query(`
                INSERT INTO exercises (id, slug, title, description, html_template, css_template, js_template, instruction_for_ai, status)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'approved')
                ON CONFLICT (slug) DO UPDATE SET 
                    title = EXCLUDED.title,
                    description = EXCLUDED.description,
                    html_template = EXCLUDED.html_template,
                    css_template = EXCLUDED.css_template,
                    js_template = EXCLUDED.js_template,
                    instruction_for_ai = EXCLUDED.instruction_for_ai
            `, [
                crypto.randomUUID(), 
                ex.folderName, 
                ex.title, 
                ex.description, 
                ex.htmlTemplate, 
                ex.cssTemplate, 
                ex.jsTemplate,
                ex.instructionForAI
            ]);
        }
        console.log("Seeding complete! 5 JS Exercises added.");
    } catch (err) {
        console.error("Error seeding:", err);
    } finally {
        await dbClient.end();
    }
}

runSeed();
