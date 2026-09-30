import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { AppHeader } from '../components/AppHeader';
import { RootStackParamList } from '../navigation/types';
import { useInspectionSession } from '../state/InspectionSession';
import { colors, space, type } from '../theme/tokens';
import { formatRecordedAt } from '../validation/formatRecordedAt';

export function RecordsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { records } = useInspectionSession();

  return (
    <View style={styles.screen}>
      <AppHeader />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.heading}>Records</Text>
        {records.length === 0 ? (
          <Text style={styles.empty}>No inspections saved in this session.</Text>
        ) : (
          records.map((record) => (
            <Pressable
              key={record.id}
              accessibilityRole="button"
              accessibilityLabel={`${record.vendorAlias}, ${record.stallCode}`}
              onPress={() => navigation.navigate('InspectionDetail', { inspectionId: record.id })}
              style={styles.row}
            >
              <View style={styles.copy}>
                <Text style={styles.name}>{record.vendorAlias}</Text>
                <Text style={styles.meta}>
                  {record.stallCode} · {record.riskLevel}
                </Text>
                <Text style={styles.meta}>{formatRecordedAt(record.createdAt)}</Text>
              </View>
              <Ionicons name="chevron-forward" size={22} color={colors.muted} />
            </Pressable>
          ))
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
    gap: space.gap,
  },
  heading: {
    color: colors.text,
    fontSize: type.title,
    fontWeight: '700',
  },
  empty: {
    color: colors.muted,
    fontSize: type.body,
  },
  row: {
    minHeight: space.touch,
    backgroundColor: colors.surface,
    borderRadius: space.radius,
    borderWidth: 1,
    borderColor: colors.border,
    padding: space.card,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  name: {
    color: colors.text,
    fontSize: type.cardTitle,
    fontWeight: '700',
  },
  meta: {
    color: colors.muted,
    fontSize: type.body,
  },
});
