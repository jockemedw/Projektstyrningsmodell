# Handover till Claude Code — Projektportal Kommunen × Lejonfastigheter

## Vad detta är

Ett proof-of-concept för en **gemensam statisk webbportal** (GitHub Pages) för lokalprojekt i samarbetet mellan Linköpings Kommuns förvaltningar och Lejonfastigheter. Portalen är en anpassad kopia av kommunens interna projektportal (sites.google.com/linkoping.se/projektportal), utökad med Lejonfastigheters egna processer och ett gemensamt varumärke.

**GitHub-repo:** https://github.com/jockemedw/Projektportal-Lejonfastigheter-Link-pings-Kommun

---

## Vad som är gjort

### Filstruktur (portal.zip, redan nedladdad)
```
portal/
├── index.html                    ✅ Klar — startsida med hero, kortnavigation, fasstrip
├── css/style.css                 ✅ Klar — komplett design, CSS-variabler, responsiv
├── js/nav.js                     ✅ Klar — mobilmeny, aktiv-markering
├── playwright-script.js          ✅ Klar — laddar ner bilder från Google Sites
├── README.md                     ✅ Klar
│
├── projekt/
│   ├── behov-ide.html            ✅ Klar — fullt innehåll + Lejon-sektion
│   ├── forbereda.html            ✅ Klar — fullt innehåll + BP1 + Lejon-sektion
│   ├── planera.html              ✅ Klar — fullt innehåll + BP2 + Lejon-sektion
│   ├── genomfora.html            🚧 Stubb
│   ├── avsluta.html              🚧 Stubb
│   ├── effekt.html               🚧 Stubb
│   ├── roller.html               🚧 Stubb
│   ├── index.html                🚧 Stubb
│   ├── diarieföring.html         🚧 Stubb
│   └── e-arkivet.html            🚧 Stubb
│
├── om-styrmodellen/
│   ├── index.html                ✅ Klar — fullt innehåll
│   ├── fragor-svar.html          🚧 Stubb
│   └── begrepp.html              🚧 Stubb
│
├── mallar/
│   └── index.html                ✅ Klar — alla mallkort, LM-sektion
│
├── lessons-learned/
│   ├── index.html                🚧 Stubb
│   ├── lessons-learned.html      🚧 Stubb
│   └── retrospektiv.html         🚧 Stubb
│
├── trello/
│   └── index.html                🚧 Stubb (12 undersidor att skapa)
│
└── lejon/
    ├── forbereda-lokal.html      🚧 Stubb — ska bli LF:s "Utreda lokalbehov"-process
    └── beslutspunkter.html       🚧 Stubb — ska bli LF:s investeringsbeslutprocess
```

---

## Design och konventioner

### Färger (CSS-variabler i style.css)
```css
--lkpg-red:     #C8102E   /* Linköpings kommunröd — primärfärg */
--lejon-orange: #E8731A   /* Lejonfastigheters orange — sekundärfärg */
--lejon-gold:   #F5A623   /* Accent i mörka sektioner */
```

### Typsnitt
- Display/rubriker: `Fraunces` (Google Fonts, serif)
- Brödtext: `DM Sans` (Google Fonts)

### Återanvändbara komponenter (CSS-klasser)
| Klass | Användning |
|---|---|
| `.phase-strip` | Fasnavigering längst upp på projektsidor |
| `.bp-card` | Beslutspunktskort (röd kant = kommunen, `.lejon` = orange) |
| `.checklist` | Checklistor med tom checkbox-ikon |
| `.lejon-section` | Orange bakgrundssektion för Lejon-specifikt innehåll |
| `.more-info` | Mörk sektion längst ned på sidan ("Jag vill veta mer") |
| `.tool-grid` / `.tool-card` | Rutnät med verktygskort |
| `.img-placeholder` | Platshållare för bilder som ska läggas in via Playwright |
| `.context-pill` | Färgade pills: `.pill-kommune`, `.pill-lejon`, `.pill-gemensam` |

### Sidmall — alla sidor följer detta mönster
```html
<nav class="top-nav">...</nav>          <!-- Samma navbar på alla sidor -->
<div class="page-wrapper">
  <aside class="sidebar">...</aside>    <!-- Kontextuell sidnavigation -->
  <main class="main-content">
    <!-- pills, h1, lead, phase-strip -->
    <!-- Kommunens originalinnehåll -->
    <div class="lejon-section">...</div>  <!-- Lejon-anpassning -->
    <div class="more-info">...</div>      <!-- Expanderat stöd, längst ned -->
  </main>
</div>
```

---

## Källor att scrapa för innehåll

Alla dessa URL:er är publikt tillgängliga (ingen inloggning krävs):

