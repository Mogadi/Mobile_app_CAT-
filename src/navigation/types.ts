import { NavigatorScreenParams } from '@react-navigation/native';

import { InspectionDraft } from '../types/inspection';

export type TabParamList = {
  Home: undefined;
  NewInspection: undefined;
  Records: undefined;
};

export type ReviewParams = {
  draft: InspectionDraft;
  openedAt: string;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;
  Review: ReviewParams;
  InspectionDetail: { inspectionId: string };
};
