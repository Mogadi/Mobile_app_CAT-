import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, space, type } from '../theme/tokens';

type Props = {
  label: string;
  options: readonly string[];
  value: string;
  error?: string;
  onChange: (value: string) => void;
};

export function ChoiceField({ label, options, value, error, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      {options.map((option) => {
        const selected = option === value;
        return (
          <Pressable
            key={option}
            accessibilityRole="button"
            accessibilityState={{ selected }}
            accessibilityLabel={selected ? `${option}, selected` : option}
            onPress={() => onChange(option)}
            style={[styles.row, selected ? styles.rowSelected : null]}
          >
            <Text style={styles.option}>{option}</Text>
            {selected ? <Text style={styles.selected}>Selected</Text> : null}
          </Pressable>
        );
      })}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 8,
  },
  label: {
    color: colors.text,
    fontSize: type.body,
    fontWeight: '700',
  },
  row: {
    minHeight: space.touch,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: space.radius,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  rowSelected: {
    borderColor: colors.primary,
  },
  option: {
    color: colors.text,
    fontSize: type.body,
    flexShrink: 1,
  },
  selected: {
    color: colors.primary,
    fontSize: type.meta,
    fontWeight: '700',
  },
  error: {
    color: colors.flagged,
    fontSize: type.meta,
  },
});
