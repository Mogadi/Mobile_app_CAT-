import { StyleSheet, Text, View } from 'react-native';

import { APP_TITLE, GROUP_CODE } from '../constants/group';
import { colors, space, type } from '../theme/tokens';

export function AppHeader() {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{APP_TITLE}</Text>
      <Text style={styles.code}>{GROUP_CODE}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    paddingTop: 48,
    paddingHorizontal: space.screen,
    paddingBottom: space.screen,
  },
  title: {
    color: colors.onPrimary,
    fontSize: type.title,
    fontWeight: '700',
  },
  code: {
    color: colors.onPrimary,
    fontSize: type.meta,
    marginTop: 4,
    letterSpacing: 0.6,
  },
});
