const fs = require('fs');
const file = '/app/applet/src/db.ts';
let content = fs.readFileSync(file, 'utf8');

const target = `const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Vercel serverless functions have a read-only filesystem except for /tmp
const dbPath = process.env.VERCEL ? path.join('/tmp', 'data.db') : path.join(__dirname, '../data.db');`;

const replacement = `let _dirname = '';
try {
  _dirname = process.env.VERCEL ? '/tmp' : path.dirname(fileURLToPath(import.meta.url));
} catch (e) {
  _dirname = process.cwd();
}

// Vercel serverless functions have a read-only filesystem except for /tmp
const dbPath = process.env.VERCEL ? path.join('/tmp', 'data.db') : path.join(_dirname, '../data.db');`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(file, content);
  console.log('Patched db.ts for ESM/CJS compat');
} else {
  console.log('Target not found in db.ts');
}
