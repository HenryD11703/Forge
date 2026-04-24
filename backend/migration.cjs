const pg = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const dbClient = new pg.Client({
    connectionString: process.env.CONNECTION_STRING,
    ssl: { rejectUnauthorized: false }
});

async function run() {
    try {
        await dbClient.connect();
        await dbClient.query(`ALTER TABLE exercises ADD COLUMN js_template TEXT DEFAULT '';`);
        console.log("Success! Column js_template added.");
    } catch (err) {
        if (err.message.includes('already exists')) {
            console.log("Column js_template already exists.");
        } else {
            console.error("Error altering table", err);
        }
    } finally {
        await dbClient.end();
    }
}

run();
