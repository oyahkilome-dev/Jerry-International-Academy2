const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf8');

const target = `          const urlParts = imageUrl.split(\`/\${bucketName}/\`);
          if (urlParts.length === 2) {
            const filePath = urlParts[1];`;

const replacement = `          const bucketPath = \`/\${bucketName}/\`;
          const bucketIndex = imageUrl.indexOf(bucketPath);
          if (bucketIndex !== -1) {
            const filePath = imageUrl.substring(bucketIndex + bucketPath.length);`;

code = code.replace(target, replacement);

fs.writeFileSync('server.ts', code);
console.log("server.ts fixed split logic");
