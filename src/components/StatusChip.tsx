import { StyleSheet, Text, View } from 'react-native';

import { colors, type } from '../theme/tokens';
import { StallStatus } from '../types/zone';

const PALETTE: Record<StallStatus, { color: string; backgroundColor: string }> = {
  Open: { color: colors.open, backgroundColor: colors.openBg },
  Pending: { color: colors.pending, backgroundColor: colors.pendingBg },
  Flagged: { color: colors.flagged, backgroundColor: colors.flaggedBg },
  Closed: { color: colors.closed, backgroundColor: colors.closedBg },
};

type Props = {
  status: StallStatus;
};

export function StatusChip({ status }: Props) {
  const palette = PALETTE[status];

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`Status ${status}`}
      style={[styles.chip, { borderColor: palette.color, backgroundColor: palette.backgroundColor }]}
    >
      <Text style={[styles.label, { color: palette.color }]}>{status}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 6,
  },
  label: {
    fontSize: type.meta,
    fontWeight: '700',
  },
});
