const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
const db = new Database('names.db');

// Create table if it doesn't exist
db.exec(`
    CREATE TABLE IF NOT EXISTS greetings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

app.use(express.json());
app.use(express.static(path.join(__dirname)));

// API endpoint to save name
app.post('/api/greet', (req, res) => {
    const { name } = req.body;
    const stmt = db.prepare('INSERT INTO greetings (name) VALUES (?)');
    stmt.run(name);
    res.json({ success: true });
});

// API endpoint to get all greetings
app.get('/api/greetings', (req, res) => {
    const greetings = db.prepare('SELECT * FROM greetings ORDER BY timestamp DESC').all();
    res.json(greetings);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
