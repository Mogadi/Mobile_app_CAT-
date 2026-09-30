import { Zone } from '../types/zone';

export const ZONES: Zone[] = [
  {
    id: 'z1',
    name: 'Kinigi Produce Row',
    category: 'Produce',
    status: 'Open',
    priority: 'High',
    placeholderLabel: 'Produce stalls',
  },
  {
    id: 'z2',
    name: 'Muhoza Grain Shed',
    category: 'Grains',
    status: 'Pending',
    priority: 'Medium',
    placeholderLabel: 'Grain sacks',
  },
  {
    id: 'z3',
    name: 'Cyuve Meat Corner',
    category: 'Meat',
    status: 'Flagged',
    priority: 'High',
    placeholderLabel: 'Meat counter',
  },
  {
    id: 'z4',
    name: 'Busogo Clothing Lane',
    category: 'Clothing',
    status: 'Open',
    priority: 'Low',
    placeholderLabel: 'Clothing racks',
  },
  {
    id: 'z5',
    name: 'Kimonyi Household Bay',
    category: 'Household',
    status: 'Closed',
    priority: 'Low',
    placeholderLabel: 'Household goods',
  },
  {
    id: 'z6',
    name: 'Musanze Cooked Food',
    category: 'Cooked food',
    status: 'Pending',
    priority: 'Medium',
    placeholderLabel: 'Cooked food stall',
  },
];
