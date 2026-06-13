# Handover: Interaktiv utbildning i projektstyrningsmodellen

**Från:** Claude.ai-session med Joakim, 2026-06-13
**Artefakt:** `projektstyrningsmodellen-interaktiv.html` — en (1) självständig HTML-fil. Detta är hela kodbasen.

## Vad produkten är

En interaktiv e-learning-sida som lär Lejonfastigheters (LF) medarbetare Linköpings kommuns projektstyrningsmodell (byggd på Wenell 4.0). Kommunens förvaltningar — LF:s beställare — är tvingade att använda modellen; LF inför den frivilligt som gemensamt gränssnitt. Sidan ska ge kollegorna ett gemensamt språk: faser, beslutspunkter (BP 1–5), roller, dokument, och översättningen till LF:s byggprocess.

Målgrupp: fastighetsutvecklare, projektledare och förvaltare på LF utan förkunskap om modellen. Distribueras som fil (Teams) och visas även i Claude-appens artefaktvisare; kan komma att läggas på GitHub Pages (repo finns: `jockemedw/Projektstyrningsmodell`) — inget beslut fattat.

## Nuvarande tillstånd

Elva avsnitt i slides-format med fri navigering (kapitelchips, föregående/nästa, piltangenter, progressbar): Start → Modellen (interaktiv fasstege med LF-process-overlay) → Beslutspunkterna (flikar med avbockningsbara checklistor, BP 1 = startsäkringens 13 punkter) → Projekt eller uppdrag? (jämförelse + interaktiv väljare) → Rollerna → Dokumenten (kedja + mål/SMART) → LF-översättningen → Ordlistan → Öva (6 scenarier) → Missförstånd → Slutprov (12 frågor).

All interaktivitet är vanilla JS i samma fil. Automatisk regression har körts via jsdom (klicka igenom samtliga komponenter och flöden). Fonter: Schibsted Grotesk + Source Sans 3 via Google Fonts CDN (systemfallback finns).

## Faktalåsningar — får inte ändras utan Joakims godkännande

Dessa är beslutade positioner respektive dokumenterad modellfakta. En förbättring som kräver avsteg ska loggas som fråga, inte genomföras.

1. **Fasstegen är visuellt identisk med originalet** (2c8-grafiken/portalen): svarta avrundade boxar med kursiv vit text för Behov/Idé, Förbereda och Effekt; grön pilkedja Planera → Genomföra → Avsluta med stigande mörkhet (#CDE4B8 → #80C16D → #3D8B43); BP-cirklar (#3C8540) som rider på pilarnas överkant; BP 3 som ljus cirkel med grön kant (= valfri); Genomföra bredast, Effekt smalast.
1. **BP-fakta:** BP 1, 2, 4, 5 obligatoriska; BP 3 valfri (kan vara flera eller ingen). Beslutsfattare BP 1–4: beställaren med stöd av styrgruppen. **BP 5: styrgruppen.** Startsäkringens checklista vid BP 1 har 13 punkter. Direktivet fryses när projektplanen antagits vid BP 2.
1. **Faserna Behov/Idé och Effekt ligger utanför projektet.** Behov/Idé = linjearbete (hos LF: lokalförsörjningsprocessen). Effekt = beställarens ansvar, inte projektledarens.
1. **LSA ansvarar för hela Förbereda** och tar fram projektdirektivet inför BP 1; FU/Inhyrning gör eventuella förstudier/utredningar på LSA:s uppdrag. Varianterna A/B är borttagna efter beslut — får inte återinföras.
1. **LF-mappningen:** programskede → programhandling, framskrivning/investeringsbeslut och hyresöverenskommelse + politiskt beslut ligger i **Planera, före BP 2**. Systemhandling, upphandling av totalentreprenör (på systemhandling), detaljprojektering (TE) och produktion ligger i **Genomföra**. Beslut att teckna entreprenadkontrakt = naturlig BP 3. Slutbesiktning = underlag för BP 4; garantibesiktning (2 år) = Effekt. Tre överlämningar: LSA→projekt (BP 1), FU→projektledare (BP 2), projektledare→förvaltning (BP 5).
1. **Lejonguidens interna BP-numrering och modellens BP 1–5 är orelaterade** — sidan ska fortsätta varna för förväxlingen.
1. **Förstudie kan drivas som separat uppdrag** (uppdragsdirektiv = BP 1, förstudierapport = BP 2). Uppdrag har fyra faser: Behov/Idé, Förbereda, Genomföra, Effekt.
1. Effektmål = beställarens (efter leverans); projektmål = projektledarens. Båda SMART:a, båda i direktivet.

Källor i Claude.ai-projektet: skillen `projektstyrningsmodell-linkoping` (references/01–08 + mallar), kommunövergripande tillämpningsanvisningen (PDF), `Projektmodell_mappad_byggprocess_LF.pdf` (obs: zip-arkiv från 2c8 trots .pdf-ändelse).

## Miljöbegränsningar — upptäckta i skarpt läge

- **Artefaktvisaren i Claude-appen är en sandlådad iframe.** `history.replaceState` och `window.scrollTo` kan kasta SecurityError — alla sådana anrop är try/catch-ade och måste förbli det. Hash-deep-länkar fungerar i vanlig webbläsare men inte i visaren.
- **Visaren injicerar mörk bakgrund på body** när appen är i mörkt tema. Motmedel: `.bg-fix` (fast positionerat ljust lager med z-index:-1) plus `!important` på html/body-bakgrund. Får inte tas bort.
- **`color-scheme: only light`** (meta + CSS) motverkar Androids automatiska mörkläggning. Sidan ska alltid rendera ljust.
- **localStorage/sessionStorage får inte användas** (fungerar inte i artefaktmiljön). Progress-persistens är därför medvetet utelämnad — detta är en känd begränsning, inte ett fel.
- Mobil ≤760px: fasstegen staplas vertikalt med BP-chip, BP-flikar swipas horisontellt, sticky-naven respekterar safe-area-inset.

## Kända öppna punkter

- 2c8-grafiken (källmaterialet) visar fortfarande variant A/B för Förbereda — sidan gör det inte. Grafiken bör uppdateras separat (utanför detta arbete).
- Ingen progress-persistens (se ovan). Blir relevant först vid eventuell hosting utanför artefaktvisaren.
- Quizets frågeordning och svarsalternativ är fasta (ingen slumpning).

## Vad som inte ska göras om

Fem granskningspass är redan genomförda (domän, pedagogik, UX, språk, visuell koherens) med åtgärdade fynd, inklusive färgharmonisering till originalets gröna familj och mobilanpassning. Utgå från nuläget — riv inte upp fungerande delar utan tydlig motivering.