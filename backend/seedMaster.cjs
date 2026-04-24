const pg = require('pg');
const dotenv = require('dotenv');
const crypto = require('crypto');

dotenv.config();

const dbClient = new pg.Client({
    connectionString: process.env.CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
});

const exercises = [
    // ============================================
    // MODULO 1: HTML
    // ============================================
    {
        title: "La Primera Piedra (Estructura)",
        folderName: "M01-HTML-Estructura",
        description: "Construye los cimientos de tu primera página web utilizando títulos y párrafos.",
        htmlTemplate: `<!-- 
============================================
📖 TEORÍA: Títulos y Párrafos en HTML
============================================
HTML es el esqueleto de la web.
- <h1> : Título principal, el más grande. Solo debe haber uno.
- <h2>, <h3> : Títulos más pequeños para subtítulos.
- <p> : Párrafo de texto.

Ejemplo:
  <h1>Mi Blog</h1>
  <p>Bienvenidos al inicio de todo.</p>
============================================
🚀 TU MISIÓN:
1. Dentro del <body>, crea un <h1> que diga "Bienvenido al Gremio".
2. Cierra la etiqueta </h1> automáticamente.
3. Debajo, crea un <p> que contenga la frase "Prepárate para la aventura".
============================================
-->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
</head>
<body>

    <!-- Escribe tu código aquí -->

</body>
</html>`,
        cssTemplate: `/* CSS Inicial Base */
body { font-family: sans-serif; background: #fff; padding: 20px; }`,
        jsTemplate: ``,
        instructionForAI: "REGLA ESTRICTA 1: Deben haber creado exactamente un H1 y un P dentro del BODY, con las etiquetas correctamente cerradas. Validar los textos internamente."
    },
    {
        title: "El Hiperespacio (Enlaces e Imágenes)",
        folderName: "M01-HTML-Media",
        description: "Conecta tu página al resto del universo insertando enlaces e imágenes.",
        htmlTemplate: `<!-- 
============================================
📖 TEORÍA: Enlaces e Imágenes
============================================
- <a> : Etiqueta de enlace (Anchor). Usa el atributo 'href' para la URL.
- <img> : Muestra imágenes. Usa 'src' para la ruta y 'alt' para descripción. Ojo: ¡No se cierra (<img />)!

Ejemplo:
  <a href="https://google.com">Ir a Google</a>
  <img src="gato.jpg" alt="Un gato feliz">
============================================
🚀 TU MISIÓN:
1. Inserta una <img> que tenga el src="https://placekitten.com/200/200" y un alt="Gatito".
2. Debajo, pon un <a> que te lleve a "https://github.com" con el texto "Visitar Github".
============================================
-->
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
</head>
<body>

    <!-- Escribe aquí el código multimedia -->

</body>
</html>`,
        cssTemplate: `body { font-family: sans-serif; background: #fff; padding: 20px; } a { display: block; margin-top: 10px; }`,
        jsTemplate: ``,
        instructionForAI: "REGLA ESTRICTA 1: Validar existencia de <img> con atributo src y alt. REGLA ESTRICTA 2: Validar <a> con href correcto. No permitir faltas ortográficas en atributos."
    },
    {
        title: "Control de Mando (Formularios)",
        folderName: "M01-HTML-Forms",
        description: "Recopila información del usuario utilizando el poderoso tag Form.",
        htmlTemplate: `<!-- 
============================================
📖 TEORÍA: Formularios
============================================
- <form> : Contenedor principal del formulario.
- <input> : Campo para escribir información. Usa 'type' (text, password, email).
- <button> : Botón para enviar (submit) la info.

Ejemplo:
  <form>
    <input type="text" placeholder="Escribe tu ID">
    <button type="submit">Enviar</button>
  </form>
============================================
🚀 TU MISIÓN:
1. Crea un <form>.
2. Dentro, añade un <input> de tipo "email" con el placeholder "Correo espacial".
3. Al lado del input, pon un <button> de type "submit" con el texto "Lanzar".
============================================
-->
<!DOCTYPE html>
<html lang="es">
<body>
    
    <!-- Escribe tu formulario aquí -->

</body>
</html>`,
        cssTemplate: `body { padding: 40px; font-family: sans-serif; } input { padding: 10px; margin-right: 10px; } button { padding: 10px; }`,
        jsTemplate: ``,
        instructionForAI: "REGLA ESTRICTA 1: Todo el input y button deben estar DENTRO del form. REGLA 2: Asegurar que el input sea type='email'."
    },

    // ============================================
    // MODULO 2: CSS
    // ============================================
    {
        title: "Pintando la Armadura (CSS Visuales)",
        folderName: "M02-CSS-Colores",
        description: "Aprende a estilizar elementos por clase e ID dándoles colores dinámicos.",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head><link rel="stylesheet" href="style.css"></head>
<body>
    <div class="caja-magica" id="tesoro">Soy una caja visual</div>
</body>
</html>`,
        cssTemplate: `/* 
============================================
📖 TEORÍA: Selectores y Backgrounds
============================================
En CSS capturamos elementos usando Selectores:
- Por Etiqueta: div { ... }
- Por Clase: .nombreDeClase { ... }
- Por ID: #idDelElemento { ... }

Ejemplo:
  .boton { background-color: red; color: white; }
============================================
🚀 TU MISIÓN:
1. Selecciona la clase 'caja-magica' mediante el selector de punto (.).
2. Cámbiale el 'background-color' a 'blue'.
3. Agrégale un 'color' de texto 'white'.
============================================
*/

/* Escribe tu CSS abajo de esto: */
`,
        jsTemplate: ``,
        instructionForAI: "REGLA ESTRICTA 1: Verificar el selector .caja-magica. REGLA 2: Validar background-color: blue y color: white. (Rechazar si usan estilos inline en HTML)."
    },
    {
        title: "Las Murallas (Modelo de Cajas)",
        folderName: "M02-CSS-BoxModel",
        description: "Domina la diferencia entre los bordes internos (Padding) y externos (Margin).",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head><link rel="stylesheet" href="style.css"></head>
<body>
    <div class="castillo">Castillo 1</div>
    <div class="castillo">Castillo 2</div>
</body>
</html>`,
        cssTemplate: `/* 
============================================
📖 TEORÍA: Padding vs Margin
============================================
Imagina que la pantalla es un terreno.
- Padding: El relleno. Qué tan gordo está el elemento hacia ADENTRO.
- Border: La pared que recubre al elemento.
- Margin: El espacio EXTERIOR que separa este elemento de sus vecinos.
============================================
🚀 TU MISIÓN:
A la clase .castillo le falta tamaño y separación:
1. Añádele un 'padding' de 20px (para que sea gordo).
2. Añádele un 'margin-bottom' de 30px (para que Castillo 1 se separe de Castillo 2).
3. Añádele un 'border' de 2px solid black.
============================================
*/

.castillo {
    background-color: lightgreen;
    /* Añade las reglas que faltan aquí abajo: */
    
}
`,
        jsTemplate: ``,
        instructionForAI: "REGLA ESTRICTA: El selector .castillo debe contener exactamente padding: 20px, margin-bottom: 30px y border: 2px solid black."
    },
    {
        title: "Formación de Batalla (Flexbox Básicos)",
        folderName: "M02-CSS-Flex",
        description: "Ordena elementos en línea fácilmente con la magia de Flexbox.",
        htmlTemplate: `<!DOCTYPE html>
<html lang="es">
<head><link rel="stylesheet" href="style.css"></head>
<body>
    <div class="escuadron">
        <div class="soldado">1</div>
        <div class="soldado">2</div>
        <div class="soldado">3</div>
    </div>
</body>
</html>`,
        cssTemplate: `/* 
============================================
📖 TEORÍA: Flexbox
============================================
'display: flex' convierte un contenedor en una fila elástica.
- justify-content: Alinea los elementos horizontalmente (center, space-between, flex-end).
- align-items: Alinea verticalmente.
============================================
🚀 TU MISIÓN:
1. Dale al .escuadron la propiedad mágica 'display: flex'.
2. Sepáralos dándole un 'justify-content: space-between'.
============================================
*/

.escuadron {
    background-color: #eee;
    height: 100px;
    padding: 10px;
    /* Tu magia flexbox empieza aquí: */

}

.soldado {
    background: red;
    color: white;
    padding: 20px;
}
`,
        jsTemplate: ``,
        instructionForAI: "REGLA ESTRICTA: .escuadron debe usar indiscutiblemente display: flex y justify-content: space-between. Castigar si usan floats."
    },

    // ============================================
    // MODULO 3: JAVASCRIPT FUNDAMENTALS
    // ============================================
    {
        title: "El Cofre del Tesoro",
        folderName: "M03-JS-Variables",
        description: "Declara tus primeras variables y juega con Cadenas de texto. ¡Imprime tu resultado!",
        htmlTemplate: "<!DOCTYPE html><html><body><h1 style='font-family:sans-serif;'>Abre la Consola de Desarrollador (F12)</h1><script src='script.js'></script></body></html>",
        cssTemplate: "body { background: #333; color: white; text-align: center; margin-top: 20%; }",
        jsTemplate: `// ============================================
// 📖 TEORÍA: Variables y Cadenas
// ============================================
// En JavaScript, usamos 'let' para variables que pueden cambiar, 
// y 'const' para valores fijos.
// Ejemplo: 
//   const hechizo = 'Fuego';
//   let mana = 100;
//   console.log('Te atacan con ' + hechizo);
//
// ============================================
// 🚀 TU MISIÓN:
// 1. Crea una constante 'jugador' y asígnale tu nombre en string.
// 2. Crea una variable 'monedas' que tenga el valor numérico 0.
// 3. Asígnale el valor 50 a 'monedas'.
// 4. Muestra en consola concatenado: "Jugador X encontró Y monedas"
// ============================================

// Escribe tu código JS aquí:
`,
        instructionForAI: "REGLA ESTRICTA: Declara jugador con const, declara monedas con let, reasigna monedas a 50 e imprime consola un string concatenado correcto."
    },
    {
        title: "La Puerta del Dragón",
        folderName: "M03-JS-Condicionales",
        description: "Controla el flujo de tu código con IF/ELSE. Solo un jugador poderoso puede pasar.",
        htmlTemplate: "<!DOCTYPE html><html><body><h1 style='font-family:sans-serif;'>Misión: Consola Activa</h1><script src='script.js'></script></body></html>",
        cssTemplate: "body { background: #333; color: white; text-align: center; margin-top: 20%; }",
        jsTemplate: `// ============================================
// 📖 TEORÍA: Condicionales (if / else)
// ============================================
// Nos permiten tomar decisiones lógicas en el código usando operadores como === (igual), o >= (mayor igual).
// Ejemplo:
//   let hp = 10;
//   if (hp <= 0) {
//       console.log('Te has desmayado');
//   } else {
//       console.log('Sigues de pie');
//   }
// ============================================
// 🚀 TU MISIÓN:
// 1. Dadas las variables abajo.
// 2. Escribe una validación (if/else):
//    - Si 'nivel' es MAYOR o IGUAL a 5 Y (&&) 'tieneLlave' es true: imprime "Abres la puerta gigante".
//    - Si no: imprime "Regresa a la aldea".
// ============================================

let nivel = 6;
let tieneLlave = true;

// Escribe tu condicional aquí:
`,
        instructionForAI: "REGLA ESTRICTA: El if debe tener un operador lógico AND (&&). Comprobar que en consola imprimen el texto correcto de apertura."
    },
    {
        title: "El Campo de Entrenamiento",
        folderName: "M03-JS-Ciclos",
        description: "Haz que la computadora trabaje por ti repitiendo el mismo código usando Ciclos For.",
        htmlTemplate: "<!DOCTYPE html><html><body><h1 style='font-family:sans-serif;'>Misión: Consola Activa</h1><script src='script.js'></script></body></html>",
        cssTemplate: "body { background: #333; color: white; text-align: center; margin-top: 20%; }",
        jsTemplate: `// ============================================
// 📖 TEORÍA: Tareas Repetitivas (For Loop)
// ============================================
// La estructura FOR tiene 3 partes: Desde dónde empieza (let i = 0); Hasta dónde llega (i < 5); Y cómo avanza (i++).
// Ejemplo: 
//   for(let i = 1; i <= 3; i++) {
//       console.log("Vuelta " + i);
//   }
// ============================================
// 🚀 TU MISIÓN:
// Imagina que debes entrenar con la espada 5 veces.
// 1. Escribe un ciclo FOR que vaya desde 1 hasta (o igual a) 5.
// 2. En cada vuelta, el ciclo debe imprimir: "Golpe número X".
// ============================================

// Declara tu bucle aquí:
`,
        instructionForAI: "REGLA ESTRICTA: Bucle estricto for(let i=1... o 0) que itere 5 veces e imprima en el log el índice integrado dentro de un string."
    },
    {
        title: "El Gremio Básico",
        folderName: "M03-JS-Funciones",
        description: "Empaqueta la lógica que se repita creando Funciones personalizadas con parámetros.",
        htmlTemplate: "<!DOCTYPE html><html><body><h1 style='font-family:sans-serif;'>Misión: Consola Activa</h1><script src='script.js'></script></body></html>",
        cssTemplate: "body { background: #333; color: white; text-align: center; margin-top: 20%; }",
        jsTemplate: `// ============================================
// 📖 TEORÍA: Funciones y Retornos
// ============================================
// Una función envuelve un proceso, requiere recibir 'parámetros' y devuelve el calculo final con 'return'.
// Ejemplo:
//   function sumar(a, b) {
//       return a + b;
//   }
//   console.log( sumar(10, 5) );
// ============================================
// 🚀 TU MISIÓN:
// 1. Necesitamos curar a un mago en batalla.
// 2. Declara una función llamada 'curar' que reciba dos valores: 'hpActual' y 'puntosPocion'.
// 3. Usa 'return' para devolver la suma de ambos valores matemáticamente.
// 4. Afuera de la función, mándala a llamar pasando los números (50, 10).
// ============================================

// Escribe tu función aquí:
`,
        instructionForAI: "REGLA ESTRICTA 1: Función 'curar' aceptando parámetros de entrada que devuelva la suma. REGLA 2: Aceptar functions o arrow functions. REGLA 3: Ejecutar con consola console.log(curar(50,10))"
    },
    {
        title: "La Mochila del Viajero",
        folderName: "M03-JS-Arrays",
        description: "Almacena decenas de valores en un solo lugar aprendiendo a usar Arrays y sus métodos PUSH/POP.",
        htmlTemplate: "<!DOCTYPE html><html><body><h1 style='font-family:sans-serif;'>Misión: Consola Activa</h1><script src='script.js'></script></body></html>",
        cssTemplate: "body { background: #333; color: white; text-align: center; margin-top: 20%; }",
        jsTemplate: `// ============================================
// 📖 TEORÍA: Arreglos (Arrays / Listas)
// ============================================
// Se escriben con [] y te permiten listar información por orden.
// Se usan métodos especiales: push() empuja algo al final; pop() destruye el último elemento de la lista.
// Ejemplo:
//   let bolsa = ['Agua', 'Mapa'];
//   bolsa.push('Antorcha'); 
// ============================================
// 🚀 TU MISIÓN:
// Abajo declaramos tu inventario inicial. 
// 1. La "Basura" ya no te sirve. Remuévela usando el método correcto de arreglo para eliminar el último ítem.
// 2. Metiste una espada a tu mochila. Añade el string "Espada" al arreglo usando el método correcto.
// 3. Imprime por la consola el estado de la mochila final para revisar tus ítems.
// ============================================

let inventario = ['Mapa', 'Brujula', 'Basura'];

// Tu código entra aquí:
`,
        instructionForAI: "REGLA ESTRICTA 1: Deben mutar el arreglo invocando inventario.pop(). REGLA ESTRICTA 2: Invocando inventario.push('Espada'). REGLA ESTRICTA 3: Verificar que imprimen el array usando consola."
    },
    {
        title: "Registro de Identidad",
        folderName: "M03-JS-Objetos",
        description: "Representa a un jugador ficticio aglomerando sus datos en un Objeto literal moderno.",
        htmlTemplate: "<!DOCTYPE html><html><body><h1 style='font-family:sans-serif;'>Misión: Consola Activa</h1><script src='script.js'></script></body></html>",
        cssTemplate: "body { background: #333; color: white; text-align: center; margin-top: 20%; }",
        jsTemplate: `// ============================================
// 📖 TEORÍA: Objetos Literales
// ============================================
// Nos permiten asignar propiedades de llave: valor a una sola entidad usando {}.
// Ejemplo:
//   const nave = { motor: 'Ion', escudos: true };
//   console.log(nave.motor); // Imprime 'Ion'
// ============================================
// 🚀 TU MISIÓN:
// 1. Imagina que el sistema escaneó a un comandante.
// 2. Declara un objeto con 'const' llamado 'astronauta'.
// 3. Añádele las propiedades: 'nombre' (String), 'edad' (Numérico) y 'rango' (String).
// 4. Modifica programáticamente la edad asigingándole 30 (astronauta.edad = 30).
// 5. Imprime su rango en la consola.
// ============================================

// ¡A codear comandante!
`,
        instructionForAI: "REGLA ESTRICTA 1: const 'astronauta' objeto base. REGLA ESTRICTA 2: Mutación directa a la edad astronauta.edad = 30. Imprimir en consola su propiedad rango."
    },
    {
        title: "La Magia Estelar (Spread)",
        folderName: "M03-JS-Spread",
        description: "Clona y empalma objetos de manera elegante usando la sintaxis de Spread Operator (...)",
        htmlTemplate: "<!DOCTYPE html><html><body><h1 style='font-family:sans-serif;'>Misión: Consola Activa</h1><script src='script.js'></script></body></html>",
        cssTemplate: "body { background: #333; color: white; text-align: center; margin-top: 20%; }",
        jsTemplate: `// ============================================
// 📖 TEORÍA: Operador Spread (...)
// ============================================
// Si quieres clonar un objeto y sumarle cosas nuevas en ES6 usamos '...'. Esto "esparce" las tripas del objeto viejo en uno nuevo evitando modificar las raíces.
// Ejemplo: 
//   const copiaMasCosas = { ...objViejo, nuevaStats: 100 }; 
// ============================================
// 🚀 TU MISIÓN:
// 1. Tienes un objeto viejo de chatarra: const robotC3 = { modelo: 'C3', hp: 50 };
// 2. Declara una constante llamada 'clonAvanzado' que asigne usando Spread Operator (...robotC3) toda esa chatarra.
// 3. En la propia declaración donde haces el clon, acompáñale una nueva asignación: armadura: 100.
// 4. Imprime tu clonAvanzado completo.
// ============================================

const robotC3 = { modelo: 'C3', hp: 50 };

// Tu turno de clonar:
`,
        instructionForAI: "REGLA ESTRICTA: El usuario construyó clonAvanzado propagando la base mediante syntax ...robotC3 e incluyendo explícitamente armadura: 100 dentro de ese nuevo literal."
    },
    {
        title: "Desempaquetando el Botín",
        folderName: "M03-JS-Destructuring",
        description: "Exprime dos propiedades cruciales de un Objeto creando múltiples variables en 1 sola línea (Destructuración).",
        htmlTemplate: "<!DOCTYPE html><html><body><h1 style='font-family:sans-serif;'>Misión: Consola Activa</h1><script src='script.js'></script></body></html>",
        cssTemplate: "body { background: #333; color: white; text-align: center; margin-top: 20%; }",
        jsTemplate: `// ============================================
// 📖 TEORÍA: Destructuración Literal
// ============================================
// Destructurar significa sacar valores específicos de un objeto y convertirlos en variables locales al instante al nombrarlas entre llaves.
// Ejemplo: 
//   const { velocidad, altura } = naveVoladoraObj;
// ============================================
// 🚀 TU MISIÓN:
// 1. Venciste a un duende. Soltó este botin: const recompensa = { oro: 500, gema: 'Rubí', peso: 5 };
// 2. Extrae 'oro' y 'gema' definiéndolos en la misma línea usando Destructuring Assignment.
// 3. Imprime esas dos variables en la consola de manera concatenada, indicando lo que has ganado.
// ============================================

const recompensa = { oro: 500, gema: 'Rubí', peso: 5 };

// Sácalo aquí:
`,
        instructionForAI: "REGLA ESTRICTA: Uso literal obligado del destructuring syntax: const { oro, gema } = recompensa. Negar uso tradicional const oro = recompensa.oro. Validar impresion."
    }
];

async function runMasterSeed() {
    try {
        await dbClient.connect();
        
        console.log("Vaciando tablas para sembrar el Root Master Currículum...");
        // Delete all exercises to avoid any legacy bugs! 
        await dbClient.query("DELETE FROM exercises");

        console.log("Iniciando inmersiones temáticas (HTML -> CSS -> JS)...");

        for (const ex of exercises) {
            console.log(`Inserting ${ex.title}...`);
            await dbClient.query(`
                INSERT INTO exercises (id, slug, title, description, html_template, css_template, js_template, instruction_for_ai, status)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, 'approved')
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
        console.log("¡Sembrador Maestro Exitoso! Todos los ejercicios cargados.");
    } catch (err) {
        console.error("Error seeding:", err);
    } finally {
        await dbClient.end();
    }
}

runMasterSeed();
