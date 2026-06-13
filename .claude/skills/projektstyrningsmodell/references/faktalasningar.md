# Faktalåsningar — får inte ändras utan godkännande

Dessa är beslutade positioner respektive dokumenterad modellfakta (källa:
`HANDOVER.md`). En förbättring eller ett svar som kräver avsteg ska loggas som
fråga, inte genomföras.

1. **Fasstegens visuella trohet** (mot 2c8-grafiken/portalen): svarta avrundade
   boxar med kursiv vit text för Behov/Idé, Förbereda och Effekt; grön pilkedja
   Planera → Genomföra → Avsluta med stigande mörkhet (#CDE4B8 → #80C16D →
   #3D8B43); BP-cirklar (#3C8540) som rider på pilarnas överkant; BP 3 som ljus
   cirkel med grön kant (= valfri); Genomföra bredast, Effekt smalast.

2. **BP-fakta:** BP 1, 2, 4, 5 obligatoriska; BP 3 valfri (kan vara flera eller
   ingen). Beslutsfattare BP 1–4: **beställaren** med stöd av styrgruppen.
   **BP 5: styrgruppen.** Startsäkringens checklista vid BP 1 har **13 punkter**.
   Direktivet fryses när projektplanen antagits vid BP 2.

3. **Faserna Behov/Idé och Effekt ligger utanför projektet.** Behov/Idé =
   linjearbete (hos LF: lokalförsörjningsprocessen). Effekt = beställarens
   ansvar, inte projektledarens.

4. **LSA ansvarar för hela Förbereda** och tar fram projektdirektivet inför BP 1
   (för beställarens räkning — direktivet är formellt beställarens dokument).
   FU/Inhyrning gör eventuella förstudier/utredningar på LSA:s uppdrag.
   Varianterna A/B är borttagna efter beslut — får **inte** återinföras.

5. **LF-mappningen:** programskede → programhandling, framskrivning/
   investeringsbeslut och hyresöverenskommelse + politiskt beslut ligger i
   **Planera, före BP 2**. Systemhandling, upphandling av totalentreprenör (på
   systemhandling), detaljprojektering (TE) och produktion ligger i
   **Genomföra**. Beslut att teckna entreprenadkontrakt = naturlig BP 3.
   Slutbesiktning = underlag för BP 4; garantibesiktning (2 år) = Effekt.
   Tre överlämningar: LSA→projekt (BP 1), FU→projektledare (BP 2),
   projektledare→förvaltning (BP 5).

6. **Lejonguidens interna BP-numrering och modellens BP 1–5 är orelaterade** —
   varna alltid för förväxlingen. Mot förvaltningarna gäller alltid modellens
   BP 1–5.

7. **Förstudie kan drivas som separat uppdrag** (uppdragsdirektiv = BP 1,
   förstudierapport = BP 2). Uppdrag har fyra faser: Behov/Idé, Förbereda,
   Genomföra, Effekt.

8. **Effektmål = beställarens** (nyttan efter leverans); **projektmål =
   projektledarens** (den konkreta leveransen). Båda SMART:a, båda i direktivet.

## Miljö/leveransbegränsningar (för den interaktiva sidan)

- Levereras som **en (1) självständig HTML-fil**, inga byggsteg, inga externa
  beroenden utöver befintlig fontladdning.
- Artefaktvisaren är en sandlådad iframe: `history.replaceState`/`window.scrollTo`
  m.m. måste vara try/catch-kapslade. Ingen `localStorage`/`sessionStorage`.
  `.bg-fix`-lagret och `color-scheme: only light` behålls. All användarvänd text
  på svenska.
