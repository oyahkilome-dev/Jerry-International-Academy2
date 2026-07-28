import('./src/db.ts').then(m => {
  const media = m.getMedia();
  console.log("Database records:");
  media.forEach(m => {
    console.log(`ID: ${m.id} | Name: ${m.name} | URL: ${m.url}`);
  });
});
