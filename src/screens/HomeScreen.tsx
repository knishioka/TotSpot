import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { RootStackParamList } from '../navigation/types';
import { colors, typography, spacing } from '../constants/theme';
import { useAuth } from '../hooks/useAuth';
import { useLocation } from '../hooks/useLocation';
import { venueService } from '../services/venueService';
import { Venue } from '../types/venue';
import { VenueCard } from '../components/VenueCard';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

interface QuickActionProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  onPress: () => void;
}

const QuickAction: React.FC<QuickActionProps> = ({ icon, label, color, onPress }) => (
  <TouchableOpacity style={styles.quickAction} onPress={onPress}>
    <View style={[styles.quickActionIcon, { backgroundColor: color }]}>
      <Ionicons name={icon} size={24} color="white" />
    </View>
    <Text style={styles.quickActionLabel}>{label}</Text>
  </TouchableOpacity>
);

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user } = useAuth();
  const { location } = useLocation();
  const [nearbyVenues, setNearbyVenues] = useState<Venue[]>([]);
  const [popularVenues, setPopularVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadData();
  }, [location]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load nearby venues if location is available
      if (location) {
        const nearby = await venueService.searchNearby(location, { radius: 5000 });
        setNearbyVenues(nearby.slice(0, 5));
      }

      // Load popular venues (those with high ratings)
      const popular = await venueService.getPopular();
      setPopularVenues(popular.slice(0, 5));

    } catch (error) {
      console.error('Error loading home data:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleQuickAction = (facility: string) => {
    navigation.navigate('Map', {
      filters: {
        facilities: [facility],
      },
    });
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigation.navigate('Search', { query: searchQuery });
    }
  };

  const handleVenuePress = (venue: Venue) => {
    navigation.navigate('VenueDetails', { venueId: venue.id });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>
              {user ? `Hello, ${user.user_metadata?.display_name || 'Parent'}!` : 'Welcome!'}
            </Text>
            <Text style={styles.subtitle}>Find family-friendly venues near you</Text>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => navigation.navigate('Profile')}
            >
              <Ionicons name="person-circle-outline" size={32} color={colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {/* AI Assistant CTA */}
        <TouchableOpacity 
          style={styles.aiCtaContainer}
          onPress={() => navigation.navigate('AIAssistant')}
        >
          <LinearGradient
            colors={[colors.primary, '#3DBBB3']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.aiCtaGradient}
          >
            <View style={styles.aiCtaContent}>
              <Ionicons name="sparkles" size={32} color="white" />
              <View style={styles.aiCtaTextContainer}>
                <Text style={styles.aiCtaTitle}>Ask AI Assistant</Text>
                <Text style={styles.aiCtaSubtitle}>Get personalized recommendations for your family</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="white" />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={colors.text.secondary} />
            <TextInput
              style={styles.searchInput}
              placeholder="Or search manually..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              returnKeyType="search"
            />
          </View>
          <TouchableOpacity style={styles.mapButton} onPress={() => navigation.navigate('Map')}>
            <Ionicons name="map" size={24} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Find</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickActions}
          >
            <QuickAction
              icon="water"
              label="Nursing Room"
              color="#FF6B6B"
              onPress={() => handleQuickAction('nursing_room')}
            />
            <QuickAction
              icon="body"
              label="Baby Changing"
              color="#4ECDC4"
              onPress={() => handleQuickAction('baby_changing')}
            />
            <QuickAction
              icon="restaurant"
              label="High Chairs"
              color="#95E1D3"
              onPress={() => handleQuickAction('high_chairs')}
            />
            <QuickAction
              icon="car"
              label="Parking"
              color="#FFA502"
              onPress={() => handleQuickAction('parking')}
            />
            <QuickAction
              icon="fitness"
              label="Play Area"
              color="#A29BFE"
              onPress={() => handleQuickAction('play_area')}
            />
          </ScrollView>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : (
          <>
            {/* Nearby Venues */}
            {nearbyVenues.length > 0 && (
              <View style={styles.section}>
                <View style={styles.sectionHeader}>
                  <Text style={styles.sectionTitle}>Nearby Venues</Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                    <Text style={styles.seeAll}>See all</Text>
                  </TouchableOpacity>
                </View>
                {nearbyVenues.map((venue) => (
                  <VenueCard
                    key={venue.id}
                    venue={venue}
                    onPress={() => handleVenuePress(venue)}
                    style={styles.venueCard}
                  />
                ))}
              </View>
            )}

            {/* Popular Venues */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Popular in Oxford</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Search', { sortBy: 'rating' })}>
                  <Text style={styles.seeAll}>See all</Text>
                </TouchableOpacity>
              </View>
              {popularVenues.map((venue) => (
                <VenueCard
                  key={venue.id}
                  venue={venue}
                  onPress={() => handleVenuePress(venue)}
                  style={styles.venueCard}
                />
              ))}
            </View>

            {/* Call to Action for non-logged in users */}
            {!user && (
              <View style={styles.ctaContainer}>
                <Text style={styles.ctaTitle}>Join the TotSpot Community</Text>
                <Text style={styles.ctaDescription}>
                  Create an account to save favorites, write reviews, and add new venues
                </Text>
                <TouchableOpacity
                  style={styles.ctaButton}
                  onPress={() => navigation.navigate('Auth')}
                >
                  <Text style={styles.ctaButtonText}>Sign Up Free</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* Floating Add Button */}
      {user && (
        <TouchableOpacity
          style={styles.fab}
          onPress={() => navigation.navigate('AddVenue')}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  greeting: {
    ...typography.h2,
    color: colors.text.primary,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  aiButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subtitle: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  profileButton: {
    padding: spacing.xs,
  },
  aiCtaContainer: {
    marginHorizontal: spacing.lg,
    marginVertical: spacing.md,
  },
  aiCtaGradient: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  aiCtaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
  },
  aiCtaTextContainer: {
    flex: 1,
    marginHorizontal: spacing.md,
  },
  aiCtaTitle: {
    ...typography.h3,
    color: 'white',
    marginBottom: spacing.xs,
  },
  aiCtaSubtitle: {
    ...typography.body,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    marginLeft: spacing.sm,
    color: colors.text.primary,
  },
  mapButton: {
    width: 48,
    height: 48,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  section: {
    marginTop: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
  },
  seeAll: {
    ...typography.body,
    color: colors.primary,
  },
  quickActions: {
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
  },
  quickAction: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  quickActionIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  quickActionLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    textAlign: 'center',
    width: 72,
  },
  venueCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  ctaContainer: {
    backgroundColor: colors.primary + '10',
    margin: spacing.lg,
    padding: spacing.lg,
    borderRadius: 16,
    alignItems: 'center',
  },
  ctaTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  ctaDescription: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: 12,
  },
  ctaButtonText: {
    ...typography.bodyBold,
    color: 'white',
  },
  fab: {
    position: 'absolute',
    right: spacing.lg,
    bottom: spacing.xl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
});