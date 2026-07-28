const fs = require('fs');
const file = '/app/applet/server.ts';
let content = fs.readFileSync(file, 'utf8');

// Remove static import
content = content.replace("import { createServer as createViteServer } from 'vite';\n", "");

// Replace dynamic usage
const target = `const vite = await createViteServer({`;
const replacement = `const vitePath = 'vite';
      const viteModule = await import(vitePath);
      const vite = await viteModule.createServer({`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(file, content);
  console.log('Patched server.ts to hide vite from Vercel NFT');
} else {
  console.log('Target not found in server.ts');
}
