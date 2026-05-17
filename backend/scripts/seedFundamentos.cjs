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
        title: "Día 1: El Cofre del Tesoro",
        folderName: "M1-01-Cofre",
        description: "Aprende los fundamentos de JavaScript. Declara tus primeras variables y juega con Strings (Cadenas de texto). ¡Imprime en consola!",
        htmlTemplate: "<!DOCTYPE html><html lang='es'><body><h1 style='font-family:sans-serif;'>Abre la Consola de Desarrollador (F12) o Revisa tu Terminal</h1><script src='script.js'></script></body></html>",
        cssTemplate: "body { background: #333; color: white; text-align: center; margin-top: 20%; }",
        jsTemplate: `// ============================================
// 📖 TEORÍA: Variables y Cadenas
// ============================================
// En JavaScript, usamos 'let' para variables que pueden cambiar, 
// y 'const' para valores fijos.
// Ejemplo: 
//   const elemento = 'Fuego';
//   let poder = 100;
//   console.log('El mago ataca con ' + elemento);
//
// ============================================
// 🚀 TU MISIÓN:
// 1. Crea una variable constante llamada 'jugador' y asígnale tu nombre.
// 2. Crea una variable modificable llamada 'monedas' que tenga el valor 0.
// 3. Asígnale el valor 50 a 'monedas'.
// 4. Muestra en consola el mensaje final concatenado: "Jugador X encontró Y monedas"
// ============================================

// Escribe tu código aquí abajo:
`,
        instructionForAI: "REGLA ESTRICTA 1: Deben declarar una variable 'jugador' con const. REGLA ESTRICTA 2: Deben declarar 'monedas' con let y valor inicial 0, y luego reasignarla a 50. REGLA ESTRICTA 3: Deben usar un console.log que junte ambas variables en una frase comprobable."
    },
    {
        title: "Día 2: La Puerta del Dragón",
        folderName: "M1-02-Dragon",
        description: "Controla el flujo de tu código con Condicionales (if/else). Solo un nivel alto puede vencer al dragón.",
        htmlTemplate: "<!DOCTYPE html><html lang='es'><body><h1 style='font-family:sans-serif;'>Misión 2: Consola Activa</h1><script src='script.js'></script></body></html>",
        cssTemplate: "body { background: #333; color: white; text-align: center; margin-top: 20%; }",
        jsTemplate: `// ============================================
// 📖 TEORÍA: Condicionales (if / else)
// ============================================
// Nos permiten tomar decisiones.
// Ejemplo:
//   let hp = 10;
//   if (hp === 0) {
//       console.log('Te has desmayado');
//   } else {
//       console.log('Sigues vivo');
//   }
//
// ============================================
// 🚀 TU MISIÓN:
// 1. Hay variables predefinidas abajo.
// 2. Escribe una validación (if/else):
//    - Si 'nivel' es MAYOR o IGUAL a 5 y 'tieneEspada' es true, imprime "¡Dragón derrotado!".
//    - Si no, imprime "Huye del dragón...".
// ============================================

let nivel = 6;
let tieneEspada = true;

// Escribe tu código aquí:
`,
        instructionForAI: "REGLA ESTRICTA 1: Deben usar una estructura if/else con lógica AND (&&). REGLA ESTRICTA 2: Deben imprimir '¡Dragón derrotado!' porque se cumple la condición."
    },
    {
        title: "Día 3: El Campo de Entrenamiento",
        folderName: "M1-03-Ciclos",
        description: "Evita escribir el mismo código 100 veces. Los Ciclos Repetitivos (Bucles) son tus mejores amigos.",
        htmlTemplate: "<!DOCTYPE html><html lang='es'><body><h1 style='font-family:sans-serif;'>Misión 3: Consola Activa</h1><script src='script.js'></script></body></html>",
        cssTemplate: "body { background: #333; color: white; text-align: center; margin-top: 20%; }",
        jsTemplate: `// ============================================
// 📖 TEORÍA: Ciclos (Estructuras Repetitivas)
// ============================================
// Un bucle 'for' se repite varias veces controlando un iterador (la 'i').
// Ejemplo: 
//   for(let i = 1; i <= 3; i++) {
//       console.log("Ronda " + i);
//   }
//
// ============================================
// 🚀 TU MISIÓN:
// - Necesitas entrenar golpeando a un muñeco de paja 5 veces.
// - Escribe un ciclo FOR que vaya desde 1 hasta 5.
// - En cada vuelta, el ciclo debe imprimir: "Golpe número X".
// ============================================

// Escribe tu ciclo for aquí:
`,
        instructionForAI: "REGLA ESTRICTA 1: Debe haber una declaración de 'for' tradicional let i=1... o let i=0... REGLA 2: Debe haber un console.log que imprima el número de iteración de alguna manera (concatenando o template literal)."
    },
    {
        title: "Día 4: El Gremio Básico",
        folderName: "M1-04-Funciones",
        description: "Empaqueta tu código en bloques reutilizables mediante Funciones que reciban parámetros.",
        htmlTemplate: "<!DOCTYPE html><html lang='es'><body><h1 style='font-family:sans-serif;'>Misión 4: Consola Activa</h1><script src='script.js'></script></body></html>",
        cssTemplate: "body { background: #333; color: white; text-align: center; margin-top: 20%; }",
        jsTemplate: `// ============================================
// 📖 TEORÍA: Funciones Clásicas
// ============================================
// Una función ejecuta lógica cuando es invocada, y puede devolver valores con 'return'.
// Ejemplo:
//   function sumarMagia(a, b) {
//       return a + b;
//   }
//   console.log( sumarMagia(10, 5) );
//
// ============================================
// 🚀 TU MISIÓN:
// 1. Cura a un aliado mediante una función.
// 2. Declara una función llamada 'curar' que reciba dos parámetros: 'hpActual' y 'curacion'.
// 3. La función debe sumar los valores y usar 'return' para devolver el nuevo HP.
// 4. Afuera de la función, llama a curar(50, 10) e imprime su resultado.
// ============================================

// Escribe tu función aquí:
`,
        instructionForAI: "REGLA ESTRICTA 1: Deben declarar 'function curar'. REGLA 2: Debe aceptar dos parámetros y usar un 'return' con la suma de ambos. REGLA 3: Ejecutar la función imprimiéndola en consola. Ojo! también acptar si usan const curar = (a, b) => ..."
    },
    {
        title: "Día 5: La Mochila del Viajero",
        folderName: "M1-05-Arrays",
        description: "Aprende a agrupar muchos elementos en listas indexadas llamadas Arrays o Arreglos.",
        htmlTemplate: "<!DOCTYPE html><html lang='es'><body><h1 style='font-family:sans-serif;'>Misión 5: Consola Activa</h1><script src='script.js'></script></body></html>",
        cssTemplate: "body { background: #333; color: white; text-align: center; margin-top: 20%; }",
        jsTemplate: `// ============================================
// 📖 TEORÍA: Arreglos (Arrays)
// ============================================
// Listas ordenadas que empiezan con índice 0.  
// Podemos añadir con push() y quitar el último con pop().
// Ejemplo:
//   let bolsa = ['Poción', 'Mapa'];
//   bolsa.push('Antorcha'); // Añade al final
//
// ============================================
// 🚀 TU MISIÓN:
// 1. Tienes un inventario base: let inventario = ['Mapa', 'Brujula', 'Basura'];
// 2. Elimina el último elemento del arreglo porque no sirve (usa el método correcto).
// 3. Añade 'Escudo' usando el método adecuado.
// 4. Imprime el arreglo completo en la consola.
// ============================================

let inventario = ['Mapa', 'Brujula', 'Basura'];

// Tu código entra aquí:
`,
        instructionForAI: "REGLA ESTRICTA 1: Deben usar inventario.pop() u homólogo. REGLA ESTRICTA 2: Deben usar inventario.push('Escudo'). REGLA ESTRICTA 3: Verificar que imprimen el array final."
    },
    {
        title: "Día 6: Registro de Identidad",
        folderName: "M1-06-Objetos",
        description: "Representa cosas del mundo real usando Objetos literales. Propiedades atadas a un molde.",
        htmlTemplate: "<!DOCTYPE html><html lang='es'><body><h1 style='font-family:sans-serif;'>Misión 6: Consola Activa</h1><script src='script.js'></script></body></html>",
        cssTemplate: "body { background: #333; color: white; text-align: center; margin-top: 20%; }",
        jsTemplate: `// ============================================
// 📖 TEORÍA: Objetos Literales
// ============================================
// Estructuras formadas por cajas de llave-valor.
// Ejemplo:
//   const nave = { motor: 'Ion', escudos: true };
//   console.log(nave.motor);
//
// ============================================
// 🚀 TU MISIÓN:
// 1. Declara un objeto CONSTANTE llamado 'astronauta'.
// 2. Dentro, añádele 3 propiedades: 
//    'nombre' (String), 'edad' (Número), 'rango' (String).
// 3. Modifica la edad del astronauta asigingándole 30 (astronauta.edad = 30).
// 4. Imprime su nombre y rango en la consola.
// ============================================

// ¡A codear!
`,
        instructionForAI: "REGLA ESTRICTA 1: Constante 'astronauta' objeto. REGLA ESTRICTA 2: Debe mutarse una propiedad específica de los objetos fuera de su declaración. Validar entendimiento básico."
    },
    {
        title: "Día 7: La Magia Estelar (Spread)",
        folderName: "M1-07-Spread",
        description: "¡Clonar objetos ahora es más fácil! Usa el Spread Operator para sacar todos los valores y copiarlos.",
        htmlTemplate: "<!DOCTYPE html><html lang='es'><body><h1 style='font-family:sans-serif;'>Misión 7: Consola Activa</h1><script src='script.js'></script></body></html>",
        cssTemplate: "body { background: #333; color: white; text-align: center; margin-top: 20%; }",
        jsTemplate: `// ============================================
// 📖 TEORÍA: Spread Operator (...)
// ============================================
// El operador spread es como 'explotar' o 'esparcir' algo para sacar sus entrañas rápidamente. Útil para hacer copias o unir cosas.
// Ejemplo: 
//   const obj1 = { a: 1 };
//   const copiaMasCosas = { ...obj1, b: 2 }; 
//
// ============================================
// 🚀 TU MISIÓN:
// 1. Tienes un objeto base: const robotOriginal = { modelo: 'X1', hp: 50 };
// 2. Crea en una nueva constante llamada 'clonAvanzado' usando Spread Operator (...robotOriginal).
// 3. En esa misma línea del spread, acompáñale una nueva propiedad 'armadura: 100'.
// 4. Imprime tu clonAvanzado. ¡Verás que no dañaste el original!
// ============================================

const robotOriginal = { modelo: 'X1', hp: 50 };

// Tu turno:
`,
        instructionForAI: "REGLA ESTRICTA: El usuario construyó clonAvanzado esparciendo las bases con ...robotOriginal obligatoriamente y añadiendo nueva sintaxis armadura. No tolerar sintaxis antigua como Object.assign()"
    },
    {
        title: "Día 8: Desempaquetando el Botín",
        folderName: "M1-08-Destructuracion",
        description: "¡Extrae individualmente variables fuera de un objeto en una sola línea gracias a la destructuración! (Destructuring Assignment)",
        htmlTemplate: "<!DOCTYPE html><html lang='es'><body><h1 style='font-family:sans-serif;'>Misión 8: Consola Activa</h1><script src='script.js'></script></body></html>",
        cssTemplate: "body { background: #333; color: white; text-align: center; margin-top: 20%; }",
        jsTemplate: `// ============================================
// 📖 TEORÍA: Destructuración Literal
// ============================================
// En vez de escribir nav.modelo y nav.motor varias veces, 
// puedes sacarlos en variables inmediatas.
// Ejemplo: 
//   const { modelo, motor } = nave;
//
// ============================================
// 🚀 TU MISIÓN:
// 1. Descubriste esto: const botin = { oro: 500, gema: 'Rubí', peso: 5 };
// 2. Usa Destructuración para declarar 'oro' y 'gema' sacados del botin directamente en la Línea 1.
// 3. Imprime por la consola un mensaje usando esas variables sacadas, ej: "Has ganado 500 y un Rubí".
// ============================================

const botin = { oro: 500, gema: 'Rubí', peso: 5 };

// Sácalos aquí:
`,
        instructionForAI: "REGLA 1: Exigir uso literal de desestructuración sintáctica de la línea `const { oro, gema } = botin;`. Prohibir que sean variables manuales botin.oro"
    }
];


async function runSeed() {
    try {
        await dbClient.connect();
        
        console.log("Cleaning advanced JS challenges logically to avoid panic among students...");
        // This will wipe specifically the 5 JS exercises we injected earlier based on slug 'M1-' or pure JS
        await dbClient.query("DELETE FROM exercises WHERE slug IN ('11-Interruptor', '12-Gatitos-JS', '13-Timer', '14-Keylogger', '15-FetchAPI')");

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
        console.log("Seeding complete! Módulo 1 en línea y listo para Launchpad.");
    } catch (err) {
        console.error("Error seeding:", err);
    } finally {
        await dbClient.end();
    }
}

runSeed();
