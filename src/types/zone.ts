export const STATUSES = ['Open', 'Pending', 'Flagged', 'Closed'] as const;
export const PRIORITIES = ['High', 'Medium', 'Low'] as const;

export type StallStatus = (typeof STATUSES)[number];
export type StallPriority = (typeof PRIORITIES)[number];

export type Zone = {
  id: string;
  name: string;
  category: string;
  status: StallStatus;
  priority: StallPriority;
  placeholderLabel: string;
};
