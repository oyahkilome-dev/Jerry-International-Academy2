const fs = require('fs');
let code = fs.readFileSync('src/pages/public/Gallery.tsx', 'utf8');

code = code.replace(/alt=\{\(img\.originalName \|\| img\.name\) \|\| \`Gallery \$\{idx\}\`\}/g, "alt={img.category || `Gallery ${idx}`}");
code = code.replace(/title=\{\(img\.originalName \|\| img\.name\)\}/g, "title={img.category || 'Image'}");
code = code.replace(/\{\(img\.originalName \|\| img\.name\) \|\| 'Image'\}/g, "{img.category || 'Image'}");
code = code.replace(/\{img\.description && <span className="text-white\/80 text-sm block mt-1 line-clamp-2">\{img\.description\}<\/span>\}/g, "");

fs.writeFileSync('src/pages/public/Gallery.tsx', code);
console.log("Gallery.tsx display logic patched successfully");
