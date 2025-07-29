import Database from 'better-sqlite3';
import { ids } from '../frontend/generator/glyphs';

try {
    const setupDB = new Database('database.db');

    const createEmojiTable = setupDB.prepare(
        `CREATE TABLE IF NOT EXISTS emojis (id TEXT PRIMARY KEY, name TEXT, type TEXT, style TEXT, hero TEXT);`
    );
    createEmojiTable.run();

    const rows = ids.map((id) => `('${id}')`).join(', ');
    const populateEmojiTable = setupDB.prepare(
        `INSERT OR IGNORE INTO emojis (id) VALUES ${rows};`
    );
    populateEmojiTable.run();

    setupDB.close();
} catch (err) {
    console.error(`An error occured when setting up the database`);
    throw err;
}

export const db = new Database('database.db', { verbose: console.log });
