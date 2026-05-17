const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const client = new pg.Client({
    connectionString: process.env.CONNECTION_STRING,
    ssl: { rejectUnauthorized: false },
});

async function run() {
    await client.connect();
    await client.query(`
        ALTER TABLE user_progress
        ADD COLUMN IF NOT EXISTS nota INTEGER CHECK (nota >= 0 AND nota <= 100);
    `);
    console.log('✓ Columna nota agregada a user_progress');
    await client.end();
}

run().catch(err => { console.error(err); process.exit(1); });
