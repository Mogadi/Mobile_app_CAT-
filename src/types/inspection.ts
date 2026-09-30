export const CATEGORIES = [
  'Produce',
  'Grains',
  'Meat',
  'Clothing',
  'Household',
  'Cooked food',
] as const;

export const RISK_LEVELS = ['Low', 'Medium', 'High'] as const;

export type Category = (typeof CATEGORIES)[number];
export type RiskLevel = (typeof RISK_LEVELS)[number];

export type InspectionDraft = {
  vendorAlias: string;
  stallCode: string;
  category: Category | '';
  contactNumber: string;
  riskLevel: RiskLevel | '';
  consent: boolean;
  imageUri: string | null;
};

export type InspectionRecord = {
  id: string;
  vendorAlias: string;
  stallCode: string;
  category: Category;
  contactNumber: string;
  riskLevel: RiskLevel;
  consent: true;
  imageUri: string;
  createdAt: string;
};

export const EMPTY_DRAFT: InspectionDraft = {
  vendorAlias: '',
  stallCode: '',
  category: '',
  contactNumber: '',
  riskLevel: '',
  consent: false,
  imageUri: null,
};
