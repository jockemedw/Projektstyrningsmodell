# Claude Code — Designfix & Integration av Implementeringsplan

## Bakgrund

Projektportalen på https://jockemedw.github.io/Projektstyrningsmodell/index.html
har ett designproblem: färgtemat matchar inte de faktiska varumärkesfärgerna för
Linköpings Kommun och Lejonfastigheter. En separat presentationsfil
(`implementering-presentation.html`) ska dessutom integreras som första flik i portalen.

---

## Del 1 — Rätt varumärkesfärger (kritisk fix)

Besök https://linkoping.se och https://lejonfastigheter.se och verifiera, men
baserat på analys ska dessa CSS-variabler gälla i hela projektet:

```css
/* Linköpings Kommun */
--lk-teal:        #1B5E5A;   /* Primär petrolgrön — INTE röd, INTE blå */
--lk-teal-light:  #2A9490;   /* Ljusare teal för accenter */
--lk-yellow:      #EDD800;   /* Lime-gul accent */

/* Lejonfastigheter */
--lf-teal:        #1A3A4A;   /* Mörkblå/navy bas */
--lf-yellow:      #F0B400;   /* Amber-gul — LF:s starka accent */
--lf-yellow-light:#F5CA3A;

/* Bakgrunder (portalens ljusa tema) */
--bg-white:  #FFFFFF;
--bg-light:  #F4F6F5;        /* Ljust grå-grön ton */
--bg-section:#E8F0EF;        /* Svagt teal-tonad sektion */

/* Text */
--text-dark:   #1A2428;
--text-body:   #3A4A50;
--text-muted:  #6A7E84;
```

**VIKTIGT:** Kommunen har INGEN röd färg i sin identitet. Om röd/vinröd (#8B1A2C
eller liknande) finns någonstans i CSS:en — ta bort det omedelbart.

---

## Del 2 — Typografi

Byt ut generiska fonter (Inter, Arial, system-ui) mot:

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:wght@300;400;500&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet">
```

```css
--font-display: 'Playfair Display', Georgia, serif;   /* Rubriker */
--font-body:    'DM Sans', sans-serif;                /* Brödtext */
--font-mono:    'DM Mono', monospace;                 /* Etiketter, koder */
```

Rubriker (h1–h3) ska använda `font-family: var(--font-display)`.

---

## Del 3 — Lejonfastigheter-sektioner

Alla sektioner/block som markerar "Lejonfastigheter-innehåll" ska följa detta mönster:

```css
.lejon-section {
  background: linear-gradient(135deg, rgba(240,180,0,0.07) 0%, transparent 100%);
  border-left: 3px solid var(--lf-yellow);
  border-radius: 0 8px 8px 0;
  padding: 20px 24px;
  margin: 24px 0;
}

.lejon-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 3px 10px;
  border-radius: 100px;
  background: rgba(240,180,0,0.12);
  color: #C8960A;
  border: 1px solid rgba(240,180,0,0.35);
  margin-bottom: 10px;
}
```

Kommunsektioner (om sådana behövs) använder `--lk-teal` istället.

---

## Del 4 — Navigation: lägg till "Implementeringsplan" som FÖRSTA flik

Lägg till en ny flik i nav-listan **före alla andra**. Den ska vara visuellt distinkt
— tydligt markerad som en "special"-flik, inte en vanlig sida.

### I `nav` HTML (alla sidor — nav är troligtvis i en delad komponent eller
måste kopieras till varje fil):

```html
<!-- LÄGG TILL SOM FÖRSTA LÄNK I NAV-LISTAN -->
<li class="nav-item-special">
  <a href="/Projektstyrningsmodell/implementering.html" class="nav-link-special">
    <span class="nav-special-dot"></span>
    Implementeringsplan
  </a>
</li>
```

### CSS för special-fliken:

```css
.nav-item-special .nav-link-special {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(240,180,0,0.12);
  border: 1px solid rgba(240,180,0,0.35);
  border-radius: 100px;
  padding: 5px 14px;
  color: #C8960A;
  font-family: var(--font-mono, monospace);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.2s, color 0.2s;
}

