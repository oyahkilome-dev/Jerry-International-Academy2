const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const target = `  app.get('/api/gallery', (req, res) => {
    res.json(getGalleryImages());
  });`;

const replacement = `  app.get('/api/gallery', async (req, res) => {
    const supabase = getSupabaseClient();
    if (supabase) {
      try {
        const { data, error } = await supabase.from('gallery_images').select('*').order('created_at', { ascending: false });
        if (!error && data) {
          return res.json(data);
        }
      } catch(e) {
        console.error("Error fetching gallery from Supabase", e);
      }
    }
    // Fallback to SQLite
    res.json(getGalleryImages());
  });`;

code = code.replace(target, replacement);

fs.writeFileSync('server.ts', code);
console.log("server.ts patched");
