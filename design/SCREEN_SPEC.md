# Screen spec for the build

This is the contract between Member 1 (product and UX) and the people who code. If the app and this file disagree, fix the app or update both files together.

Group number: 03. Verification code: `MOB-G03-7014`. Group leader: Mohammed Osama Hasan, 25/27014. Put that string in one constant, `GROUP_CODE`, and render it from there. It appears in the app header and again on Review.

| Member | Name | Registration | Owns |
| --- | --- | --- | --- |
| 1 | Nuzha ZainEl-Abdeen Mohammed Ismail | 25/27419 | Product and UX |
| 2 | Ehab Fakhralden Mohamed Hamid | 25/27950 | Catalog interface |
| 3 | Mojtaba Abdalitieef Ahmed | 25/27660 | Form, validation, navigation |
| 4 | Mohammed Osama Hasan | 25/27014 | Camera, gallery, QA. Group leader. |
| 5 | Lazarus Simboya Ira Inyasio | 25/28180 | Release and evidence |

## Session

Keep one in-memory store for the whole app session:

- `records`: saved inspections
- the New Inspection form state, so switching tabs does not wipe a half-filled form

Do not use a backend, database, or API key.

## Catalog

Six fixed fictional stalls. Reuse one card component.

| id | name | category | status | priority | placeholder label |
| --- | --- | --- | --- | --- | --- |
| z1 | Kinigi Produce Row | Produce | Open | High | Produce stalls |
| z2 | Muhoza Grain Shed | Grains | Pending | Medium | Grain sacks |
| z3 | Cyuve Meat Corner | Meat | Flagged | High | Meat counter |
| z4 | Busogo Clothing Lane | Clothing | Open | Low | Clothing racks |
| z5 | Kimonyi Household Bay | Household | Closed | Low | Household goods |
| z6 | Musanze Cooked Food | Cooked food | Pending | Medium | Cooked food stall |

Home has a search box. It filters by name and category. No matches shows: title “No stalls match”, body “Nothing in today’s pilot uses that name.”, button “Clear search”.

Status chip text is always Open, Pending, Flagged, or Closed. Priority is the words High, Medium, or Low.

## Validation

Block navigation to Review until every rule passes. Show the message under that field.

| Field | Rule | Message |
| --- | --- | --- |
| Vendor alias | Required, trim, length ≥ 2 | Enter at least 2 characters. |
| Stall code | Exact `/^MZ-[A-F]-\d{3}$/` | Stall code must look like MZ-A-014. |
| Category | One of the six catalog categories | Choose a category. |
| Contact number | Exact `/^\+250 7\d{2} \d{3} \d{3}$/` | Use a fictional number like +250 788 123 456. |
| Risk level | Low, Medium, or High | Choose a risk level. |
| Consent | Must be checked | Confirm that this demo uses fictional data only. |
| Evidence image | A preview URI is present | Add a photo from the camera or the gallery. |

Examples that must fail: blank form, `A14`, `mz-a-014`, `MZ-G-001`, `0788123456`, `+250 688 123 456`, unchecked consent, no image.

Example that must pass: Mama Keza, MZ-A-014, Produce, +250 788 123 456, High, consent checked, one image.

## Image behaviour

- Capture photo and Choose from gallery are both available.
- Permission denied: stay on the form. Message: “Camera access is off. Try again, or choose a gallery photo.” Swap “Camera” for “Gallery” when that permission was denied.
- User cancels the picker: “No image selected. You can try again.” Keep every other field.
- Preview shows the image, Replace, and Remove.
- Remove clears the preview.

## Routes

| Name | Kind | Params |
| --- | --- | --- |
| MainTabs | stack screen hosting tabs | none |
| Home | tab | none |
| NewInspection | tab | none |
| Records | tab | none |
| Review | stack | draft object of the validated fields and image URI |
| InspectionDetail | stack | `inspectionId: string` |

Save on Review appends `{ ...draft, id, createdAt }` to `records`, then navigates to Records. Back from InspectionDetail returns to Records with that list intact.

Timestamp is local date and time, created when Review opens, shown on Review and Detail.

## Visual tokens

- Background `#F4F1EA`, surface `#FFFFFF`, primary `#1B4D3E`, text `#1A1A1A`, muted `#5C574E`, accent `#C45C26`
- Open `#1B6B3A`, Pending `#8A5A00`, Flagged `#9B2335`, Closed `#5C574E`
- Screen padding 16, card gap 12, card radius 8
- Minimum touch target 48
- System font. Title 22, card title 17, body 16, meta 14. Allow font scaling. Do not clip text.

## Records empty copy

“No inspections saved in this session.”
