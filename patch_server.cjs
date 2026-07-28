const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');
code = code.replace(`  app.post('/api/admin/media', verifyToken, (req, res) => {
    try {
      addMedia(req.body);
      res.json({ success: true });
    } catch(err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  });`, `  app.post('/api/admin/media', verifyToken, (req, res) => {
    try {
      addMedia(req.body);
      const isImage = req.body.type === 'image' || (req.body.url && req.body.url.match(/\\.(jpg|jpeg|png|gif|webp)$/i));
      if (isImage) {
        addGalleryImage({ url: req.body.url, category: req.body.category || 'General' });
      }
      res.json({ success: true });
    } catch(err) {
      console.error(err);
      res.status(500).json({ success: false });
    }
  });`);
fs.writeFileSync('server.ts', code);
