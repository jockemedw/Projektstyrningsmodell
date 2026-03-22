# Projektportal — Kommunen × Lejonfastigheter

**Proof of concept** för en gemensam projektportal för lokalprojekt i samarbetet mellan Linköpings Kommuns förvaltningar och Lejonfastigheter.

## Om portalen

Portalen är en statisk HTML-sajt baserad på:
- Linköpings kommuns [projektportal](https://sites.google.com/linkoping.se/projektportal) (kommunens projektmodell, Wenell fas-gate v4.0 / pm3)
- Lejonfastigheters Lejonguide-processer för investeringsprojekt

## Struktur

```
/
├── index.html              # Startsida
├── css/style.css           # Gemensam styling
├── js/nav.js               # Navigation
├── images/                 # Bilder (fylls i via Playwright-skript)
├── projekt/                # Projektfaser (behov-ide, forbereda, planera, ...)
├── om-styrmodellen/        # Styrmodell, begrepp, FAQ
├── mallar/                 # Mallar och verktyg
├── lessons-learned/        # Lessons learned och retrospektiv
├── trello/                 # Trello-stöd
└── lejon/                  # Lejonfastigheter-specifika sidor
```

## GitHub Pages

Sajten publiceras via GitHub Pages:
**Settings → Pages → Deploy from branch → main → / (root)**

## Bilder (TODO)

Sidorna innehåller platshållare (`<div class="img-placeholder">`) där originalbilder från kommunens portal ska läggas in. Kör Playwright-skriptet för att ladda ned bilderna automatiskt:

```bash
# Se playwright-script.js i repots rot
npx playwright install chromium
node playwright-script.js
```

## Livesajt

https://jockemedw.github.io/Projektstyrningsmodell/

## Nästa steg

- [ ] Fyll i stubbar för Genomföra, Avsluta, Effekt, Roller
- [ ] Lägg till Trello-guiden
- [ ] Kör Playwright för att hämta bilder
- [ ] Anpassa Lejon-sektionerna på varje sida
- [ ] Lägg till Lejonfastigheters egna processsidor under `/lejon/`
