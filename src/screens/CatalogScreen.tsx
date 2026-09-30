import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, TextInput, View } from 'react-native';

import { AppHeader } from '../components/AppHeader';
import { EmptyCatalog } from '../components/EmptyCatalog';
import { StallCard } from '../components/StallCard';
import { ZONES } from '../data/zones';
import { colors, space, type } from '../theme/tokens';
import { Zone } from '../types/zone';

export function CatalogScreen() {
  const [query, setQuery] = useState('');

  const stalls = useMemo(() => {
    const needle = query.trim().toLowerCase();
    if (!needle) {
      return ZONES;
    }
    return ZONES.filter((zone) => {
      return (
        zone.name.toLowerCase().includes(needle) ||
        zone.category.toLowerCase().includes(needle)
      );
    });
  }, [query]);

  return (
    <View style={styles.screen}>
      <AppHeader />
      <FlatList
        data={stalls}
        keyExtractor={(zone: Zone) => zone.id}
        contentContainerStyle={styles.list}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search stalls"
            placeholderTextColor={colors.muted}
            accessibilityLabel="Search stalls"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.search}
          />
        }
        ListEmptyComponent={<EmptyCatalog onClear={() => setQuery('')} />}
        renderItem={({ item }) => <StallCard zone={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: space.screen,
    gap: space.gap,
    flexGrow: 1,
  },
  search: {
    minHeight: space.touch,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: space.radius,
    paddingHorizontal: 12,
    color: colors.text,
    fontSize: type.body,
    marginBottom: space.gap,
  },
});
