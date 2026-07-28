const Database = require('better-sqlite3');
const db = new Database('data.db.bak');
const row = db.prepare("SELECT data FROM site_content WHERE id = 'supabase_settings'").get();
console.log(row ? row.data : 'Not found');
