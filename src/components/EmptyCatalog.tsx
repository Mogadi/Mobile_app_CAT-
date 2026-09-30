import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, space, type } from '../theme/tokens';

type Props = {
  onClear: () => void;
};

export function EmptyCatalog({ onClear }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>No stalls match</Text>
      <Text style={styles.body}>Nothing in today’s pilot uses that name.</Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Clear search"
        onPress={onClear}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Clear search</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    paddingVertical: 24,
    gap: 8,
  },
  title: {
    color: colors.text,
    fontSize: type.title,
    fontWeight: '700',
  },
  body: {
    color: colors.muted,
    fontSize: type.body,
  },
  button: {
    alignSelf: 'flex-start',
    minHeight: space.touch,
    marginTop: 8,
    paddingHorizontal: 16,
    borderRadius: space.radius,
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.primary,
    fontSize: type.body,
    fontWeight: '700',
  },
});
