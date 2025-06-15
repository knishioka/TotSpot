import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../navigation/types';
import { colors, typography, spacing } from '../constants/theme';
import { useLocation } from '../hooks/useLocation';
import { venueService } from '../services/venueService';
import { Venue } from '../types/venue';
import { VenueCard } from '../components/VenueCard';

type SearchScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Search'>;
type SearchScreenRouteProp = RouteProp<RootStackParamList, 'Search'>;

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation<SearchScreenNavigationProp>();
  const route = useRoute<SearchScreenRouteProp>();
  const { location } = useLocation();
  const [searchQuery, setSearchQuery] = useState(route.params?.query || '');
  const [venues, setVenues] = useState<Venue[]>([]);
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const facilityFilters = [
    { id: 'baby_changing', label: '🍼 Baby Changing', icon: 'body' },
    { id: 'nursing_room', label: '🤱 Nursing Room', icon: 'water' },
    { id: 'high_chairs', label: '🪑 High Chairs', icon: 'restaurant' },
    { id: 'play_area', label: '🧸 Play Area', icon: 'fitness' },
    { id: 'parking', label: '🚗 Parking', icon: 'car' },
    { id: 'outdoor_seating', label: '🌳 Outdoor Space', icon: 'sunny' },
  ];

  useEffect(() => {
    loadVenues();
  }, [location]);

  useEffect(() => {
    filterVenues();
  }, [searchQuery, selectedFilters, venues]);

  const loadVenues = async () => {
    if (!location) return;
    
    setLoading(true);
    try {
      const data = await venueService.searchNearby(location, { radius: 10000 });
      setVenues(data);
    } catch (error) {
      console.error('Error loading venues:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterVenues = () => {
    let filtered = venues;

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(venue => 
        venue.name.toLowerCase().includes(query) ||
        venue.address.toLowerCase().includes(query) ||
        venue.venue_type?.toLowerCase().includes(query)
      );
    }

    // Filter by facilities
    if (selectedFilters.length > 0) {
      filtered = filtered.filter(venue => {
        return selectedFilters.every(filter => {
          switch(filter) {
            case 'baby_changing':
              return venue.has_baby_changing;
            case 'high_chairs':
              return venue.has_high_chairs;
            case 'nursing_room':
              return venue.has_nursing_room;
            case 'play_area':
              return venue.has_play_area;
            case 'parking':
              return venue.has_parking;
            case 'outdoor_seating':
              return venue.has_outdoor_seating;
            default:
              return false;
          }
        });
      });
    }

    // Sort by rating if requested
    if (route.params?.sortBy === 'rating') {
      filtered = [...filtered].sort((a, b) => 
        (b.average_rating || 0) - (a.average_rating || 0)
      );
    }

    setFilteredVenues(filtered);
  };

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => {
      if (prev.includes(filterId)) {
        return prev.filter(id => id !== filterId);
      } else {
        return [...prev, filterId];
      }
    });
  };

  const handleVenuePress = (venue: Venue) => {
    navigation.navigate('VenueDetails', { venueId: venue.id });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={colors.text.secondary} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search venues, areas, or facilities..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color={colors.text.secondary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Facility Filters */}
      <View style={styles.filtersContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={facilityFilters}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.filterChip,
                selectedFilters.includes(item.id) && styles.filterChipActive
              ]}
              onPress={() => toggleFilter(item.id)}
            >
              <Text style={[
                styles.filterChipText,
                selectedFilters.includes(item.id) && styles.filterChipTextActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.filtersContent}
        />
      </View>

      {/* Results */}
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={styles.loadingText}>Searching venues...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredVenues}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <VenueCard
              venue={item}
              onPress={() => handleVenuePress(item)}
              distance={item.distance}
              style={styles.venueCard}
            />
          )}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="search-outline" size={64} color={colors.text.secondary} />
              <Text style={styles.emptyTitle}>No venues found</Text>
              <Text style={styles.emptyText}>
                {searchQuery 
                  ? `No results for "${searchQuery}"`
                  : 'Try adjusting your filters'
                }
              </Text>
            </View>
          }
        />
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  searchInput: {
    flex: 1,
    ...typography.body,
    marginLeft: spacing.sm,
    color: colors.text.primary,
  },
  filtersContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  filtersContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  filterChip: {
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    ...typography.body,
    color: colors.text.primary,
  },
  filterChipTextActive: {
    color: 'white',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.md,
  },
  listContent: {
    paddingVertical: spacing.md,
  },
  venueCard: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xxl * 2,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginTop: spacing.md,
  },
  emptyText: {
    ...typography.body,
    color: colors.text.secondary,
    marginTop: spacing.sm,
    textAlign: 'center',
    paddingHorizontal: spacing.xl,
  },
});