const fs = require('fs');
const file = '/app/applet/src/db.ts';
let content = fs.readFileSync(file, 'utf8');

const target = `const dbPath = path.join(__dirname, '../data.db');`;
const replacement = `// Vercel serverless functions have a read-only filesystem except for /tmp
const dbPath = process.env.VERCEL ? path.join('/tmp', 'data.db') : path.join(__dirname, '../data.db');`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(file, content);
  console.log('Patched src/db.ts');
} else {
  console.log('Target not found in src/db.ts');
}
