const Database = require('better-sqlite3');
const db = new Database('data.db');
db.prepare("DELETE FROM site_content WHERE id = 'supabase_settings'").run();
