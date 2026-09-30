import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppHeader } from '../components/AppHeader';
import { GROUP_CODE } from '../constants/group';
import { RootStackParamList } from '../navigation/types';
import { useInspectionSession } from '../state/InspectionSession';
import { colors, space, type } from '../theme/tokens';
import { formatRecordedAt } from '../validation/formatRecordedAt';

type Props = NativeStackScreenProps<RootStackParamList, 'InspectionDetail'>;

export function InspectionDetailScreen({ route }: Props) {
  const { inspectionId } = route.params;
  const { records } = useInspectionSession();
  const record = records.find((item) => item.id === inspectionId);

  return (
    <View style={styles.screen}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Inspection detail</Text>
        {record ? (
          <>
            <Text style={styles.name}>{record.vendorAlias}</Text>
            <Text style={styles.body}>
              {record.stallCode} · {record.category}
            </Text>
            <Text style={styles.body}>{record.contactNumber}</Text>
            <Text style={styles.body}>Risk: {record.riskLevel}</Text>
            <Text style={styles.body}>Consent: Yes</Text>
            <Image
              accessibilityLabel="Evidence photo"
              source={{ uri: record.imageUri }}
              style={styles.photo}
            />
            <Text style={styles.body}>Recorded at {formatRecordedAt(record.createdAt)}</Text>
            <Text style={styles.code}>{GROUP_CODE}</Text>
          </>
        ) : (
          <Text style={styles.body}>This inspection is not in the current session.</Text>
        )}
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
  photo: {
    width: '100%',
    minHeight: 160,
    borderRadius: space.radius,
    backgroundColor: colors.placeholder,
  },
});
