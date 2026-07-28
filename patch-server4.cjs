const fs = require('fs');
const file = '/app/applet/server.ts';
let content = fs.readFileSync(file, 'utf8');

const target = `const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);`;

const replacement = `// ESM / CJS compat
let _dirname = process.cwd();
try {
  _dirname = path.dirname(fileURLToPath(import.meta.url));
} catch (e) {}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  
  // Also need to replace usages of __dirname with _dirname if any
  content = content.replace(/__dirname/g, '_dirname');
  
  fs.writeFileSync(file, content);
  console.log('Patched server.ts for ESM/CJS compat');
} else {
  console.log('Target not found in server.ts');
}
