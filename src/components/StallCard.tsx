import { StyleSheet, Text, View } from 'react-native';

import { colors, space, type } from '../theme/tokens';
import { Zone } from '../types/zone';
import { StatusChip } from './StatusChip';

type Props = {
  zone: Zone;
};

export function StallCard({ zone }: Props) {
  return (
    <View
      accessibilityLabel={`${zone.name}, ${zone.category}, priority ${zone.priority}, status ${zone.status}`}
      style={styles.card}
    >
      <View style={styles.placeholder}>
        <Text style={styles.placeholderText}>{zone.placeholderLabel}</Text>
      </View>
      <View style={styles.copy}>
        <Text style={styles.name}>{zone.name}</Text>
        <Text style={styles.meta}>
          {zone.category} · {zone.priority}
        </Text>
        <StatusChip status={zone.status} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: space.gap,
    minHeight: space.touch,
    backgroundColor: colors.surface,
    borderRadius: space.radius,
    borderWidth: 1,
    borderColor: colors.border,
    padding: space.card,
  },
  placeholder: {
    width: 72,
    minHeight: 72,
    flexGrow: 0,
    borderRadius: 4,
    backgroundColor: colors.placeholder,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  placeholderText: {
    color: colors.muted,
    fontSize: type.meta,
    textAlign: 'center',
  },
  copy: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 140,
  },
  name: {
    color: colors.text,
    fontSize: type.cardTitle,
    fontWeight: '700',
  },
  meta: {
    color: colors.muted,
    fontSize: type.body,
    marginTop: 2,
  },
});
