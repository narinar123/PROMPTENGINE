import fs from 'fs';
import path from 'path';

// Ultra-lite dynamic DB backend for direct persistence
// This automatically provisions storage if no complex remote DB is provided.
const STORAGE_FILE = path.join(process.cwd(), '.db_storage.json');

const loadDB = () => {
    try {
        if (!fs.existsSync(STORAGE_FILE)) {
            fs.writeFileSync(STORAGE_FILE, JSON.stringify({ users: [], transactions: [], logs: [] }, null, 2));
        }
        return JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf8'));
    } catch (e) {
        return { users: [], transactions: [], logs: [] };
    }
};

const saveDB = (data) => {
    try {
        fs.writeFileSync(STORAGE_FILE, JSON.stringify(data, null, 2));
        return true;
    } catch (e) {
        console.error("DB Storage Fail:", e);
        return false;
    }
};

export default async function handler(req, res) {
    // Enable standard CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    const { method } = req;
    const db = loadDB();

    if (method === 'GET') {
        // Read capability for internal dashboard
        const table = req.query?.table || 'users';
        res.status(200).json({ success: true, data: db[table] || [] });
    } else if (method === 'POST') {
        const { table, action, payload } = req.body;
        
        if (!table || !db[table]) {
            // Auto-provision dynamic table if requested (True No-Coding Experience)
            db[table] = [];
        }

        if (action === 'upsert') {
            // Simple upsert based on id
            const idx = db[table].findIndex(i => i.id === payload.id || i.email === payload.email);
            if (idx >= 0) {
                db[table][idx] = { ...db[table][idx], ...payload, updatedAt: Date.now() };
            } else {
                db[table].push({ ...payload, createdAt: Date.now() });
            }
            saveDB(db);
            res.status(200).json({ success: true, message: 'Sync operation complete' });
        } else if (action === 'insert') {
            db[table].push({ ...payload, id: payload.id || `id_${Date.now()}`, createdAt: Date.now() });
            saveDB(db);
            res.status(200).json({ success: true, data: payload });
        } else {
            res.status(400).json({ success: false, error: 'Action undefined' });
        }
    }
}
