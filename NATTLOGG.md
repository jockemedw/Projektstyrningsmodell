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

**Granskarens protokoll:** 0 kritiska, 2 höga, 7 medel, 6 låga. Granskaren bekräftade att aktivering/feedback i slutdelen och navigeringen är styrkor att bevara.

| Nivå | Fynd | Åtgärd |
|---|---|---|
| HÖG | H1: Effektmål/projektmål används bärande (BP 1-checklistans första punkt) fyra avsnitt innan de definieras | ✅ "Två sorters mål"-faktaruta i BP 1-panelens sidospalt; Dokumenten blir repetition i stället för förstagångsintroduktion |
| HÖG | H2: På mobil var BP-grindarna oklickbara (dolda `.tl-gates`, bara ::after-chip) trots ingressens "klicka på en grind" | ✅ Fem riktiga BP-knappar (`.gate-mobile`) infogade mellan faserna i den staplade stegen — dolda på desktop (grid-layouten opåverkad), klickbara på mobil, synkad aria-pressed via data-key. ::after-chipen borttagna |
| MEDEL | M1: LSA/FU-uttydning dold bakom LF-toggeln | ✅ Uttydning vid första förekomst i Förbereda-panelen |
| MEDEL | M2: Lejonguide-förväxlingen och mottagare/överlämningar mättes aldrig | ✅ Två nya quizfrågor (13: Lejonguide-numreringen; 14: mottagaren tar över vid BP 4) → 14 frågor |
| MEDEL | M3: Väljaren kunde säga "tydlig behovsbild" åt den som svarat "behöver genomlysas" | ✅ Regelbaserad logik (högt svar utesluter uppgift; stor omfattning + ogenomlyst behov → projekt), förstudievariant av uppdragstexten, dynamisk drivkraftsrad |
| MEDEL | M4: Quizresultatet sa inte vad som missades | ✅ "Att repetera"-chips per missad fråga som navigerar till rätt avsnitt (in-memory, ingen lagring) |
| MEDEL | M5: Tre svarta boxar men texten sa "första och sista fasen" | ✅ Förklarande mening i Modellen-ingressen ("Även Förbereda visas i svart …") |
| MEDEL | M6: Inga lärandemål eller tidsangivelse på start | ✅ "Efter genomgången kan du …"-rad + chip "ca 25 minuter" |
| MEDEL | M7: Fyra passiva avsnitt i rad (5–8) utan kunskapskontroll | ✅ Snabbkoll-kort i Dokumenten (direktiv-/planägarskap) med lärande feedback |
| LÅG | L1: skal/kött + startsäkring oannonserade på start | ✅ "mer om det längre fram" + startsäkring förklarad som checklista |
| LÅG | L2: "beslutsloggen" före definition | ✅ Minidefinition vid båda första förekomsterna |
| LÅG | L3: Checklist-intro i 13 px versaler | ✅ Eget `.check-intro`-stycke + rubrik "Checklista — N punkter" ("Användningsfall" för BP 3) |
| LÅG | L4: Hero-meningens tre tankstreck | ✅ Omskriven till två meningar |
| LÅG | L5: Detaljpanelen scrollas inte i bild på mobil | ✅ try-kapslad `scrollIntoView` vid ≤760px |
| LÅG | L6: LM/LI/LR/LD och Antura oförklarade | ✅ Glossade i skal/kött-kortet |

**Medvetet lämnat:** quizets redundans (Q3/Q4, Q5/Q12) behölls — frågorna mäter olika låsta fakta (dokumentägarskap resp. direktivfrysning; förstudie-som-uppdrag resp. uppdragets faser).
**Regressionssviten:** +20 kontroller (mobilgrindar, snabbkoll, väljarregler, repetitionschips, QSEC-validering, måldefinition i BP 1) → 149, grön.

## Iteration 3 — granskare: UX (mobil + sandlådad artefaktvisare)

**Granskarens protokoll:** 0 kritiska, 2 höga, 5 medel, 6 låga. Sandlådedisciplinen bedömdes "exemplarisk" — alla history/scroll/fokus-anrop verifierat try-kapslade, inga lagrings-/parent-/nätverksanrop, ljust-tema-skyddet heltäckande. (Första granskningsförsöket fick timeout utan leverans och kördes om med stramare uppdrag.)

| Nivå | Fynd | Åtgärd |
|---|---|---|
| HÖG | H1: Checklistan re-renderades per kryss → fokus föll till body (oanvändbart med tangentbord), progressbaren nollställdes | ✅ Inkrementell DOM-uppdatering: togglar `.done` på raden, uppdaterar progressbredd och klart-meddelande direkt. Ingen `innerHTML`-omskrivning |
| HÖG | H2: Mellanbredd 761–900px klippte fas-/BP-etiketter (surfplatta, delad skärm i Teams) | ✅ Mellanbrytpunkt `@media(max-width:1000px) and (min-width:761px)`: `clamp()`-skalad fastext, mindre gate-label. Desktop ≥1000px pixelidentisk (faktalåsning 1 respekterad) |
| MEDEL | M1: Touch-ytor under ~44px (chips, copt/sopt, toggle, reset) | ✅ Ökad vertikal padding i mobilbrytpunkten |
| MEDEL | M2: Quizfokus strandade två gånger per fråga | ✅ Fokus → "Nästa fråga" efter svar; → frågerubriken (tabindex -1) vid ny fråga |
| MEDEL | M3: Sticky topnav + slide-nav åt ~22% av mobilskärmen | ✅ Brandtexten döljs ≤760px (titeln finns i `document.title`) — topnav blir en rad |
| MEDEL | M4: Dolda scrolllister utan affordans (BP-flikar, chips) | ✅ Fade-mask (`mask-image`) på `.steps`/`.bp-tabs` i mobilläget |
| MEDEL | M5: JS smooth-scroll ignorerade prefers-reduced-motion | ✅ `motionOK`-flagga; båda `scrollIntoView` villkorar `'smooth'`/`'auto'` |
| LÅG | L1: title-tooltips utan touch-motsvarighet | ⏸ Lämnat — samma info finns i detaljpanelen efter klick (granskaren bedömde förlusten "begränsad") |
| LÅG | L2: mobila BP-knappar saknade BP-nr i tillgängligt namn | ✅ `aria-label="Beslutspunkt N — …"` på alla fem |
| LÅG | L3: globala piltangenter krockade med qnext/reset/chips | ✅ Guard utökad till alla interaktiva kontroller (rubriker undantagna) |
| LÅG | L4: check-done-msg annonserades inte (byggdes färdig) | ✅ Löst av H1 — meddelandet togglas nu på en bestående live-region |
| LÅG | L5: hint-texten nämnde "BP-cirklar" som är dolda på mobil | ✅ "faserna och beslutspunkterna" |
| LÅG | L6: tablist utan roving tabindex (fem tabbstopp) | ✅ Bara vald flik i tabordningen |

**Medvetet lämnat:** L1 (se ovan). Värdvyns egen scrollbar i mörkt apptema ligger utanför sidans kontroll (granskarens egen notis, ej fynd).
**Regressionssviten:** +17 kontroller (inkrementell checklista, quizfokus, motionOK, mellanbrytpunkt, roving tabindex, mobil-aria, piltangentsguard) → 166, grön.

## Iteration 4 — granskare: tillgänglighet (WCAG)

_(pågår)_
