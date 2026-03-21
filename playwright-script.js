/**
 * playwright-script.js
 * Laddar ner alla bilder från kommunens projektportal
 * 
 * Kör: node playwright-script.js
 * Kräver: npm install playwright
 *         npx playwright install chromium
 */

const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const https = require('https');

const PAGES = [
  { url: 'https://sites.google.com/linkoping.se/projektportal/om-portalen',           slug: 'om-portalen' },
  { url: 'https://sites.google.com/linkoping.se/projektportal/om-styrmodellen',       slug: 'om-styrmodellen' },
  { url: 'https://sites.google.com/linkoping.se/projektportal/projekt/behovidé',      slug: 'behov-ide' },
  { url: 'https://sites.google.com/linkoping.se/projektportal/projekt/förbereda',     slug: 'forbereda' },
  { url: 'https://sites.google.com/linkoping.se/projektportal/projekt/planera',       slug: 'planera' },
  { url: 'https://sites.google.com/linkoping.se/projektportal/projekt/genomföra',     slug: 'genomfora' },
  { url: 'https://sites.google.com/linkoping.se/projektportal/projekt/avsluta',       slug: 'avsluta' },
  { url: 'https://sites.google.com/linkoping.se/projektportal/projekt/effekt',        slug: 'effekt' },
  { url: 'https://sites.google.com/linkoping.se/projektportal/projekt/roller-i-projekt', slug: 'roller' },
  { url: 'https://sites.google.com/linkoping.se/projektportal/mallar-verktyg',        slug: 'mallar' },
  { url: 'https://sites.google.com/linkoping.se/projektportal/lessons-learned-retro/lessons-learned', slug: 'lessons-learned' },
  { url: 'https://sites.google.com/linkoping.se/projektportal/lessons-learned-retro/retrospektiv',    slug: 'retrospektiv' },
];

const IMG_DIR = path.join(__dirname, 'images');
if (!fs.existsSync(IMG_DIR)) fs.mkdirSync(IMG_DIR, { recursive: true });

function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, res => {
      res.pipe(file);
      file.on('finish', () => { file.close(); resolve(); });
    }).on('error', err => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const allImages = [];

  for (const page of PAGES) {
    console.log(`\n📄 Hämtar bilder från: ${page.slug}`);
    const p = await context.newPage();
    
    try {
      await p.goto(page.url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Hitta alla img-taggar
      const imgSrcs = await p.$$eval('img', imgs =>
        imgs
          .map(img => img.src)
          .filter(src => src && src.startsWith('https://lh3.googleusercontent.com'))
      );

      console.log(`  → Hittade ${imgSrcs.length} bilder`);

      for (let i = 0; i < imgSrcs.length; i++) {
        const filename = `${page.slug}-${i + 1}.png`;
        const dest = path.join(IMG_DIR, filename);
        try {
          await downloadImage(imgSrcs[i], dest);
          console.log(`  ✅ Sparad: images/${filename}`);
          allImages.push({ page: page.slug, index: i + 1, file: filename, url: imgSrcs[i] });
        } catch (e) {
          console.log(`  ❌ Misslyckades: ${e.message}`);
        }
      }
    } catch (e) {
      console.log(`  ⚠️  Kunde inte ladda sidan: ${e.message}`);
    }
    
    await p.close();
  }

  await browser.close();

  // Spara en manifest-fil
  fs.writeFileSync(
    path.join(IMG_DIR, 'manifest.json'),
    JSON.stringify(allImages, null, 2)
  );

  console.log(`\n✨ Klart! ${allImages.length} bilder nedladdade till /images/`);
  console.log('   Se images/manifest.json för en lista över alla bilder.');
})();
