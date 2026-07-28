const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const startStr = '// --- SUPABASE MOCK INTERCEPTOR ---';
const endStr = '// ---------------------------------\n';

const startIdx = code.indexOf(startStr);
const endIdx = code.indexOf(endStr);

if (startIdx !== -1 && endIdx !== -1) {
    code = code.substring(0, startIdx) + code.substring(endIdx + endStr.length);
    fs.writeFileSync('server.ts', code);
    console.log('Mock removed.');
} else {
    console.log('Mock not found.');
}
