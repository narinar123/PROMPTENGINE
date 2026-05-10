// Dynamic UPI/GPay Intent Generation & Transaction Logging API
import fs from 'fs';
import path from 'path';

const STORAGE_FILE = path.join(process.cwd(), '.db_storage.json');

const logTransaction = (tx) => {
    try {
        let db = { users: [], transactions: [], logs: [] };
        if (fs.existsSync(STORAGE_FILE)) {
            db = JSON.parse(fs.readFileSync(STORAGE_FILE, 'utf8'));
        }
        db.transactions.push({ ...tx, timestamp: Date.now(), status: 'initiated' });
        fs.writeFileSync(STORAGE_FILE, JSON.stringify(db, null, 2));
    } catch (e) {}
};

export default async function handler(req, res) {
    // Standard CORS Handling
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    const { amount, plan, userEmail, userName } = req.body;

    // Real production configuration should inject merchant IDs here.
    // We use generic placeholder UPI IDs that dispatch to valid test wallets.
    const MERCHANT_UPI = "gsprompthero@okicici"; // Replaced dynamic for production
    const MERCHANT_NAME = "GS PROMPT HERO AI";
    const TXN_REF = `TXN_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    
    // Standard UPI Deeplink Schema:
    // upi://pay?pa=address&pn=name&am=amount&tr=ref&tn=note&cu=INR
    const upiUri = `upi://pay?pa=${encodeURIComponent(MERCHANT_UPI)}&pn=${encodeURIComponent(MERCHANT_NAME)}&mc=0000&tr=${TXN_REF}&tn=${encodeURIComponent("Subscription for " + plan)}&am=${amount}&cu=INR`;

    // GPay Specific Android Intent Vector (fallback/direct)
    const gpayAndroidIntent = `intent://pay?pa=${encodeURIComponent(MERCHANT_UPI)}&pn=${encodeURIComponent(MERCHANT_NAME)}&am=${amount}&tr=${TXN_REF}&cu=INR#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;S.browser_fallback_url=https://play.google.com/store/apps/details?id=com.google.android.apps.nbu.paisa.user;end;`;

    // Log order attempt in persistent DB
    logTransaction({
        id: TXN_REF,
        amount,
        plan,
        user: userEmail,
        userName,
        method: 'UPI'
    });

    return res.status(200).json({
        success: true,
        txnId: TXN_REF,
        upiLink: upiUri,
        gpayLink: gpayAndroidIntent,
        message: 'UPI Vector Loaded. Scan or Tap to Pay.'
    });
}
