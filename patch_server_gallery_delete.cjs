const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const target = `  app.delete('/api/admin/gallery/:id', verifyToken, (req, res) => {
    deleteGalleryImage(Number(req.params.id));
    res.json({ success: true });
  });`;

const replacement = `  app.delete('/api/admin/gallery/:id', verifyToken, async (req, res) => {
    try {
      const id = req.params.id;
      const settings = getSupabaseSettings();
      const supabase = getSupabaseClient();
      const bucketName = settings.bucket || 'media';
      const serviceRoleKey = settings.serviceRoleKey;

      if (supabase && serviceRoleKey) {
        const adminSupabase = createClient(settings.url, serviceRoleKey);
        
        // 1. Get the image URL from gallery_images
        const { data: imgData, error: fetchError } = await adminSupabase
          .from('gallery_images')
          .select('url')
          .eq('id', id)
          .single();

        if (!fetchError && imgData && imgData.url) {
          const imageUrl = imgData.url;
          const urlParts = imageUrl.split(\`/\${bucketName}/\`);
          if (urlParts.length === 2) {
            const filePath = urlParts[1];
            
            // 2. Delete from Storage FIRST to prevent orphaned files
            const { error: storageError } = await adminSupabase.storage
              .from(bucketName)
              .remove([filePath]);

            if (storageError) {
              console.error('Storage deletion failed:', storageError);
              return res.status(500).json({ success: false, message: 'Failed to delete file from storage.' });
            }
            
            // 3. Delete from Database
            const { error: dbError } = await adminSupabase
              .from('gallery_images')
              .delete()
              .eq('id', id);
              
            if (dbError) {
              console.error('Database deletion failed:', dbError);
            }
          }
        }
      }

      // SQLite fallback / cleanup
      try {
        deleteGalleryImage(Number(id));
      } catch (e) {}

      res.json({ success: true });
    } catch (err: any) {
      console.error('Delete Error:', err);
      res.status(500).json({ success: false, message: err.message || 'Delete failed' });
    }
  });`;

if (code.includes(target)) {
  code = code.replace(target, replacement);
  fs.writeFileSync('server.ts', code);
  console.log("server.ts delete gallery patched");
} else {
  console.log("Could not find the target string in server.ts");
}
