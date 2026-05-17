import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.PROJECT_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const { data: modules } = await supabase.from('modules').select('*').order('sort_order');
const { data: exercises } = await supabase.from('exercises').select('*').order('sort_order');

for (const mod of modules ?? []) {
    const exs = (exercises ?? []).filter(e => e.module_id === mod.id);
    console.log('\n' + '═'.repeat(60));
    console.log(`MÓDULO: ${mod.title} (${mod.slug})`);
    console.log('═'.repeat(60));
    for (const ex of exs) {
        console.log(`\n── ${ex.title} [${ex.slug}] [${ex.type}]`);
        console.log(`   DESC: ${ex.description}`);
        console.log(`   AI INSTRUCTION:\n   ${ex.instruction_for_ai}`);
        if (ex.html_template) console.log(`   HTML TEMPLATE (${ex.html_template.length} chars)`);
        if (ex.css_template)  console.log(`   CSS TEMPLATE (${ex.css_template.length} chars)`);
        if (ex.js_template)   console.log(`   JS TEMPLATE:\n${ex.js_template}`);
    }
}
