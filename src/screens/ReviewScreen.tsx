import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppHeader } from '../components/AppHeader';
import { GROUP_CODE } from '../constants/group';
import { EVIDENCE_SUPPORT } from '../constants/team';
import { RootStackParamList } from '../navigation/types';
import { useInspectionSession } from '../state/InspectionSession';
import { colors, space, type } from '../theme/tokens';
import { Category, InspectionRecord, RiskLevel } from '../types/inspection';
import { formatRecordedAt } from '../validation/formatRecordedAt';

type Props = NativeStackScreenProps<RootStackParamList, 'Review'>;

export function ReviewScreen({ navigation, route }: Props) {
  const { draft, openedAt } = route.params;
  const { saveRecord, resetDraft } = useInspectionSession();
  const recordedAt = formatRecordedAt(openedAt);

  function save() {
    if (!draft.category || !draft.riskLevel || !draft.consent || !draft.imageUri) {
      return;
    }
    const record: InspectionRecord = {
      id: `${Date.now()}`,
      vendorAlias: draft.vendorAlias.trim(),
      stallCode: draft.stallCode,
      category: draft.category as Category,
      contactNumber: draft.contactNumber,
      riskLevel: draft.riskLevel as RiskLevel,
      consent: true,
      imageUri: draft.imageUri,
      createdAt: openedAt,
    };
    saveRecord(record);
    resetDraft();
    navigation.navigate('MainTabs', { screen: 'Records' });
  }

  return (
    <View style={styles.screen}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Review inspection</Text>
        <Text style={styles.name}>{draft.vendorAlias.trim()}</Text>
        <Text style={styles.body}>
          {draft.stallCode} · {draft.category}
        </Text>
        <Text style={styles.body}>{draft.contactNumber}</Text>
        <Text style={styles.body}>Risk: {draft.riskLevel}</Text>
        <Text style={styles.body}>Consent: {draft.consent ? 'Yes' : 'No'}</Text>
        {draft.imageUri ? (
          <Image accessibilityLabel="Evidence photo" source={{ uri: draft.imageUri }} style={styles.photo} />
        ) : null}
        <Text style={styles.body}>Recorded at {recordedAt}</Text>
        <Text style={styles.code}>{GROUP_CODE}</Text>
        <Text style={styles.support}>
          {EVIDENCE_SUPPORT.role}: {EVIDENCE_SUPPORT.name}
        </Text>
        <Pressable accessibilityRole="button" onPress={save} style={styles.button}>
          <Text style={styles.buttonText}>Save inspection</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => navigation.goBack()} style={styles.secondary}>
          <Text style={styles.secondaryText}>Back to edit</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: space.screen,
    gap: 8,
    paddingBottom: 32,
  },
  heading: {
    color: colors.text,
    fontSize: type.title,
    fontWeight: '700',
    marginBottom: 4,
  },
  name: {
    color: colors.text,
    fontSize: type.cardTitle,
    fontWeight: '700',
  },
  body: {
    color: colors.text,
    fontSize: type.body,
  },
  code: {
    color: colors.muted,
    fontSize: type.meta,
    letterSpacing: 0.6,
  },
  support: {
    color: colors.muted,
    fontSize: type.meta,
  },
  photo: {
    width: '100%',
    minHeight: 160,
    borderRadius: space.radius,
    backgroundColor: colors.placeholder,
  },
  button: {
    minHeight: space.touch,
    marginTop: 8,
    borderRadius: space.radius,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.onPrimary,
    fontSize: type.body,
    fontWeight: '700',
  },
  secondary: {
    minHeight: space.touch,
    borderRadius: space.radius,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryText: {
    color: colors.primary,
    fontSize: type.body,
    fontWeight: '700',
  },
});
