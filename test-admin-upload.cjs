const fs = require('fs');
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  
  await page.goto('http://localhost:3000/admin/login');
  await page.type('input[type="password"]', 'Micheal@22');
  await page.click('button[type="submit"]');
  await new Promise(r => setTimeout(r, 2000));
  
  fs.writeFileSync('dummy.jpg', Buffer.from('fake image data'));
  
  await page.goto('http://localhost:3000/admin/gallery');
  await new Promise(r => setTimeout(r, 2000));
  
  const fileInput = await page.$('input[type="file"]');
  if (fileInput) {
      console.log('Uploading dummy.jpg...');
      await fileInput.uploadFile('dummy.jpg');
      await new Promise(r => setTimeout(r, 5000));
      
      console.log('Upload finished. Finding delete button...');
      const btn = await page.$('button[title="Delete Permanently"]');
      if (btn) {
          await page.evaluate(el => el.scrollIntoView(), btn);
          await new Promise(r => setTimeout(r, 500));
          const box = await btn.boundingBox();
          await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
          await new Promise(r => setTimeout(r, 1000));
          
          const confirmBtn = await page.evaluateHandle(() => {
              const btns = Array.from(document.querySelectorAll('button'));
              return btns.find(b => b.textContent.includes('Delete Permanently'));
          });
          if (confirmBtn) {
              await confirmBtn.click();
              await new Promise(r => setTimeout(r, 3000));
              const html = await page.evaluate(() => document.body.innerHTML);
              console.log('Delete UI succeeded:', html.includes('Image deleted successfully.'));
          }
      }
  }
  await browser.close();
})();
