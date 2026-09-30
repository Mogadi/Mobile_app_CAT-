# AI use disclosure

Generative AI was used for explanation, design drafting, debugging, and scaffolding. It does not replace testing or each member’s ability to explain their own work.

## Cursor (Grok)

- Purpose: interpret Assignment 1, draft the UI/UX document, scaffold the Expo project, implement the catalog, form, navigation, and camera workflow, and prepare the release files.
- Requests included: read the assignment PDF; produce the Member 1 design; set the group code to MOB-G03-7014; fill the member table; build the catalog, validated form, tabs, stack, and image picker; fix Expo Go “Failed to download remote update”; add tab icons; prepare the README and evidence notes.
- Files affected include `design/MOB_A1_UIUX.html`, `design/MOB_A1_G03_UIUX.pdf`, `design/SCREEN_SPEC.md`, `README.md`, `app.json`, `package.json`, `src/`, and `evidence/AI_USE.md`.
- How it was checked: the group compared the code with the assignment and the screen spec. `npx tsc --noEmit` passed. `src/validation/inspection.check.ts` passed 1 valid case and rejected 8 invalid cases. Expo Go on a phone downloaded the bundle after `npm start` (tunnel). The camera, gallery, permission denial, and cancellation still need to be shown on the device in the demonstration video.

No other generative AI tool was recorded for this package.
