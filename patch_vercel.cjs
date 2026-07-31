const fs = require('fs');
let code = fs.readFileSync('vercel.json', 'utf8');

const json = JSON.parse(code);
const newRewrite = {
  source: "/api/gallery",
  destination: "/api/gallery/index"
};

// Insert before the catch-all
json.rewrites.unshift(newRewrite);

fs.writeFileSync('vercel.json', JSON.stringify(json, null, 2));
console.log("vercel.json patched");
