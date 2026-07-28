const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  await page.goto('http://localhost:3000/admin/login');
  await page.type('input[type="password"]', 'Micheal@22');
  await page.click('button[type="submit"]');
  await new Promise(r => setTimeout(r, 2000));
  await page.goto('http://localhost:3000/admin/settings');
  await new Promise(r => setTimeout(r, 2000));
  
  // check settings values
  const html = await page.evaluate(() => document.body.innerHTML);
  if (html.includes('umpxxwnhcpvkshfhfkid.supabase.co')) {
      console.log('Found real url in settings UI!');
  } else {
      console.log('Did not find real url in settings UI. Look for input values:');
      const inputs = await page.evaluate(() => {
          return Array.from(document.querySelectorAll('input')).map(i => i.value).filter(v => v.includes('supabase'));
      });
      console.log(inputs);
  }
  
  await browser.close();
})();
