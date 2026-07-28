import('./src/db.ts').then(m => {
  m.default.prepare("DELETE FROM site_content WHERE id = 'supabase_settings'").run();
  console.log('Deleted fake supabase settings');
});
