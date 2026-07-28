const fs = require('fs');
const buffer = fs.readFileSync('data.db.bak');
const text = buffer.toString('utf8');
const idx = text.indexOf('supabase_settings');
if (idx !== -1) {
    console.log(text.substring(Math.max(0, idx - 50), idx + 500).replace(/[^\x20-\x7E]/g, ''));
} else {
    console.log('Not found');
}
