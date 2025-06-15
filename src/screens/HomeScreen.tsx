import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { LinearGradient } from 'expo-linear-gradient';
import { VenueCard } from '../components/VenueCard';
import { useVenues } from '../hooks/useVenues';
import { useAuth } from '../hooks/useAuth';
import { RootStackParamList } from '../navigation/types';
import { colors, typography, spacing, shadows } from '../constants/theme';
import { Venue } from '../types/venue';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'VenueDetails'>;

const { width } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [popularVenues, setPopularVenues] = useState<Venue[]>([]);
  const [nearbyVenues, setNearbyVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  const { data: venues = [] } = useVenues(null);

  const loadData = async () => {
    setLoading(true);
    try {
      // Mock data for demo - in real app, this would fetch from API
      const mockPopular = venues.slice(0, 3);
      const mockNearby = venues.slice(3, 6);
      
      setPopularVenues(mockPopular);
      setNearbyVenues(mockNearby);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleVenuePress = (venue: Venue) => {
    navigation.navigate('VenueDetails', { venueId: venue.id });
  };

  const QuickActionCard = ({ icon, label, description, onPress, bgColor }: {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    description: string;
    onPress: () => void;
    bgColor: string;
  }) => (
    <TouchableOpacity style={styles.quickActionCard} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: bgColor }]}>
        <Ionicons name={icon} size={24} color={colors.surface} />
      </View>
      <View style={styles.quickActionContent}>
        <Text style={styles.quickActionLabel}>{label}</Text>
        <Text style={styles.quickActionDesc}>{description}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color={colors.text.tertiary} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Finding family-friendly spots...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>
              {user ? `Hello, ${user.user_metadata?.name || 'Parent'}!` : 'Good day!'}
            </Text>
            <Text style={styles.subtitle}>Let's find the perfect spot for your family</Text>
          </View>
          <TouchableOpacity 
            style={styles.profileButton}
            onPress={() => navigation.navigate('Profile' as never)}
          >
            <View style={styles.profileIcon}>
              <Ionicons name="person" size={20} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* AI Assistant Hero Card */}
        <View style={styles.heroSection}>
          <TouchableOpacity 
            style={styles.aiHeroCard}
            onPress={() => navigation.navigate('AIAssistant')}
          >
            <LinearGradient
              colors={[colors.primary, colors.primaryLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.aiHeroGradient}
            >
              <View style={styles.aiHeroContent}>
                <View style={styles.aiHeroText}>
                  <Text style={styles.aiHeroTitle}>AI Assistant</Text>
                  <Text style={styles.aiHeroSubtitle}>
                    "Find me a quiet café with baby changing facilities near Oxford Street"
                  </Text>
                  <View style={styles.aiHeroButton}>
                    <Text style={styles.aiHeroButtonText}>Try it now</Text>
                    <Ionicons name="sparkles" size={16} color={colors.primary} />
                  </View>
                </View>
                <View style={styles.aiHeroIcon}>
                  <Ionicons name="chatbubbles" size={48} color="rgba(255,255,255,0.3)" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What are you looking for?</Text>
          <View style={styles.quickActionsContainer}>
            <QuickActionCard
              icon="medical"
              label="Baby changing"
              description="Rooms with changing facilities"
              bgColor="#E91E63"
              onPress={() => navigation.navigate('Search', { query: 'baby changing' })}
            />
            <QuickActionCard
              icon="restaurant"
              label="High chairs"
              description="Child-friendly dining"
              bgColor={colors.secondary}
              onPress={() => navigation.navigate('Search', { query: 'high chairs' })}
            />
            <QuickActionCard
              icon="car"
              label="Easy parking"
              description="Convenient access"
              bgColor={colors.info}
              onPress={() => navigation.navigate('Search', { query: 'parking' })}
            />
            <QuickActionCard
              icon="accessibility"
              label="Accessible"
              description="Wheelchair friendly"
              bgColor={colors.success}
              onPress={() => navigation.navigate('Search', { query: 'wheelchair accessible' })}
            />
          </View>
        </View>

        {/* Popular Venues */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular this week</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
              <Text style={styles.linkText}>See all</Text>
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {popularVenues.map((venue, index) => (
              <View key={venue.id} style={[styles.popularVenueCard, { marginLeft: index === 0 ? spacing.component.pageMargin : spacing.sm }]}>
                <VenueCard
                  venue={venue}
                  onPress={() => handleVenuePress(venue)}
                  style={styles.compactVenueCard}
                />
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Nearby Venues */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Near you in Oxford</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Map')}>
              <Text style={styles.linkText}>View map</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.nearbyVenuesContainer}>
            {nearbyVenues.map((venue) => (
              <VenueCard
                key={venue.id}
                venue={venue}
                onPress={() => handleVenuePress(venue)}
                style={styles.fullWidthVenueCard}
              />
            ))}
          </View>
        </View>

        {/* Bottom spacing for tab bar */}
        <View style={{ height: spacing.xxxl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  loadingText: {
    ...typography.bodyMedium,
    color: colors.text.secondary,
    marginTop: spacing.md,
    textAlign: 'center',
  },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: spacing.component.pageMargin,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  headerContent: {
    flex: 1,
  },
  greeting: {
    ...typography.h2,
    color: colors.text.primary,
    fontWeight: '600',
  },
  subtitle: {
    ...typography.bodyMedium,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    lineHeight: 22,
  },
  profileButton: {
    marginLeft: spacing.md,
  },
  profileIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surfaceSecondary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },

  // Hero Section
  heroSection: {
    paddingHorizontal: spacing.component.pageMargin,
    marginBottom: spacing.component.sectionSpacing,
  },
  aiHeroCard: {
    borderRadius: spacing.md,
    overflow: 'hidden',
    ...shadows.md,
  },
  aiHeroGradient: {
    padding: spacing.lg,
  },
  aiHeroContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiHeroText: {
    flex: 1,
  },
  aiHeroTitle: {
    ...typography.h3,
    color: colors.text.inverse,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  aiHeroSubtitle: {
    ...typography.bodySmall,
    color: colors.text.inverse,
    opacity: 0.9,
    marginBottom: spacing.md,
    lineHeight: 20,
    fontStyle: 'italic',
  },
  aiHeroButton: {
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: spacing.sm,
    alignSelf: 'flex-start',
    gap: spacing.xs,
  },
  aiHeroButtonText: {
    ...typography.label,
    color: colors.primary,
    fontWeight: '600',
  },
  aiHeroIcon: {
    marginLeft: spacing.md,
  },

  // Sections
  section: {
    marginBottom: spacing.component.sectionSpacing,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.component.pageMargin,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    fontWeight: '600',
  },
  linkText: {
    ...typography.bodyMedium,
    color: colors.primary,
    fontWeight: '500',
  },

  // Quick Actions
  quickActionsContainer: {
    paddingHorizontal: spacing.component.pageMargin,
    gap: spacing.sm,
  },
  quickActionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    padding: spacing.md,
    borderRadius: spacing.md,
    ...shadows.sm,
  },
  quickActionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  quickActionContent: {
    flex: 1,
  },
  quickActionLabel: {
    ...typography.h4,
    color: colors.text.primary,
    fontWeight: '500',
    marginBottom: spacing.xs,
  },
  quickActionDesc: {
    ...typography.bodySmall,
    color: colors.text.secondary,
  },

  // Venue Lists
  horizontalScroll: {
    paddingRight: spacing.component.pageMargin,
  },
  popularVenueCard: {
    marginRight: spacing.sm,
  },
  compactVenueCard: {
    width: width * 0.7,
  },
  nearbyVenuesContainer: {
    paddingHorizontal: spacing.component.pageMargin,
    gap: spacing.md,
  },
  fullWidthVenueCard: {
    // No additional styles needed, full width by default
  },
});