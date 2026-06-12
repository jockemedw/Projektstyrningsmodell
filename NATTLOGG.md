# Nattlogg — obevakad kvalitetshöjning av projektstyrningsmodellen-interaktiv.html

**Körning:** 2026-06-12/13 · **Iterationstak:** 7 (6 granskarperspektiv + 1 ev. extra verifieringsrunda)
**Stoppvillkor:** två på varandra följande granskningar utan fynd över nivå LÅG, eller granskarbedömning om avtagande värde.

## Sammanfattning (fylls i sist)

_(De fem viktigaste förbättringarna och kvarvarande svagheter — se slutet av körningen.)_

---

## Iteration 0 — baslinje

**Byggt:** Regressionssvit `tests/regression.js` (jsdom, 110 kontroller): sandlådesäkerhet (ingen webblagring, try-kapslade history/scroll-anrop, `.bg-fix`, `color-scheme: only light`), faktalåsningar (fasfärger, BP 3 valfri, 13 startsäkringspunkter, BP 5 = styrgruppen, LF-mappningens placeringar, tre överlämningar, inga varianter A/B) samt samtliga interaktiva flöden (slides-navigering, tidslinje, BP-flikar/checklistor, väljaren, roller, missförstånd, scenarier, quiz inkl. fel-/rätt-vägar och omstart). Grön.

## Iteration 1 — byggarpass: tillgänglighet · granskare: domänexpert

**Byggt (före granskning):**
- Kapitelchips omgjorda från ofullständigt `role="tablist"`-mönster till `<nav>` med `aria-current="step"` (sattes tidigare till strängen `"false"`, vilket är ogiltigt).
- BP-flikarna fick `id` + `aria-controls`; panelen `tabindex="0"` och dynamisk `aria-labelledby`.
- `role="status"` på quiz- och scenarioförklaringar, väljarresultat, checklistans klart-meddelande och scenariopoängen — skärmläsare får nu feedbacken uppläst.
- Dekorativa element (callout-emoji, progressbar, detaljpanelens färgprick, krysset i missförstånds-korten, chipnummer) `aria-hidden`.
- Sviten utökad till 122 kontroller. Grön.

**Granskarens protokoll (domänexpert):** _(pågår)_
