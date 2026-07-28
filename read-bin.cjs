const fs = require('fs');
const buffer = fs.readFileSync('data.db.bak');
const text = buffer.toString('utf8');
const regex = /{"url":"https:\/\/[^"]+","anonKey":"[^"]+","serviceRoleKey":"[^"]+"/g;
const matches = text.match(regex);
if (matches) {
  console.log('Matches:', matches);
} else {
  console.log('No matches found.');
  // search for supabase_settings
  const idx = text.indexOf('supabase_settings');
  if (idx !== -1) {
    console.log('Found supabase_settings at', idx);
    console.log(text.substring(idx, idx + 1000).replace(/[^\x20-\x7E]/g, ''));
  }
}