```
# Projektsidor
https://sites.google.com/linkoping.se/projektportal/projekt/genomföra
https://sites.google.com/linkoping.se/projektportal/projekt/avsluta
https://sites.google.com/linkoping.se/projektportal/projekt/effekt
https://sites.google.com/linkoping.se/projektportal/projekt/roller-i-projekt
https://sites.google.com/linkoping.se/projektportal/projekt/diarieföring
https://sites.google.com/linkoping.se/projektportal/projekt/leverans-till-e-arkivet
https://sites.google.com/linkoping.se/projektportal/projekt/delprojekt

# Om styrmodellen
https://sites.google.com/linkoping.se/projektportal/om-styrmodellen/om-styrmodellen
https://sites.google.com/linkoping.se/projektportal/om-styrmodellen/frågor-svar
https://sites.google.com/linkoping.se/projektportal/om-styrmodellen/begrepp-definitioner

# Övriga huvudsidor
https://sites.google.com/linkoping.se/projektportal/mallar-verktyg
https://sites.google.com/linkoping.se/projektportal/projekt-eller-uppdrag
https://sites.google.com/linkoping.se/projektportal/målformulering

# Lessons learned
https://sites.google.com/linkoping.se/projektportal/lessons-learned-retro/lessons-learned-retro
https://sites.google.com/linkoping.se/projektportal/lessons-learned-retro/lessons-learned
https://sites.google.com/linkoping.se/projektportal/lessons-learned-retro/retrospektiv

# Trello (12 undersidor)
https://sites.google.com/linkoping.se/projektportal/trello/inloggning
https://sites.google.com/linkoping.se/projektportal/trello/samarbeta-i-tavlor
https://sites.google.com/linkoping.se/projektportal/trello/kortkommandon
https://sites.google.com/linkoping.se/projektportal/trello/förslag-på-automationer
https://sites.google.com/linkoping.se/projektportal/trello/etiketter-och-deras-användning
https://sites.google.com/linkoping.se/projektportal/trello/lägga-till-avisering-till-google-chat
https://sites.google.com/linkoping.se/projektportal/trello/spegla-kort-mellan-trello-tavlor

# Fortbildning
https://sites.google.com/linkoping.se/projektportal/fortbildning/fortbildning
https://sites.google.com/linkoping.se/projektportal/fortbildning/chatt-nätverk
```

### Scraping-instruktion
Använd `web_fetch` eller Playwright för varje URL. Extrahera texten under `<h1>` och framåt (ignorera navbar). Strukturera om till HTML enligt sidmallen ovan. Lägg alltid till en `<div class="lejon-section">` med Lejon-anpassat innehåll baserat på projektkunskapsbasen.

---

## Bilder — Playwright-uppgift

Kör `playwright-script.js` i repots rot:
```bash
npm install playwright
npx playwright install chromium
node playwright-script.js
```

Bilderna sparas som `images/{slug}-{n}.png`. Ersätt sedan alla `<div class="img-placeholder">` med:
```html
<img src="../images/{slug}-{n}.png" alt="..." style="width:100%;border-radius:8px;margin:24px 0;">
```

---

## Lejon-specifikt innehåll att bygga

Dessa sidor har **inget original** på kommunens portal — de ska byggas från grunden baserat på Lejonfastigheters processdokumentation:

### `/lejon/forbereda-lokal.html` — Utreda lokalbehov
Basera på:
- LF-processen "Utreda möjlig lösning för lokalbehov" (PDF i projektkunskapsbasen)
- Stegen: Resurssätt projekt → Stämma av behov med avtalskund → Genomföra förstudie → Ta beslut om lösning
- Roller: Lokalstrateg, Fastighetsutvecklare, Lokalutvecklare, Lokalsamordnare (kommunen)

### `/lejon/beslutspunkter.html` — LF:s investeringsbeslut
Basera på:
- Delegeringsordningen: Fastighetsutvecklingschefens gräns = 1 Mkr
- ≤1 Mkr: kombinerat beslut och attestdelegering
- >1 Mkr: Inv.forum → VD (1–10 Mkr) eller Inv.forum → presidie → styrelse
- Den viktiga beslutspunkten mellan programhandling och systemhandling
- Hyresöverenskommelse: reglerar vad/pris/tid, binder hyresgästen

### `/lejon/processöversikt.html` — LF:s fullständiga processkedja (ny sida)
Visualisera de 7 LF-processerna som en klickbar kedja:
1. Ta fram lokalförsörjningsplan
2. Utreda möjlig lösning för lokalbehov
3. Lösa lokalbehov
4. Specificera lokal
5. Planera och projektera projekt
6. Producera
7. Lämna över lokal / Avsluta projekt

---

## GitHub Pages — aktivering

När filer är pushade:
1. Gå till repo → Settings → Pages
2. Source: Deploy from branch
3. Branch: main, folder: / (root)
4. Spara — sajten publiceras på `https://jockemedw.github.io/Projektportal-Lejonfastigheter-Link-pings-Kommun/`

---

## Prioritetsordning för fortsatt arbete

1. **Pusha portal.zip** till repot och packa upp
2. **Aktivera GitHub Pages**
3. **Kör Playwright-skriptet** för bilder
4. **Fyll i stubbar** i prioritetsordning:
   - `projekt/genomfora.html` (scrapa + Lejon-sektion om Producera-fasen)
   - `projekt/avsluta.html` (scrapa + Lejon-sektion om Lämna över lokal)
   - `projekt/roller.html` (scrapa + lägg till LF-roller)
   - `lejon/forbereda-lokal.html` (bygg från grunden)
   - `lejon/beslutspunkter.html` (bygg från grunden)
5. **Trello-sektionen** (lägre prioritet — kan läggas till sist)

---

## Projektkunskapsbas (Claude-projekt)

Det finns ett Claude-projekt med projektkunskapsbas som innehåller:
- `linkoping_projektstyrningsmodell.md` — kommunens styrmodell i markdown
- Alla BP-mallar (Word): BP1, BP2, BP4, BP5
- Mallarna: Projektdirektiv, Projektplan, Statusrapport, Slutrapport, Leveransgodkännande
- LF-processer (PDF): Startsida, Lösa lokalbehov, Utreda möjlig lösning, Specificera lokal, Planera och projektera, Producera, Lämna över lokal, Avsluta projekt
- Kommunens tillämpningsanvisning (PDF)
- Aktivitetsplan/beslutslogg (Excel)

Använd `project_knowledge_search` för att hitta innehåll när du bygger Lejon-sektionerna.
