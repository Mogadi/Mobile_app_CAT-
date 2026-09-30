import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CatalogScreen } from '../screens/CatalogScreen';
import { InspectionDetailScreen } from '../screens/InspectionDetailScreen';
import { NewInspectionScreen } from '../screens/NewInspectionScreen';
import { RecordsScreen } from '../screens/RecordsScreen';
import { ReviewScreen } from '../screens/ReviewScreen';
import { colors, space, type } from '../theme/tokens';
import { RootStackParamList, TabParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarLabelStyle: { fontSize: type.meta, fontWeight: '700' },
        tabBarStyle: { minHeight: space.touch + 16 },
        tabBarItemStyle: { minHeight: space.touch },
      }}
    >
      <Tab.Screen
        name="Home"
        component={CatalogScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'storefront' : 'storefront-outline'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="NewInspection"
        component={NewInspectionScreen}
        options={{
          title: 'New Inspection',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'clipboard' : 'clipboard-outline'} color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Records"
        component={RecordsScreen}
        options={{
          title: 'Records',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons name={focused ? 'folder' : 'folder-outline'} color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Review" component={ReviewScreen} />
        <Stack.Screen name="InspectionDetail" component={InspectionDetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
