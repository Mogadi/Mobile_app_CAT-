import { ReactNode, createContext, useContext, useMemo, useState } from 'react';

import { EMPTY_DRAFT, InspectionDraft, InspectionRecord } from '../types/inspection';

type InspectionSessionValue = {
  draft: InspectionDraft;
  records: InspectionRecord[];
  updateDraft: (patch: Partial<InspectionDraft>) => void;
  setImageUri: (imageUri: string | null) => void;
  saveRecord: (record: InspectionRecord) => void;
  resetDraft: () => void;
};

const InspectionSessionContext = createContext<InspectionSessionValue | null>(null);

export function InspectionSessionProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<InspectionDraft>(EMPTY_DRAFT);
  const [records, setRecords] = useState<InspectionRecord[]>([]);

  const value = useMemo<InspectionSessionValue>(
    () => ({
      draft,
      records,
      updateDraft: (patch) => {
        setDraft((current) => ({ ...current, ...patch }));
      },
      setImageUri: (imageUri) => {
        setDraft((current) => ({ ...current, imageUri }));
      },
      saveRecord: (record) => {
        setRecords((current) => [record, ...current]);
      },
      resetDraft: () => {
        setDraft(EMPTY_DRAFT);
      },
    }),
    [draft, records],
  );

  return (
    <InspectionSessionContext.Provider value={value}>{children}</InspectionSessionContext.Provider>
  );
}

export function useInspectionSession(): InspectionSessionValue {
  const value = useContext(InspectionSessionContext);
  if (!value) {
    throw new Error('useInspectionSession must be used inside InspectionSessionProvider');
  }
  return value;
}
