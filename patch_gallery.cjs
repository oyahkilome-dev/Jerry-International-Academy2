const fs = require('fs');
let code = fs.readFileSync('src/pages/public/Gallery.tsx', 'utf8');

const target = `  useEffect(() => {
    fetch('/api/media')
      .then(res => res.json())
      .then(data => {
        const imageMedia = data.filter((m: any) => m.type === 'image');
        const videoMedia = data.filter((m: any) => m.type === 'video');
        setImages(imageMedia);
        setVideos(videoMedia);
      })
      .catch(console.error);
  }, []);`;

const replacement = `  useEffect(() => {
    fetch('/api/gallery')
      .then(res => res.json())
      .then(data => {
        setImages(data || []);
      })
      .catch(console.error);

    fetch('/api/media')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          const videoMedia = data.filter((m: any) => m.type === 'video');
          setVideos(videoMedia);
        }
      })
      .catch(console.error);
  }, []);`;

// Remove all whitespace to compare because formatting might differ
const normalize = (str) => str.replace(/\s+/g, '');

const normalizedCode = normalize(code);
const normalizedTarget = normalize(target);

if (normalizedCode.includes(normalizedTarget)) {
  // We need to do a manual replacement since exact match failed
  // Let's just find the start and end of useEffect
  const startIndex = code.indexOf('useEffect(() => {');
  const endIndex = code.indexOf('}, []);', startIndex) + 7;
  
  if (startIndex !== -1 && endIndex !== -1) {
    code = code.substring(0, startIndex) + replacement + code.substring(endIndex);
    fs.writeFileSync('src/pages/public/Gallery.tsx', code);
    console.log("Gallery.tsx patched successfully by index");
  } else {
    console.log("Could not find start/end index");
  }
} else {
  console.log("Target not found in code");
}
