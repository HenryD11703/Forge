import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.PROJECT_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const fixes = [
    {
        slug: 'M07-E01-arrays-metodos',
        field: 'instruction_for_ai',
        description: 'Relax unshift requirement — any valid method to move to front is ok',
        value: `REGLAS ESTRICTAS — Arrays Métodos:
1. RETO 1 reclutar: DEBE verificar duplicados con findIndex, .some o .includes antes de agregar. REPROBAR si permite duplicados.
2. RETO 1 promover: DEBE usar findIndex para encontrar el índice y luego mover el héroe a la primera posición del array. Acepta cualquier combinación válida (splice+unshift, splice+spread, filter+unshift, etc.). REPROBAR si el héroe no queda en la posición 0.
3. RETO 1 reemplazar: DEBE reemplazar al héroe en la MISMA posición (índice), no eliminarlo y agregar al final. REPROBAR si cambia la posición del elemento.
4. RETO 2: DEBE usar .flat() y .flatMap(). REPROBAR si aplana manualmente con bucles. Sort DEBE no modificar el original (spread o slice primero). REPROBAR si modifica items.
5. RETO 3 desencolar: DEBE usar shift() (FIFO). REPROBAR si usa pop() (que sería LIFO/Stack).`,
    },
    {
        slug: 'M07-E02-arrays-funcionales',
        field: 'instruction_for_ai',
        description: 'Remove REPROBAR for indexOf — both indexOf and includes are valid',
        value: `REGLAS ESTRICTAS — Métodos Funcionales:
1. RETO 1b: Debe usar .toFixed(2) para redondear el valor. REPROBAR si no formatea decimales.
2. RETO 2b: DEBE verificar si "Aragorn" está en el array de participantes. Acepta .includes() o .indexOf(). REPROBAR si no hace la verificación.
3. RETO 3b: El reduce DEBE inicializar el array si la clave no existe. REPROBAR si no maneja el primer elemento de cada tipo.
4. RETO 3c: DEBE encadenar filter + reduce. REPROBAR si usa solo filter sin reduce o si lo calcula con bucle.
5. RETO 5: DEBE ser UNA SOLA expresión encadenada: filter().map().sort().slice(). REPROBAR si usa variables intermedias.`,
    },
    {
        slug: 'M07-E03-objetos',
        field: 'instruction_for_ai',
        description: 'Soften Object.fromEntries requirement — accept correct result via any approach',
        value: `REGLAS ESTRICTAS — Objetos y Spread:
1. RETO 1 ganarXP: DEBE calcular correctamente los niveles ganados (floor(xp/1000)) y xp restante (xp%1000). REPROBAR si no calcula niveles o si la XP no se acumula correctamente.
2. RETO 1 aprenderHabilidad: DEBE verificar duplicados con includes, indexOf o similar. REPROBAR si permite duplicados.
3. RETO 3 configFinal: El orden DEBE ser { ...def, ...user, ...prod } para que prod tenga mayor prioridad. REPROBAR si el orden es incorrecto.
4. RETO 3b: Los console.log DEBEN mostrar la diferencia: nombre no cambia con shallow (primitivo), pero equipo.espada SÍ cambia (referencia). REPROBAR si no hay comentarios o si el código no lo demuestra.
5. RETO 4: DEBE usar Object.entries y Object.fromEntries (o equivalente con Object.keys) para transformar objetos. Acepta construcción manual del objeto resultado si la transformación es correcta. REPROBAR si no itera sobre las entradas del objeto original.`,
    },
];

let ok = 0;
let fail = 0;

for (const fix of fixes) {
    const { error } = await supabase
        .from('exercises')
        .update({ [fix.field]: fix.value })
        .eq('slug', fix.slug);

    if (error) {
        console.error(`✗ ${fix.slug}: ${error.message}`);
        fail++;
    } else {
        console.log(`✓ ${fix.slug} — ${fix.description}`);
        ok++;
    }
}

console.log(`\n→ ${ok} actualizados, ${fail} errores`);
