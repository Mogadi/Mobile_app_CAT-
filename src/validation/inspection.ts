import { CATEGORIES, InspectionDraft, RISK_LEVELS } from '../types/inspection';

export const STALL_CODE_PATTERN = /^MZ-[A-F]-\d{3}$/;
export const PHONE_PATTERN = /^\+250 7\d{2} \d{3} \d{3}$/;

export type InspectionField = keyof InspectionDraft;

export type InspectionErrors = Partial<Record<InspectionField, string>>;

const MESSAGES = {
  vendorAlias: 'Enter at least 2 characters.',
  stallCode: 'Stall code must look like MZ-A-014.',
  category: 'Choose a category.',
  contactNumber: 'Use a fictional number like +250 788 123 456.',
  riskLevel: 'Choose a risk level.',
  consent: 'Confirm that this demo uses fictional data only.',
  imageUri: 'Add a photo from the camera or the gallery.',
} as const;

export function fieldError(draft: InspectionDraft, field: InspectionField): string | undefined {
  switch (field) {
    case 'vendorAlias':
      return draft.vendorAlias.trim().length >= 2 ? undefined : MESSAGES.vendorAlias;
    case 'stallCode':
      return STALL_CODE_PATTERN.test(draft.stallCode) ? undefined : MESSAGES.stallCode;
    case 'category':
      return CATEGORIES.includes(draft.category as (typeof CATEGORIES)[number])
        ? undefined
        : MESSAGES.category;
    case 'contactNumber':
      return PHONE_PATTERN.test(draft.contactNumber) ? undefined : MESSAGES.contactNumber;
    case 'riskLevel':
      return RISK_LEVELS.includes(draft.riskLevel as (typeof RISK_LEVELS)[number])
        ? undefined
        : MESSAGES.riskLevel;
    case 'consent':
      return draft.consent ? undefined : MESSAGES.consent;
    case 'imageUri':
      return draft.imageUri ? undefined : MESSAGES.imageUri;
    default:
      return undefined;
  }
}

export function validateInspection(draft: InspectionDraft): InspectionErrors {
  const errors: InspectionErrors = {};
  (Object.keys(MESSAGES) as InspectionField[]).forEach((field) => {
    const message = fieldError(draft, field);
    if (message) {
      errors[field] = message;
    }
  });
  return errors;
}

export function isInspectionValid(draft: InspectionDraft): boolean {
  return Object.keys(validateInspection(draft)).length === 0;
}
