const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const regex = /addMedia\(\{\s+name:\s*fileName,\s+type:\s*type,\s+url:\s*publicUrl,\s+size:\s*file\.size,\s+originalName:\s*file\.originalname\s+\}\);\s+res\.json\(\{ success: true, url: publicUrl \}\);/;

const replacement = `addMedia({
        name: fileName,
        type: type,
        url: publicUrl,
        size: file.size,
        originalName: file.originalname
      });
      if (isImage) {
        try {
          addGalleryImage({ url: publicUrl, category: req.body.category || 'General' });
        } catch(e) {
          console.error("Failed to add to gallery_images", e);
        }
      }
      res.json({ success: true, url: publicUrl });`;

if (regex.test(code)) {
  code = code.replace(regex, replacement);
  fs.writeFileSync('server.ts', code);
  console.log("Successfully patched server.ts");
} else {
  console.log("Could not find the regex in server.ts");
}
