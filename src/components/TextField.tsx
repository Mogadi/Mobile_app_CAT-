import { StyleSheet, Text, TextInput, View } from 'react-native';

import { colors, space, type } from '../theme/tokens';

type Props = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  error?: string;
  hint?: string;
  autoCapitalize?: 'none' | 'words' | 'sentences';
  keyboardType?: 'default' | 'phone-pad';
};

export function TextField({
  label,
  value,
  onChangeText,
  error,
  hint,
  autoCapitalize = 'sentences',
  keyboardType = 'default',
}: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel={label}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        keyboardType={keyboardType}
        placeholderTextColor={colors.muted}
        style={[styles.input, error ? styles.inputError : null]}
      />
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 4,
  },
  label: {
    color: colors.text,
    fontSize: type.body,
    fontWeight: '700',
  },
  input: {
    minHeight: space.touch,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: space.radius,
    backgroundColor: colors.surface,
    paddingHorizontal: 12,
    color: colors.text,
    fontSize: type.body,
  },
  inputError: {
    borderColor: colors.flagged,
  },
  hint: {
    color: colors.muted,
    fontSize: type.meta,
  },
  error: {
    color: colors.flagged,
    fontSize: type.meta,
  },
});
