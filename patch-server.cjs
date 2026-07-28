const fs = require('fs');
const file = '/app/applet/server.ts';
let content = fs.readFileSync(file, 'utf8');

const target = `  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(\`Server listening on port \${PORT}\`);
  });
}

startServer();`;

const replacement = `  // On Vercel, we export the app instead of listening
  if (process.env.VERCEL) {
    return app;
  }

  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(\`Server listening on port \${PORT}\`);
  });
}

const appPromise = startServer();
export default async function (req, res) {
  const app = await appPromise;
  return app(req, res);
}`;

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(file, content);
  console.log('Patched server.ts');
} else {
  console.log('Target not found in server.ts');
}
