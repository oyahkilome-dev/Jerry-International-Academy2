import('./src/db.ts').then(m => {
  m.setSiteContent('supabase_settings', {
    url: 'https://umpxxwnhcpvkshfhfkid.supabase.co',
    anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_anon_key',
    serviceRoleKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.dummy_service_role',
    bucket: 'media'
  });
});
