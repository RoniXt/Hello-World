const express = require('express');
const { createClient } = require('@libsql/client');
const path = require('path');

const app = express();

const db = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
});

async function initDatabase() {
    await db.execute(`
        CREATE TABLE IF NOT EXISTS greetings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
}

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API endpoint to save name
app.post('/api/greet', async (req, res) => {
    const { name } = req.body;
    await db.execute({
        sql: 'INSERT INTO greetings (name) VALUES (?)',
        args: [name],
    });
    res.json({ success: true });
});

// API endpoint to get all greetings
app.get('/api/greetings', async (req, res) => {
    const result = await db.execute('SELECT * FROM greetings ORDER BY timestamp DESC');
    res.json(result.rows);
});

const PORT = process.env.PORT || 3000;

initDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
