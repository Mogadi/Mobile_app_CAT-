import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, space, type } from '../theme/tokens';
import { evidenceNotice, EvidenceSource, pickEvidence } from './pickEvidence';

type Props = {
  imageUri: string | null;
  error?: string;
  onChange: (imageUri: string | null) => void;
};

export function EvidencePhotoField({ imageUri, error, onChange }: Props) {
  const [notice, setNotice] = useState<string | null>(null);
  const [lastSource, setLastSource] = useState<EvidenceSource>('camera');

  async function choose(source: EvidenceSource) {
    setLastSource(source);
    const result = await pickEvidence(source);
    if (result.status === 'selected') {
      setNotice(null);
      onChange(result.uri);
      return;
    }
    setNotice(evidenceNotice(result));
  }

  function remove() {
    setNotice(null);
    onChange(null);
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>Evidence photo</Text>
      {imageUri ? (
        <Image accessibilityLabel="Evidence photo preview" source={{ uri: imageUri }} style={styles.preview} />
      ) : (
        <Text style={styles.hint}>A photo is required before review.</Text>
      )}
      {imageUri ? (
        <Pressable
          accessibilityRole="button"
          onPress={() => choose(lastSource)}
          style={styles.primary}
        >
          <Text style={styles.primaryText}>Replace photo</Text>
        </Pressable>
      ) : null}
      <Pressable accessibilityRole="button" onPress={() => choose('camera')} style={styles.secondary}>
        <Text style={styles.secondaryText}>{imageUri ? 'Take another photo' : 'Capture photo'}</Text>
      </Pressable>
      <Pressable accessibilityRole="button" onPress={() => choose('gallery')} style={styles.secondary}>
        <Text style={styles.secondaryText}>
          {imageUri ? 'Choose another from gallery' : 'Choose from gallery'}
        </Text>
      </Pressable>
      {imageUri ? (
        <Pressable accessibilityRole="button" onPress={remove} style={styles.secondary}>
          <Text style={styles.secondaryText}>Remove photo</Text>
        </Pressable>
      ) : null}
      {notice ? <Text style={styles.notice}>{notice}</Text> : null}
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
  hint: {
    color: colors.muted,
    fontSize: type.meta,
  },
  preview: {
    width: '100%',
    height: 180,
    borderRadius: space.radius,
    backgroundColor: colors.placeholder,
  },
  primary: {
    minHeight: space.touch,
    borderRadius: space.radius,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primaryText: {
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
    paddingHorizontal: 16,
  },
  secondaryText: {
    color: colors.primary,
    fontSize: type.body,
    fontWeight: '700',
    textAlign: 'center',
  },
  notice: {
    color: colors.accent,
    fontSize: type.body,
  },
  error: {
    color: colors.flagged,
    fontSize: type.meta,
  },
});
