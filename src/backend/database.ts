import Database from 'better-sqlite3';

try {
    const setupDB = new Database('db/glyphs.db');

    const createEmojiTable = setupDB.prepare(
        `CREATE TABLE IF NOT EXISTS glyphs (id TEXT PRIMARY KEY, name TEXT, type TEXT, style TEXT, hero TEXT);`
    );
    createEmojiTable.run();

    setupDB.close();
} catch (err) {
    console.error(`An error occured when setting up the database`);
    throw err;
}

export const db = new Database('database.db', { verbose: console.log });
