const fs = require('fs');
let code = fs.readFileSync('api/admin/media/upload.ts', 'utf8');

const target = `        // Also add to gallery if it's an image
        if (isImage) {
            addGalleryImage({
                url: urlData.publicUrl,
                category: body.category || 'General'
            });
        }`;

const replacement = `        // Also add to gallery if it's an image
        if (isImage) {
            try {
              const { error: dbError } = await supabase.from('gallery_images').insert([
                { url: urlData.publicUrl, category: body.category || 'General' }
              ]);
              if (dbError) console.error("Error inserting into Supabase gallery_images:", dbError);
            } catch (err) {
              console.error("Failed to insert into Supabase gallery_images", err);
            }
            
            // Also write to local SQLite just in case
            try {
              addGalleryImage({
                  url: urlData.publicUrl,
                  category: body.category || 'General'
              });
            } catch (e) {
              console.error("Local SQLite error", e);
            }
        }`;

code = code.replace(target, replacement);

fs.writeFileSync('api/admin/media/upload.ts', code);
console.log("upload.ts patched successfully");
