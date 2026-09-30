# MOB_A1_G03 — Musanze Safe Markets

Field inspection prototype for SWE 3409 Assignment 1. Group verification code: **MOB-G03-7014**.

The app runs in Expo Go. It has no backend. Vendor names and phone numbers in the demonstration are fictional. Saved inspections stay in memory for the session only.

## Group

| Member | Name | Registration | Role |
| --- | --- | --- | --- |
| 1 | Nuzha ZainEl-Abdeen Mohammed Ismail | 25/27419 | Product and UX lead |
| 2 | Ehab Fakhralden Mohamed Hamid | 25/27950 | Interface engineer |
| 3 | Mojtaba Abdalitieef Ahmed | 25/27660 | State and navigation engineer |
| 4 | Mohammed Osama Hasan | 25/27014 | Device integration and QA lead. Group leader. |
| 5 | Lazarus Simboya Ira Inyasio | 25/28180 | Release and evidence lead |
| Support | Feras Saifaddin Ismail Mohammed | 25/27916 | Demonstration evidence support for Member 5: demo video, screenshots, and device test-log rows |

## Repository

- URL: https://github.com/Mogadi/Mobile_app_CAT-
- Commit recorded for this package: `62e40a885ff272314485e3782d138df82b19c74a`
- Before the final upload, run `git rev-parse HEAD` and replace the hash above if it has changed. The hash in Moodle must match the ZIP.

## Run

Tested on Windows 11, Node.js 22.23.2, npm 10.9.8, Expo SDK 57. Open the project in Expo Go on Android or iOS. Sign in to the same Expo account on the computer and in Expo Go.

```bash
npm install
npm start
```

`npm start` opens an Expo tunnel because this Wi-Fi blocks a direct connection from the phone. Scan the QR code from inside Expo Go.

## What the app does

- Home shows six fictional Musanze stalls, a search box, and an empty state.
- New Inspection validates the alias, stall code `MZ-A-014`, category, fictional phone `+250 788 123 456`, risk, consent, and one photo.
- Review shows the answers, the photo, the time, and `MOB-G03-7014`. Save adds the record to the in-memory list.
- Records opens Inspection detail. Back returns to the same list.

## Package layout

```
MOB_A1_G03/
├── README.md
├── package.json
├── app.json
├── src/
├── assets/
├── evidence/
│   ├── AI_USE.md
│   ├── TEST_LOG.pdf
│   └── MOB_A1_G03_DEMO.mp4
└── screenshots/
```

`app.json` is the Expo manifest. The separate uploads are `MOB_A1_G03_UIUX.pdf` (in `design/`) and `MOB_A1_G03_CONTRIBUTIONS.pdf`.

## Known limitations

- Inspections disappear when the app process stops. There is no database or server.
- The demonstration video and phone screenshots still have to be recorded by the group and placed in `evidence/` and `screenshots/`.
- This Wi-Fi blocks a direct phone connection, and ngrok did not finish connecting. `npm start` uses Expo's tunnel instead.
- The validation script in `src/validation/inspection.check.ts` checks the form rules on the computer. It does not replace the device test in `evidence/TEST_LOG.pdf`.

## Moodle text

```
Group number: 03
i. Group verification code: MOB-G03-7014
ii. Group leader: Mohammed Osama Hasan, 25/27014
iii. Group members: Nuzha ZainEl-Abdeen Mohammed Ismail 25/27419; Ehab Fakhralden Mohamed Hamid 25/27950; Mojtaba Abdalitieef Ahmed 25/27660; Mohammed Osama Hasan 25/27014; Lazarus Simboya Ira Inyasio 25/28180; Feras Saifaddin Ismail Mohammed 25/27916 (demonstration evidence support)
iv. GitHub repository URL: https://github.com/Mogadi/Mobile_app_CAT-
v. Final commit hash: 62e40a885ff272314485e3782d138df82b19c74a
vi. Demonstration video link, if the video is not included in the ZIP:
```
