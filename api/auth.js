import fs from 'fs';
import path from 'path';

const STORAGE_FILE = path.join(process.cwd(), '.db_storage.json');

const syncUserToDB = (user) => {
    try {
        let db = { users: [], transactions: [], logs: [] };
        if (fs.existsSync(STORAGE_FILE)) {
            db = JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf8'));
        }
        
        const idx = db.users.findIndex(u => u.id === user.id || u.email === user.email);
        if (idx >= 0) {
            db.users[idx] = { ...db.users[idx], ...user, lastLogin: Date.now() };
        } else {
            db.users.push({ ...user, role: 'editor', createdAt: Date.now(), lastLogin: Date.now() });
        }
        fs.writeFileSync(STORAGE_FILE, JSON.stringify(db, null, 2));
        return true;
    } catch (e) { return false; }
};

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    
    const { action, user } = req.body;
    if (action === 'sync' && user) {
        syncUserToDB(user);
        return res.status(200).json({ success: true });
    }
    res.status(400).json({ success: false, error: 'Invalid action' });
}
