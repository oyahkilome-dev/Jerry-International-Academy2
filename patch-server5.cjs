const fs = require('fs');
const file = '/app/applet/server.ts';
let content = fs.readFileSync(file, 'utf8');

// Add import db
content = content.replace(
  "import { getSiteContent",
  "import db, { getSiteContent"
);

// Replace dynamic import
const target = `import('./src/db.js').then((module) => {
        module.default.prepare('UPDATE media SET originalName = ?, name = ? WHERE id = ?').run(req.body.name, req.body.name, Number(req.params.id));
        res.json({ success: true });
      });`;
      
const replacement = `db.prepare('UPDATE media SET originalName = ?, name = ? WHERE id = ?').run(req.body.name, req.body.name, Number(req.params.id));
      res.json({ success: true });`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(file, content);
  console.log('Patched server.ts to use static db import');
} else {
  console.log('Target not found for dynamic db import replacement');
}
