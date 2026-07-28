const fs = require('fs');

let code = fs.readFileSync('src/App.tsx', 'utf8');
if (!code.includes("import React")) {
    code = "import React from 'react';\n" + code;
    fs.writeFileSync('src/App.tsx', code);
}

let code2 = fs.readFileSync('src/components/layout/AdminLayout.tsx', 'utf8');
if (!code2.includes("import React")) {
    code2 = "import React from 'react';\n" + code2;
    fs.writeFileSync('src/components/layout/AdminLayout.tsx', code2);
}
console.log('patched react imports');
