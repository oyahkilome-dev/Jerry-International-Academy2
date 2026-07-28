import('./src/db.ts').then(m => {
  const c = m.getSiteContent('supabase_settings');
  console.log(c);
});
