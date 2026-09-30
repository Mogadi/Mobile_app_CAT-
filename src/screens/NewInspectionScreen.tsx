import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { AppHeader } from '../components/AppHeader';
import { ChoiceField } from '../components/ChoiceField';
import { TextField } from '../components/TextField';
import { RootStackParamList } from '../navigation/types';
import { useInspectionSession } from '../state/InspectionSession';
import { colors, space, type } from '../theme/tokens';
import { CATEGORIES, RISK_LEVELS } from '../types/inspection';
import { fieldError, InspectionErrors, InspectionField, validateInspection } from '../validation/inspection';

export function NewInspectionScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { draft, updateDraft } = useInspectionSession();
  const [errors, setErrors] = useState<InspectionErrors>({});

  function change<K extends InspectionField>(field: K, value: InspectionDraftValue<K>) {
    const next = { ...draft, [field]: value };
    updateDraft({ [field]: value });
    if (errors[field]) {
      setErrors((current) => ({ ...current, [field]: fieldError(next, field) }));
    }
  }

  function continueToReview() {
    const nextErrors = validateInspection(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }
    navigation.navigate('Review', { draft, openedAt: new Date().toISOString() });
  }

  return (
    <View style={styles.screen}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.heading}>New inspection</Text>
        <TextField
          label="Vendor alias"
          value={draft.vendorAlias}
          onChangeText={(value) => change('vendorAlias', value)}
          error={errors.vendorAlias}
        />
        <TextField
          label="Stall code"
          value={draft.stallCode}
          onChangeText={(value) => change('stallCode', value)}
          error={errors.stallCode}
          hint="Example: MZ-A-014"
          autoCapitalize="none"
        />
        <ChoiceField
          label="Category"
          options={CATEGORIES}
          value={draft.category}
          error={errors.category}
          onChange={(value) => change('category', value as (typeof CATEGORIES)[number])}
        />
        <TextField
          label="Contact number"
          value={draft.contactNumber}
          onChangeText={(value) => change('contactNumber', value)}
          error={errors.contactNumber}
          hint="Example: +250 788 123 456"
          autoCapitalize="none"
        />
        <ChoiceField
          label="Risk level"
          options={RISK_LEVELS}
          value={draft.riskLevel}
          error={errors.riskLevel}
          onChange={(value) => change('riskLevel', value as (typeof RISK_LEVELS)[number])}
        />
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: draft.consent }}
          onPress={() => change('consent', !draft.consent)}
          style={styles.consent}
        >
          <Ionicons
            name={draft.consent ? 'checkbox' : 'square-outline'}
            size={28}
            color={colors.primary}
          />
          <Text style={styles.consentText}>I confirm this record uses fictional demo data only.</Text>
        </Pressable>
        {errors.consent ? <Text style={styles.error}>{errors.consent}</Text> : null}
        <View style={styles.photo}>
          <Text style={styles.photoLabel}>Evidence photo</Text>
          <Text style={styles.hint}>
            {draft.imageUri ? 'A preview is attached.' : 'A photo is required before review.'}
          </Text>
          {errors.imageUri ? <Text style={styles.error}>{errors.imageUri}</Text> : null}
        </View>
        <Pressable accessibilityRole="button" onPress={continueToReview} style={styles.button}>
          <Text style={styles.buttonText}>Continue to review</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

type InspectionDraftValue<K extends InspectionField> = K extends 'consent'
  ? boolean
  : K extends 'imageUri'
    ? string | null
    : string;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: space.screen,
    gap: space.gap,
    paddingBottom: 32,
  },
  heading: {
    color: colors.text,
    fontSize: type.title,
    fontWeight: '700',
  },
  consent: {
    minHeight: space.touch,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  consentText: {
    flex: 1,
    color: colors.text,
    fontSize: type.body,
  },
  photo: {
    gap: 4,
  },
  photoLabel: {
    color: colors.text,
    fontSize: type.body,
    fontWeight: '700',
  },
  hint: {
    color: colors.muted,
    fontSize: type.meta,
  },
  error: {
    color: colors.flagged,
    fontSize: type.meta,
  },
  button: {
    minHeight: space.touch,
    borderRadius: space.radius,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonText: {
    color: colors.onPrimary,
    fontSize: type.body,
    fontWeight: '700',
  },
});
