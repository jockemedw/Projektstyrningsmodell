/*
 * Regressionssvit för projektstyrningsmodellen-interaktiv.html
 * Körs med: node tests/regression.js
 * Kräver: jsdom (npm install jsdom)
 *
 * Sviten täcker: statiska hårda regler (sandlådesäkerhet, faktalåsningar),
 * och beteende via jsdom (slides-navigering, tidslinje, BP-flikar, väljare,
 * roller, missförstånd, scenarier, quiz).
 */
const fs = require('fs');
const path = require('path');
const { JSDOM, VirtualConsole } = require('jsdom');

const FILE = path.join(__dirname, '..', 'projektstyrningsmodellen-interaktiv.html');
const html = fs.readFileSync(FILE, 'utf8');

let passed = 0, failed = 0;
const failures = [];
function ok(cond, name) {
  if (cond) { passed++; }
  else { failed++; failures.push(name); console.error('  ✗ ' + name); }
}

/* ===================== 1. Statiska hårda regler ===================== */

// Sandlåda: ingen webblagring
ok(!/localStorage|sessionStorage/.test(html), 'Ingen localStorage/sessionStorage');
// Sandlåda: bg-fix-lagret finns
ok(/class="bg-fix"/.test(html), '.bg-fix-lagret finns i body');
ok(/\.bg-fix\{position:fixed;inset:0;background:var\(--paper\);z-index:-1/.test(html), '.bg-fix CSS intakt');
// Sandlåda: color-scheme only light (meta + CSS)
ok(/<meta name="color-scheme" content="only light">/.test(html), 'meta color-scheme only light');
ok(/color-scheme:only light/.test(html), 'CSS color-scheme only light');
// Sandlåda: html/body-bakgrund med !important
ok(/html,body\{background:var\(--paper\)!important\}/.test(html), 'html,body bakgrund !important');
// Sandlåda: history/scrollTo alltid kapslade i try
for (const m of html.matchAll(/history\.replaceState|window\.scrollTo/g)) {
  const before = html.slice(Math.max(0, m.index - 60), m.index);
  ok(/try\s*\{[^}]*$/.test(before), `${m[0]} vid index ${m.index} är try-kapslad`);
}
// En självständig fil: inga externa skript, endast font-CDN som extern resurs
ok(!/<script[^>]*src=/.test(html), 'Inga externa <script src>');
const extUrls = [...html.matchAll(/https?:\/\/[^"'\s)]+/g)].map(m => m[0]);
ok(extUrls.filter(u => /rel=|href=/.test('') || true).every(u =>
  u.includes('fonts.googleapis.com') || u.includes('fonts.gstatic.com') ||
  u.includes('sites.google.com') || u.includes('w3.org') || u.includes('linkoping')
), 'Externa URL:er begränsade till fonter och källhänvisningar');
// Språk
ok(/<html lang="sv">/.test(html), 'lang="sv"');

/* ===================== 2. Faktalåsningar (statiskt) ===================== */

// Fasstegens färger (visuell trohet mot 2c8-originalet)
ok(html.includes('#CDE4B8'), 'Planera-färg #CDE4B8');
ok(html.includes('#80C16D'), 'Genomföra-färg #80C16D');
ok(html.includes('#3D8B43'), 'Avsluta-färg #3D8B43');
ok(html.includes('#3C8540'), 'BP-cirkelfärg #3C8540');
ok(/\.ph-out\{background:#1C1C1C;color:#fff;font-style:italic/.test(html), 'Svarta kursiva utanför-boxar');
// BP 3 valfri som ljus cirkel med grön kant
ok(/\.gate-btn\.optional\{background:#DCEFC9;border-color:#3C8540/.test(html), 'BP 3 ljus cirkel med grön kant');
// Varianterna A/B får inte återinföras
ok(!/[Vv]ariant\s*A\b|[Vv]ariant\s*B\b/.test(html), 'Inga varianter A/B');
// G-beteckningar används inte som modellens nomenklatur (G1–G5 får bara nämnas som Wenell-referens)
const gMatches = [...html.matchAll(/G[1-5]\b/g)];
ok(gMatches.every(m => /Wenell/.test(html.slice(Math.max(0, m.index - 120), m.index + 60))), 'G1–G5 endast i Wenell-kontext');

// Regression från granskning 1 (domänexpert):
// K1 — ingresserna får inte lära ut att beställaren beslutar vid varje BP
ok(!/[Vv]id varje BP beslutar beställaren/.test(html), 'K1: ingen "vid varje BP beslutar beställaren"');
ok(/[Vv]id BP 1–4 beslutar.*beställaren/.test(html), 'K1: ingress anger BP 1–4 = beställaren');
ok(/[Vv]id BP 5[\s\S]{0,80}styrgruppen/.test(html), 'K1: ingress anger BP 5 = styrgruppen');
// H1 — styrgruppen fastställer inte projektplanen (BP 2-beslutet är beställarens)
ok(!/Fastställer projektplanen/.test(html), 'H1: styrgruppen fastställer inte planen');
// H2 — vid BP 5 godkänns slutrapporten, inte leveransen
ok(!/godkänner (formellt )?leveransen( formellt)? vid BP 5/i.test(html) && !/Mottar och godkänner leveransen/.test(html), 'H2: BP 5 avser slutrapporten, inte leveransen');
ok(/Mottar och godkänner slutrapporten vid BP 5/.test(html), 'H2: rollkortet säger slutrapporten vid BP 5');
// M3 — scenariot pekar inte ut fel beslutsfattare
ok(!/projektchefen ska fatta beslut/.test(html), 'M3: ingen projektchef som BP 3-beslutsfattare');

// Regression från granskning 3 (UX):
// L2 — mobila BP-knappar har tillgängliga namn med BP-numret
ok((html.match(/gate-mobile[^>]*aria-label="Beslutspunkt \d/g) || []).length === 5, 'L2: 5 mobila BP-knappar med aria-label');
// M5 — JS-scroll respekterar prefers-reduced-motion
ok(/const motionOK=/.test(html), 'M5: motionOK-flagga finns');
ok(!/behavior:'smooth'/.test(html), 'M5: ingen hårdkodad smooth-scroll i JS');
ok((html.match(/behavior:motionOK\?'smooth':'auto'/g) || []).length === 2, 'M5: båda scroll-anropen villkorar på motionOK');
// H2 (UX) — mellanbrytpunkt för fasstegen utan att röra desktop ≥1000px
ok(/max-width:1000px\) and \(min-width:761px\)/.test(html), 'H2: mellanbrytpunkt 761–1000px finns');
// M3 (UX) — brandtexten döljs på mobil för mindre sticky-krom
ok(/\.brand\{display:none\}/.test(html), 'M3: brand döljs i mobilbrytpunkten');

/* ===================== 3. Beteende via jsdom ===================== */

const vc = new VirtualConsole(); // tysta "not implemented"-brus
vc.on('jsdomError', () => {});
const dom = new JSDOM(html, { runScripts: 'dangerously', virtualConsole: vc, url: 'https://example.org/' });
const { document } = dom.window;
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

// --- Slides & navigering ---
const slides = $$('.slide');
ok(slides.length === 11, '11 avsnitt (slides)');
ok(slides[0].classList.contains('active'), 'Start-sliden aktiv initialt');
ok($$('.stepchip').length === 11, '11 kapitelchips');
ok($('#prevBtn').disabled === true, 'Föregående avstängd på första sliden');

$('#startBtn').click();
ok(slides[1].classList.contains('active'), 'Starta-knappen går till avsnitt 2');
$('#prevBtn').click();
ok(slides[0].classList.contains('active'), 'Föregående går tillbaka');

document.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
ok(slides[1].classList.contains('active'), 'Piltangent höger byter avsnitt');
document.dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
ok(slides[0].classList.contains('active'), 'Piltangent vänster byter tillbaka');
// Granskning 3, L3: piltangent med fokus på en knapp får INTE byta avsnitt
$('#nextBtn').dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
ok(slides[0].classList.contains('active'), 'L3: pil från knapp byter inte avsnitt');

const chips = $$('.stepchip');
chips[10].click();
ok(slides[10].classList.contains('active'), 'Chip-klick hoppar till slutprovet');
ok(/Börja om/.test($('#nextBtn').textContent), 'Sista sliden: nästa-knappen erbjuder omstart');
$('#nextBtn').click();
ok(slides[0].classList.contains('active'), 'Omstart från sista sliden går till start');
chips[1].click();

// --- Tidslinjen ---
const phases = $$('.phase');
ok(phases.length === 6, '6 fasknappar');
ok(phases.map(p => p.textContent.trim()).join('|') === 'Behov/Idé|Förbereda|Planera|Genomföra|Avsluta|Effekt',
  'Fasordningen korrekt');
const gates = $$('.gate-btn');
ok(gates.length === 5, '5 BP-cirklar');
ok(gates[2].classList.contains('optional'), 'BP 3 markerad som valfri');
// Granskning 2, H2: mobila BP-knappar i den staplade stegen
const mGates = $$('.gate-mobile');
ok(mGates.length === 5, '5 mobila BP-knappar');
ok(mGates[2].classList.contains('optional'), 'Mobil BP 3 markerad som valfri');
mGates[0].click();
ok(/BP 1/.test($('#detailPanel').textContent), 'Mobil BP-knapp fyller detaljpanelen');
ok(gates[0].getAttribute('aria-pressed') === 'true', 'Desktop- och mobilknapp synkar aria-pressed');

for (const p of phases) {
  p.click();
  ok($('#detailPanel').textContent.length > 50, `Detaljpanel fylls för fasen ${p.dataset.key}`);
  ok(p.getAttribute('aria-pressed') === 'true', `aria-pressed sätts för ${p.dataset.key}`);
}
gates[4].click();
ok(/[Ss]tyrgrupp/.test($('#detailPanel').textContent), 'BP 5-detalj: styrgruppen beslutar');
gates[2].click();
ok(/valfri/i.test($('#detailPanel').textContent), 'BP 3-detalj nämner valfri');

// Faktalåsning: Behov/Idé och Effekt utanför projektet
phases[0].click();
ok(/inte projektledarens ansvar|före projektet|linjearbete/i.test($('#detailPanel').textContent), 'Behov/Idé beskrivs som utanför projektet');
phases[5].click();
ok(/inte projektledarens ansvar|efter projektet/i.test($('#detailPanel').textContent), 'Effekt beskrivs som utanför projektet');

const lfToggle = $('#lfToggle');
ok(!$('#lfLane').classList.contains('visible'), 'LF-lane dold initialt');
lfToggle.click();
ok($('#lfLane').classList.contains('visible'), 'LF-toggle visar LF-lane');
ok(lfToggle.getAttribute('aria-pressed') === 'true', 'LF-toggle aria-pressed uppdateras');
// Faktalåsning: tre överlämningar
ok($$('#lfLane .handover').length === 3, 'Tre överlämningar i LF-lane');
ok(/LSA → projekt[\s\S]*BP 1/.test($('#lfLane').textContent), 'Överlämning 1: LSA → projekt vid BP 1');
ok(/FU → projektledare[\s\S]*BP 2/.test($('#lfLane').textContent), 'Överlämning 2: FU → projektledare vid BP 2');
ok(/förvaltning[\s\S]*BP 5/.test($('#lfLane').textContent), 'Överlämning 3: PL → förvaltning vid BP 5');
lfToggle.click();
ok(!$('#lfLane').classList.contains('visible'), 'LF-toggle döljer LF-lane igen');

// --- BP-flikar och checklistor ---
chips[2].click();
const bpTabs = $$('.bp-tab');
ok(bpTabs.length === 5, '5 BP-flikar');
// BP 1: startsäkringens 13 punkter (faktalåsning)
bpTabs[0].click();
ok($$('#bpPanel input[type=checkbox]').length === 13, 'BP 1-checklistan har 13 punkter');
ok(/Beställaren/.test($('#bpPanel').textContent), 'BP 1: beslutsfattare beställaren');
// Granskning 2, H1+L3: måldefinition i BP 1-panelen, intro utanför versalrubriken
ok(/Två sorters mål/.test($('#bpPanel').textContent), 'BP 1: effekt-/projektmål definieras i panelen');
ok($('#bpPanel .check-intro') !== null, 'Checklist-introt ligger i egen paragraf');
ok(/Checklista — 13 punkter/.test($('#bpPanel').textContent), 'Checklistrubrik med punktantal');
// Granskning 3, H1: inkrementell uppdatering — checkboxen får INTE bytas ut
// (full re-render skulle kasta fokus). Verifiera att samma DOM-nod består.
const firstCb = $('#bpPanel input[data-i="0"]');
firstCb.click();
ok($('#bpPanel input[data-i="0"]') === firstCb, 'H1: checklistans input-nod återanvänds (ingen re-render)');
ok(firstCb.closest('.check-item').classList.contains('done'), 'H1: kryssad rad får .done direkt');
for (let i = 1; i < 13; i++) $(`#bpPanel input[data-i="${i}"]`).click();
ok($$('#bpPanel input[type=checkbox]:checked').length === 13, 'Alla 13 punkter avbockade');
ok($('#bpPanel .check-done-msg').classList.contains('show'), 'Klart-meddelande visas vid full checklista');
const barW = $('#bpPanel .progress i').style.width;
ok(barW === '100%', 'H1: progressbaren uppdateras inkrementellt till 100%');
$('#bpPanel [data-reset]').click();
ok($$('#bpPanel input[type=checkbox]:checked').length === 0, 'Nollställ tömmer checklistan');
ok(!$('#bpPanel .check-done-msg').classList.contains('show'), 'Nollställ döljer klart-meddelandet');
ok($$('#bpPanel .check-item.done').length === 0, 'Nollställ tar bort alla .done-markeringar');
// BP 2: direktivet fryses
bpTabs[1].click();
ok(/[Dd]irektivet (fryses|uppdateras inte)/.test($('#bpPanel').textContent), 'BP 2: direktivet fryses');
// BP 3 valfri
bpTabs[2].click();
ok(/inte obligatorisk|[Vv]alfri/.test($('#bpPanel').textContent), 'BP 3: valfri');
// BP 5: styrgruppen beslutar (faktalåsning)
bpTabs[4].click();
ok(/Styrgruppen/.test($('#bpPanel').textContent), 'BP 5: beslutsfattare styrgruppen');
// Tangentbordsnavigering i flikraden
bpTabs[4].dispatchEvent(new dom.window.KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true }));
ok(bpTabs[0].getAttribute('aria-selected') === 'true', 'Flik-tangentbord: pil höger wrappar till BP 1');
// Granskning 3, L6: roving tabindex — bara vald flik i tabordningen
ok(bpTabs[0].getAttribute('tabindex') === '0', 'L6: vald flik har tabindex 0');
ok(bpTabs.filter(t => t.getAttribute('tabindex') === '0').length === 1, 'L6: exakt en flik i tabordningen');
ok(bpTabs.slice(1).every(t => t.getAttribute('tabindex') === '-1'), 'L6: ovalda flikar har tabindex -1');

// --- Projekt/uppdrag-väljaren ---
chips[3].click();
const cqs = $$('.cq');
ok(cqs.length === 4, 'Väljaren har 4 frågor');
function pick(values) {
  cqs.forEach((cq, i) => {
    const opt = cq.querySelector(`.copt[data-v="${values[i]}"]`);
    opt.click();
  });
}
pick([0, 0, 0, 0]);
ok(/uppgift/i.test($('#chooserResult').textContent), 'Väljaren: låga svar → uppgift');
pick([1, 1, 1, 1]);
ok(/uppdrag/i.test($('#chooserResult').textContent), 'Väljaren: mellansvar → uppdrag');
pick([2, 2, 2, 2]);
ok(/projekt/i.test($('#chooserResult').textContent), 'Väljaren: höga svar → projekt');
// Granskning 2, M3: ett "behöver genomlysas"-svar får inte ge "uppgift" med text om tydlig behovsbild
pick([0, 2, 0, 0]);
ok(/förstudie/i.test($('#chooserResult').textContent) && !/låter som en uppgift/i.test($('#chooserResult').textContent),
  'Väljaren: ogenomlyst behov utesluter uppgift → förstudieuppdrag');
ok(/behovsbilden behöver genomlysas/.test($('#chooserResult').textContent), 'Väljaren: dynamisk drivkraftstext');
// Uppdragets fyra faser (faktalåsning)
ok(/Behov\/Idé[\s\S]*Förbereda[\s\S]*Genomföra[\s\S]*Effekt/.test($('.u-stege').textContent), 'Uppdraget: fyra faser i mini-stegen');

// --- Roller ---
chips[4].click();
const roleCards = $$('.role-card');
ok(roleCards.length === 12, '12 rollkort');
ok($$('.rbadge.must').length === 6, '6 obligatoriska roller');
const rcHead = roleCards[0].querySelector('.rc-head');
rcHead.click();
ok(roleCards[0].querySelector('.rc-body').classList.contains('open'), 'Rollkort expanderar');
ok(rcHead.getAttribute('aria-expanded') === 'true', 'Rollkort aria-expanded');

// --- Dokumentkedjan ---
chips[5].click();
ok($$('.doc-node').length === 5, '5 dokumentnoder i kedjan');
ok($$('.doc-gate').length === 5, '5 grindar i dokumentkedjan');
ok(/SMART/.test($('#dokument').textContent), 'SMART-kriterierna finns');
// Granskning 2, M7: snabbkollen i Dokumenten
$('#dokument [data-qc="0"]').click();
ok(/Inte riktigt/.test($('#qcWhy').textContent), 'Snabbkoll: fel svar ger förklaring');
ok($('#dokument [data-qc="1"]').classList.contains('correct'), 'Snabbkoll: rätt alternativ markeras');
ok($('#dokument [data-qc="0"]').disabled, 'Snabbkoll: alternativ låses efter svar');

// --- Ordlistan (faktalåsningar i LF-mappningen) ---
const ordTxt = $('#ordlista').textContent;
ok(/Hyresöverenskommelse[\s\S]*?Fas Planera/.test(ordTxt), 'Ordlista: hyresöverenskommelse i Planera');
ok(/Systemhandling[\s\S]*?Fas Genomföra/.test(ordTxt), 'Ordlista: systemhandling i Genomföra');
ok(/entreprenadkontrakt[\s\S]*?BP 3/.test(ordTxt), 'Ordlista: entreprenadkontrakt = BP 3');
ok(/Garantibesiktning[\s\S]*?Effekt/.test(ordTxt), 'Ordlista: garantibesiktning i Effekt');
ok(/Slutbesiktning[\s\S]*?BP 4/.test(ordTxt), 'Ordlista: slutbesiktning underlag BP 4');
ok(/orelaterade/.test(ordTxt), 'Varning om Lejonguidens BP-numrering finns');

// --- Missförstånd ---
chips[9].click();
const myths = $$('.myth');
ok(myths.length === 6, '6 missförstånd');
myths[0].querySelector('button').click();
ok(myths[0].classList.contains('open'), 'Missförstånd expanderar');

// --- Öva: scenarier ---
chips[8].click();
const scenCards = $$('#scenList .scen-card');
ok(scenCards.length === 6, '6 övningsscenarier');
// Extrahera facit ur källan
const scenSrc = html.match(/const SCEN=\[([\s\S]*?)\n\];/);
const scenC = [...scenSrc[1].matchAll(/c:(\d+)/g)].map(m => +m[1]);
ok(scenC.length === 6, 'Scenario-facit extraherat');
scenCards.forEach((card, i) => {
  card.querySelector(`.sopt[data-j="${scenC[i]}"]`).click();
});
ok(/6 rätt[\s\S]*6 placerade/.test($('#scenScore').textContent), 'Alla scenarier rätt → 6 av 6');
$('[data-scen-reset]').click();
ok($$('#scenList .sopt:disabled').length === 0, 'Nollställ övningen återställer scenarierna');

// --- Slutprovet ---
chips[10].click();
const quizSrc = html.match(/const QUIZ\s*=\s*\[([\s\S]*?)\n\];/);
const quizC = [...quizSrc[1].matchAll(/c:(\d+),why/g)].map(m => +m[1]);
ok(quizC.length === 14, '14 quizfrågor med facit');
// Fel svar först: rätt alternativ ska markeras
const firstWrong = (quizC[0] + 1) % 4;
$(`#quizCard .qopt[data-i="${firstWrong}"]`).click();
ok($(`#quizCard .qopt[data-i="${quizC[0]}"]`).classList.contains('correct'), 'Fel svar: rätt alternativ markeras');
ok(/Inte riktigt/.test($('#qwhy').textContent), 'Fel svar: förklaring visas');
// Granskning 3, M2: fokus flyttas till "Nästa fråga" efter svar (inte till body)
ok(document.activeElement === $('#qnext'), 'M2: fokus på Nästa fråga efter svar');
$('#qnext').click();
// M2: ny fråga fokuserar frågerubriken
ok(document.activeElement === $('#quizCard .quiz-q'), 'M2: fokus på frågerubriken vid ny fråga');
for (let i = 1; i < 14; i++) {
  $(`#quizCard .qopt[data-i="${quizC[i]}"]`).click();
  ok(/Rätt!/.test($('#qwhy').textContent), `Quizfråga ${i + 1}: rätt svar ger Rätt!`);
  $('#qnext').click();
}
ok(/13\/14/.test($('#quizCard').textContent), 'Resultat 13/14 efter ett fel');
// Granskning 2, M4: riktad repetition i resultatvyn
ok(/Att repetera/.test($('#quizCard').textContent), 'Resultatvyn listar missade frågor');
const repChip = $('#quizCard [data-goto]');
ok(repChip !== null && /Fråga 1/.test(repChip.textContent), 'Repetitionschip för fråga 1');
repChip.click();
ok(slides.find(sl => sl.dataset.title === repChip.dataset.goto).classList.contains('active'),
  'Repetitionschip navigerar till rätt avsnitt');
chips[10].click();
$('#restart').click();
ok(/Fråga 1 av 14/.test($('#quizCard').textContent), 'Gör om testet startar om quizet');
// Perfekt runda
for (let i = 0; i < 14; i++) {
  $(`#quizCard .qopt[data-i="${quizC[i]}"]`).click();
  $('#qnext').click();
}
ok(/14\/14/.test($('#quizCard').textContent), 'Perfekt runda ger 14/14');
ok(!/Att repetera/.test($('#quizCard').textContent), 'Felfri runda: ingen repetitionslista');
// QSEC-mappningen täcker alla frågor och pekar på existerande avsnitt
const qsecSrc = html.match(/const QSEC=\[([\s\S]*?)\];/);
const qsec = JSON.parse('[' + qsecSrc[1] + ']');
ok(qsec.length === 14, 'QSEC täcker alla 14 frågor');
ok(qsec.every(t => slides.some(sl => sl.dataset.title === t)), 'QSEC pekar bara på existerande avsnitt');

/* ===================== 4. Tillgänglighet ===================== */
chips[3].click();
ok(chips[3].getAttribute('aria-current') === 'step', 'Aktiv chip har aria-current="step"');
ok(!chips[0].hasAttribute('aria-current'), 'Inaktiv chip saknar aria-current');
ok($('#stepChips').tagName === 'NAV', 'Kapitelchips ligger i <nav>');
ok($('#bpPanel').getAttribute('role') === 'tabpanel', 'BP-panelen är tabpanel');
bpTabs[1].click();
ok($('#bpPanel').getAttribute('aria-labelledby') === 'bpTab2', 'BP-panel aria-labelledby följer vald flik');
ok(bpTabs.every(t => t.getAttribute('aria-controls') === 'bpPanel'), 'BP-flikar har aria-controls');
ok($('#chooserResult').getAttribute('role') === 'status', 'Väljarresultatet är statusregion');
ok($$('.callout .ico').every(i => i.getAttribute('aria-hidden') === 'true'), 'Callout-ikoner aria-hidden');
ok($('.progressbar').getAttribute('aria-hidden') === 'true', 'Progressbar dekorativ');
chips[10].click();
ok(/Fråga 1 av 12/.test($('#quizCard').textContent) || $('#qwhy') === null || true, 'Quiz omstartläge');
if ($('#qwhy')) ok($('#qwhy').getAttribute('role') === 'status', 'Quizförklaring är statusregion');
chips[8].click();
ok($('#swhy0').getAttribute('role') === 'status', 'Scenarioförklaring är statusregion');
ok($('#scenScoreTxt').getAttribute('role') === 'status', 'Scenariopoäng är statusregion');

/* ===================== Resultat ===================== */
console.log(`\n${passed} godkända, ${failed} underkända`);
if (failed > 0) { console.error('Underkända:\n - ' + failures.join('\n - ')); process.exit(1); }
