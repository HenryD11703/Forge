const pg = require('pg');
const dotenv = require('dotenv');
const path = require('path');
const crypto = require('crypto');

dotenv.config();

// Load exercises from compiled TS
const { exercises } = require('../out/exercises.js');

const dbClient = new pg.Client({
    connectionString: process.env.CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
});

async function runSeed() {
    try {
        await dbClient.connect();
        console.log("Connected to DB...");

        for (const ex of exercises) {
            console.log(`Inserting ${ex.title}...`);
            await dbClient.query(`
                INSERT INTO exercises (id, slug, title, description, html_template, css_template, instruction_for_ai, status)
                VALUES ($1, $2, $3, $4, $5, $6, $7, 'approved')
                ON CONFLICT (slug) DO UPDATE SET 
                    title = EXCLUDED.title,
                    description = EXCLUDED.description,
                    html_template = EXCLUDED.html_template,
                    css_template = EXCLUDED.css_template,
                    instruction_for_ai = EXCLUDED.instruction_for_ai
            `, [
                crypto.randomUUID(), 
                ex.folderName, 
                ex.title, 
                ex.description, 
                ex.htmlTemplate, 
                ex.cssTemplate, 
                ex.instructionForAI
            ]);
        }
        console.log("Seeding complete!");
    } catch (err) {
        console.error("Error seeding:", err);
    } finally {
        await dbClient.end();
    }
}

runSeed();
