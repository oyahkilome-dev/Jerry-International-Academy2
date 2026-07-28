import('./src/db.ts').then(m => {
  m.setSiteContent('supabase_settings', null); // Or just run delete
});
