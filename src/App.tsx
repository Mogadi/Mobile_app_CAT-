import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { RootNavigator } from './navigation/RootNavigator';
import { InspectionSessionProvider } from './state/InspectionSession';

export default function App() {
  return (
    <SafeAreaProvider>
      <InspectionSessionProvider>
        <RootNavigator />
        <StatusBar style="light" />
      </InspectionSessionProvider>
    </SafeAreaProvider>
  );
}
