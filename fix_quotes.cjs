const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/GalleryManager.tsx', 'utf8');

code = code.replace(/\\`\/api\\\/admin\\\/gallery\\\/\\\$\{id\}\\`/g, "`/api/admin/gallery/${id}`");
// Wait, looking at the error output, it says: fetch(\`/api/admin/gallery/\${id}\`
// So it actually contains `\`/api/admin/gallery/\${id}\``
code = code.replace(/\\\`/g, '`');
code = code.replace(/\\\$/g, '$');

fs.writeFileSync('src/pages/admin/GalleryManager.tsx', code);
