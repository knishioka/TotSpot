import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { venueService } from '../services/venueService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { colors, spacing, typography } from '../constants/theme';
import { Venue } from '../types/venue';
import { RootStackParamList } from '../navigation/types';

type SavedScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export const SavedScreen: React.FC = () => {
  const navigation = useNavigation<SavedScreenNavigationProp>();
  const { user } = useAuth();
  const [savedVenues, setSavedVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadSavedVenues();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadSavedVenues = async () => {
    // In a real app, this would fetch from the favorites table
    setLoading(true);
    try {
      // Mock data for now
      const data = await venueService.searchNearby(
        { latitude: 51.7520, longitude: -1.2577 },
        { radius: 10000 }
      );
      // Simulate saved venues (first 3)
      setSavedVenues(data.slice(0, 3));
    } catch (error) {
      console.error('Error loading saved venues:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFacilityIcons = (venue: Venue) => {
    const icons = [];
    if (venue.has_baby_change) icons.push('🍼');
    if (venue.has_high_chair) icons.push('🪑');
    if (venue.has_parking) icons.push('🚗');
    if (venue.has_play_area) icons.push('🧸');
    if (venue.has_outdoor_space) icons.push('🌳');
    if (venue.has_nursing_room) icons.push('🤱');
    return icons.join(' ');
  };

  const renderVenueItem = ({ item }: { item: Venue }) => (
    <TouchableOpacity
      style={styles.venueItem}
      onPress={() => navigation.navigate('VenueDetails', { venueId: item.id })}
    >
      <View style={styles.venueContent}>
        <View style={styles.venueInfo}>
          <Text style={styles.venueName}>{item.name}</Text>
          <Text style={styles.venueAddress}>{item.address}</Text>
          <Text style={styles.venueFacilities}>
            {getFacilityIcons(item) || 'No facilities listed'}
          </Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.text.secondary} />
      </View>
    </TouchableOpacity>
  );

  if (!user) {
    return (
      <View style={styles.notLoggedIn}>
        <Ionicons name="heart" size={60} color={colors.text.secondary} />
        <Text style={styles.notLoggedInText}>Save your favorite venues</Text>
        <Text style={styles.notLoggedInSubtext}>
          Sign in to save venues and access them anytime
        </Text>
      </View>
    );
  }

  if (loading) {
    return <LoadingSpinner />;
  }

  if (savedVenues.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons name="heart-outline" size={60} color={colors.text.secondary} />
        <Text style={styles.emptyText}>No saved venues yet</Text>
        <Text style={styles.emptySubtext}>
          Tap the heart icon on venues you want to save for later
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={savedVenues}
        renderItem={renderVenueItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  notLoggedIn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  notLoggedInText: {
    ...typography.h3,
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  notLoggedInSubtext: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  emptyText: {
    ...typography.h3,
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  emptySubtext: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  listContent: {
    paddingVertical: spacing.sm,
  },
  venueItem: {
    backgroundColor: 'white',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  venueContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  venueInfo: {
    flex: 1,
  },
  venueName: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  venueAddress: {
    ...typography.small,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  venueFacilities: {
    ...typography.body,
    fontSize: 18,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
  },
});