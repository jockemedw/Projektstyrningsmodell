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

**Granskarens protokoll (domänexpert):** 1 kritiskt, 2 höga, 6 medel, 4 låga fynd. Kärnfakta (13-punkterslistan, BP-obligatorium, LF-mappningen, tre överlämningar, BP-positionerna i tidslinjen) verifierades utan anmärkning.

| Nivå | Fynd | Åtgärd |
|---|---|---|
| KRITISK | K1: Ingresserna i Modellen + Beslutspunkterna sa "vid varje BP beslutar beställaren" — motsäger faktalåsning 2 (BP 5 = styrgruppen) och sidans eget quizfacit | ✅ Båda ingresserna omskrivna: "Vid BP 1–4 beslutar beställaren … vid BP 5 styrgruppen" |
| HÖG | H1: Rollkortet Styrgrupp: "Fastställer projektplanen" — kolliderar med att BP 2-beslutet är beställarens | ✅ Ändrat till "Ställer sig bakom projektplanen inför beställarens BP 2-beslut" |
| HÖG | H2: Tre ställen sa att styrgruppen "godkänner leveransen" vid BP 5 — blandar ihop BP 4 och BP 5 | ✅ "Slutrapporten" på alla tre ställena + förtydligande i quizfacit ("leveransen godkändes redan vid BP 4") |
| MEDEL | M1: "Planera — förberedelsefasen" krockar med Förbereda | ✅ "Planera — planeringsfasen" |
| MEDEL | M2: LSA ↔ beställaren oförklarat (vem tar fram direktivet?) | ✅ Förklarande bisats i Förbereda-panelen + fråga 1 i FRAGOR.md |
| MEDEL | M3: Scenario 4: "projektchefen ska fatta beslut" om kontrakt (fel beslutsfattare, okänd roll) | ✅ Neutralt: "beslut ska nu fattas" |
| MEDEL | M4: Quiz 1-distraktorn "Mottagaren" gjordes rimlig av ho-kort 3/scenario 6 | ✅ Båda texterna preciserade: förvaltningen utför, ansvaret för effektmålen är beställarens |
| MEDEL | M5: Styrgrupp "Obligatorisk" + not om när den saknas såg motsägelsefullt ut | ✅ Noten preciserad: obligatorisk i projekt, vid behov i uppdrag |
| MEDEL | M6: Förbereda i modellen men projektet finns först vid BP 1 — nyansen oförklarad | ✅ "Observera"-mening tillagd i Förbereda-panelen |
| LÅG | L1: "Wenells G1–G5" — obelagd attribution | ✅ Bisatsen struken + fråga 2 i FRAGOR.md |
| LÅG | L2: "Inhyrning" oförklarad i fotnoten | ✅ Tillagd + fråga 3 i FRAGOR.md |
| LÅG | L3: Dubbel "ansvarsövergång" BP 4/BP 5 utan objekt | ✅ Preciserat: leveransen (BP 4) resp. kvarvarande projektansvar (BP 5) |
| LÅG | L4: Ciceron-callouten kommunintern utan LF-kontext | ✅ Inramad som kommunens krav + fråga 4 i FRAGOR.md |

**Medvetet lämnat:** inget — samtliga fynd åtgärdades (de fyra med kvarstående osäkerhet loggades dessutom i FRAGOR.md).
**Regressionssviten:** utökad med 7 låsningskontroller för K1/H1/H2/M3 → 129 kontroller, grön.

## Iteration 2 — granskare: pedagog/instruktionsdesigner

_(pågår)_
