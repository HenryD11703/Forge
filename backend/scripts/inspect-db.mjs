import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.PROJECT_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const { data: modules } = await supabase
    .from('modules')
    .select('id, slug, title, sort_order')
    .order('sort_order');

const { data: exercises } = await supabase
    .from('exercises')
    .select('slug, title, type, status, module_id, sort_order')
    .order('sort_order');

console.log('\n========== MÓDULOS EN BD ==========');
for (const mod of modules ?? []) {
    const exs = (exercises ?? []).filter(e => e.module_id === mod.id);
    console.log(`\n[${mod.sort_order}] ${mod.title} (${mod.slug})`);
    for (const ex of exs) {
        const status = ex.status === 'approved' ? '✓' : `(${ex.status})`;
        console.log(`    ${status} [${ex.type.toUpperCase()}] ${ex.title}  →  ${ex.slug}`);
    }
    if (exs.length === 0) console.log('    (sin ejercicios)');
}

const orphans = (exercises ?? []).filter(e => !modules?.find(m => m.id === e.module_id));
if (orphans.length) {
    console.log('\n⚠️  EJERCICIOS SIN MÓDULO:');
    for (const ex of orphans) console.log(`   ${ex.slug}`);
}

console.log(`\n→ ${modules?.length ?? 0} módulos, ${exercises?.length ?? 0} ejercicios en total\n`);
