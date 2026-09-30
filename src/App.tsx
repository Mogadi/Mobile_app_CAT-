import { StatusBar } from 'expo-status-bar';

import { CatalogScreen } from './screens/CatalogScreen';

export default function App() {
  return (
    <>
      <CatalogScreen />
      <StatusBar style="light" />
    </>
  );
}
