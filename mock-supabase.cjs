const express = require('express');
const app = express();
app.use(express.json());
app.use(express.raw({ type: '*/*', limit: '10mb' }));

const storage = new Map(); // path -> buffer

// Upload
app.post('/storage/v1/object/media/*', (req, res) => {
    const path = req.params[0];
    storage.set(path, req.body);
    res.json({ Key: `media/${path}` });
});

// List
app.post('/storage/v1/object/list/media', (req, res) => {
    const { prefix, search } = req.body;
    const results = [];
    for (const key of storage.keys()) {
        if (key.includes(search)) {
            results.push({ name: key.split('/').pop(), id: 'mock-id' });
        }
    }
    res.json(results);
});

// Remove
app.delete('/storage/v1/object/media', (req, res) => {
    const { prefixes } = req.body;
    const deleted = [];
    if (prefixes && Array.isArray(prefixes)) {
        for (const p of prefixes) {
            if (storage.has(p)) {
                storage.delete(p);
                deleted.push({ name: p });
            }
        }
    }
    res.json(deleted);
});

app.listen(8000, () => console.log('Mock Supabase listening on 8000'));
