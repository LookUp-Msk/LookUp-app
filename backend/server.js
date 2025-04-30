const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;
const DB_FILE = './backend/db.json';

app.use(cors());
app.use(express.json({ limit: '5mb' }));

// Load existing items
function loadItems() {
    try {
        const data = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(data);
    } catch {
        return [];
    }
}

// Save items
function saveItems(items) {
    fs.writeFileSync(DB_FILE, JSON.stringify(items, null, 2));
}

// GET all items
app.get('/api/items', (req, res) => {
    res.json(loadItems());
});

// POST a new item
app.post('/api/items', (req, res) => {
    const items = loadItems();
    const newItem = req.body;
    newItem.id = Date.now();
    items.push(newItem);
    saveItems(items);
    res.status(201).json(newItem);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
