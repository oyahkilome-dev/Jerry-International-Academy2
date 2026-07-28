import('./src/db.ts').then(m => {
  const media = m.getMedia();
  console.log(media);
});