.nav-item-special .nav-link-special:hover {
  background: rgba(240,180,0,0.22);
  color: var(--lf-yellow, #F0B400);
}

.nav-special-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: var(--lf-yellow, #F0B400);
  flex-shrink: 0;
  animation: dotPulse 2s infinite;
}

@keyframes dotPulse {
  0%, 100% { opacity: 0.6; }
  50%       { opacity: 1; box-shadow: 0 0 6px rgba(240,180,0,0.6); }
}
```

---

## Del 5 — Skapa `implementering.html` i roten

Kopiera innehållet från filen `implementering-presentation.html`
(som finns i `/mnt/user-data/outputs/implementering-presentation.html` eller
som bifogas separat) till:

```
/Projektstyrningsmodell/implementering.html
```

**OBS:** Filen är en self-contained scrollande HTML-presentation med egna
CSS-variabler och JavaScript. Den ska INTE använda portalens `style.css`.
Behåll allt inline `<style>` som det är. Byt bara ut eventuella relativa
länkvägar om sådana finns.

Lägg till en diskret "tillbaka till portalen"-länk högst upp i filen:

```html
<!-- Lägg till direkt efter <body>-taggen, före <div id="progress"> -->
<a href="/Projektstyrningsmodell/index.html" style="
  position: fixed;
  bottom: 32px; right: 32px;
  z-index: 200;
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(26,58,74,0.85);
  border: 1px solid rgba(240,180,0,0.3);
  color: rgba(240,180,0,0.8);
  font-family: 'DM Mono', monospace;
  font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
  padding: 10px 18px; border-radius: 100px;
  text-decoration: none;
  backdrop-filter: blur(8px);
  transition: all 0.2s;
">← Tillbaka till portalen</a>
```

---

## Del 6 — Startsidans hero-sektion (index.html)

Lägg till en "Ny i portalen"-banner under hero-rubriken som leder till
implementeringsplanen:

```html
<div class="impl-banner">
  <span class="impl-banner-dot"></span>
  <span>Nytt: </span>
  <a href="/Projektstyrningsmodell/implementering.html">
    Läs om implementeringsplanen för Lejonet × Kommunen →
  </a>
</div>
```

```css
.impl-banner {
  display: inline-flex; align-items: center; gap: 8px;
  background: rgba(240,180,0,0.08);
  border: 1px solid rgba(240,180,0,0.25);
  border-radius: 100px;
  padding: 7px 16px;
  font-size: 13px; color: var(--text-muted);
  margin-bottom: 20px;
}

.impl-banner a { color: #C8960A; text-decoration: none; font-weight: 500; }
.impl-banner a:hover { text-decoration: underline; }

.impl-banner-dot {
  width: 7px; height: 7px; border-radius: 50%;
  background: var(--lf-yellow, #F0B400); flex-shrink: 0;
}
```

---

## Sammanfattning av ändringsordning

1. **Uppdatera CSS-variabler** — ta bort röd, sätt korrekta LK/LF-färger
2. **Lägg till Google Fonts** — Playfair Display + DM Sans + DM Mono
3. **Uppdatera typografi-regler** — h1-h3 till Playfair Display
4. **Fixa Lejonfastigheter-sektioner** — konsekvent badge + border-left-stil
5. **Uppdatera nav** i ALLA HTML-filer — lägg till special-fliken som #1
6. **Skapa implementering.html** i roten med presentationsinnehållet
7. **Lägg till impl-banner** på index.html
8. **Commit och push** till main — GitHub Pages uppdateras automatiskt

---

## Verifiering

Efter push, besök dessa URLs och kontrollera:
- https://jockemedw.github.io/Projektstyrningsmodell/index.html
  → Korrekt teal-grön nav, amber-gul LF-accenter, implementeringsbanner synlig
- https://jockemedw.github.io/Projektstyrningsmodell/implementering.html
  → Mörk scrollande presentation, "Tillbaka"-knapp nere till höger
- https://jockemedw.github.io/Projektstyrningsmodell/om-styrmodellen/index.html
  → LF-sektioner med gul border-left, korrekt typografi
