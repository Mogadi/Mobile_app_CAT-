import assert from 'node:assert/strict';

import { EMPTY_DRAFT, InspectionDraft } from '../types/inspection';
import { isInspectionValid, validateInspection } from './inspection';

const valid: InspectionDraft = {
  vendorAlias: 'Mama Keza',
  stallCode: 'MZ-A-014',
  category: 'Produce',
  contactNumber: '+250 788 123 456',
  riskLevel: 'High',
  consent: true,
  imageUri: 'file://evidence.jpg',
};

const failures: Array<{ label: string; draft: InspectionDraft; field: keyof InspectionDraft }> = [
  { label: 'blank form', draft: EMPTY_DRAFT, field: 'vendorAlias' },
  { label: 'short stall code', draft: { ...valid, stallCode: 'A14' }, field: 'stallCode' },
  { label: 'lowercase stall code', draft: { ...valid, stallCode: 'mz-a-014' }, field: 'stallCode' },
  { label: 'zone letter G', draft: { ...valid, stallCode: 'MZ-G-001' }, field: 'stallCode' },
  { label: 'local phone', draft: { ...valid, contactNumber: '0788123456' }, field: 'contactNumber' },
  {
    label: 'non-mobile prefix',
    draft: { ...valid, contactNumber: '+250 688 123 456' },
    field: 'contactNumber',
  },
  { label: 'missing consent', draft: { ...valid, consent: false }, field: 'consent' },
  { label: 'missing image', draft: { ...valid, imageUri: null }, field: 'imageUri' },
];

assert.equal(isInspectionValid(valid), true, 'valid example must pass');

for (const failure of failures) {
  const errors = validateInspection(failure.draft);
  assert.ok(errors[failure.field], `${failure.label} must set ${failure.field}`);
  assert.equal(isInspectionValid(failure.draft), false, `${failure.label} must block review`);
}

console.log(`validation checks passed: 1 valid, ${failures.length} rejected`);
