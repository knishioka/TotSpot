import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, ActivityIndicator } from 'react-native';

// Screens
import { WelcomeScreen } from '../screens/WelcomeScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { MapScreen } from '../screens/MapScreen';
import { VenueDetailsScreen } from '../screens/VenueDetailsScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { AuthScreen } from '../screens/AuthScreen';
import { AddVenueScreen } from '../screens/AddVenueScreen';
import { AIAssistantScreen } from '../screens/AIAssistantScreen';

// Types and hooks
import { RootStackParamList, MainTabParamList } from './types';
import { useAuth } from '../hooks/useAuth';
import { colors } from '../constants/theme';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Import additional screens
import { SearchScreen } from '../screens/SearchScreen';

// Placeholder screens for now
const SavedScreen = () => <View style={{ flex: 1, backgroundColor: colors.background }} />;

const MainTabs: React.FC = () => {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'AIAssistant':
              return null; // Custom icon handled in options
            case 'Map':
              iconName = focused ? 'map' : 'map-outline';
              break;
            case 'Search':
              iconName = focused ? 'search' : 'search-outline';
              break;
            case 'Saved':
              iconName = focused ? 'heart' : 'heart-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              iconName = 'alert-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: colors.border,
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="AIAssistant" 
        component={AIAssistantScreen}
        options={{ 
          title: 'AI Assistant',
          tabBarIcon: ({ focused, color, size }) => (
            <View style={{
              backgroundColor: focused ? colors.primary : 'transparent',
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 4,
            }}>
              <Ionicons 
                name="sparkles" 
                size={size} 
                color={focused ? 'white' : color} 
              />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{ title: 'Map' }}
      />
      <Tab.Screen 
        name="Saved" 
        component={SavedScreen}
        options={{ 
          title: 'Saved',
          tabBarBadge: undefined, // Can add saved count here
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={user ? ProfileScreen : AuthScreen}
        options={{ title: user ? 'Profile' : 'Sign In' }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { user, loading: authLoading } = useAuth();
  const [hasSeenWelcome, setHasSeenWelcome] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkWelcomeStatus();
  }, []);

  const checkWelcomeStatus = async () => {
    try {
      const welcomeStatus = await AsyncStorage.getItem('hasSeenWelcome');
      setHasSeenWelcome(welcomeStatus === 'true');
    } catch (error) {
      console.error('Error checking welcome status:', error);
      setHasSeenWelcome(false);
    } finally {
      setLoading(false);
    }
  };

  if (loading || authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyle: { backgroundColor: colors.background },
        }}
      >
        {!hasSeenWelcome ? (
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen}
          />
        ) : (
          <>
            <Stack.Screen 
              name="Main" 
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="VenueDetails" 
              component={VenueDetailsScreen}
              options={{ 
                headerShown: true,
                headerTitle: 'Venue Details',
                headerStyle: {
                  backgroundColor: 'white',
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                },
                headerTintColor: colors.text.primary,
                headerTitleStyle: {
                  fontWeight: '600',
                },
              }}
            />
            <Stack.Screen 
              name="AddVenue" 
              component={AddVenueScreen}
              options={{ 
                headerShown: true,
                headerTitle: 'Add New Venue',
                headerStyle: {
                  backgroundColor: 'white',
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                },
                headerTintColor: colors.text.primary,
                headerTitleStyle: {
                  fontWeight: '600',
                },
              }}
            />
            <Stack.Screen 
              name="AIAssistant" 
              component={AIAssistantScreen}
              options={{ 
                headerShown: false,
              }}
            />
            <Stack.Screen 
              name="Search" 
              component={SearchScreen}
              options={{ 
                headerShown: true,
                headerTitle: 'Search',
                headerStyle: {
                  backgroundColor: 'white',
                  elevation: 0,
                  shadowOpacity: 0,
                  borderBottomWidth: 1,
                  borderBottomColor: colors.border,
                },
                headerTintColor: colors.text.primary,
                headerTitleStyle: {
                  fontWeight: '600',
                },
              }}
            />
            {!user && (
              <Stack.Screen 
                name="Auth" 
                component={AuthScreen}
                options={{ 
                  headerShown: true,
                  headerTitle: 'Sign In',
                  headerStyle: {
                    backgroundColor: 'white',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                  },
                  headerTintColor: colors.text.primary,
                  headerTitleStyle: {
                    fontWeight: '600',
                  },
                }}
              />
            )}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};