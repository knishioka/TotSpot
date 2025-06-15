import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { useLocation } from '../hooks/useLocation';
import { useVenues } from '../hooks/useVenues';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { colors, spacing, typography } from '../constants/theme';
import { Venue, VenueFilters } from '../types/venue';
import { RootStackParamList } from '../navigation/types';

type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Map'>;
type MapScreenRouteProp = RouteProp<RootStackParamList, 'Map'>;

export const MapScreen: React.FC = () => {
  const navigation = useNavigation<MapScreenNavigationProp>();
  const route = useRoute<MapScreenRouteProp>();
  const { location, error: locationError, loading: locationLoading } = useLocation();
  const mapRef = useRef<MapView>(null);
  const [selectedVenue, setSelectedVenue] = useState<Venue | null>(null);
  const [filters, setFilters] = useState<VenueFilters>(route.params?.filters || {});
  
  // Update filters when route params change
  useEffect(() => {
    if (route.params?.filters) {
      setFilters(route.params.filters);
    }
  }, [route.params?.filters]);
  
  // Fetch venues with filters
  const { data: venues, isLoading: venuesLoading, error: venuesError } = useVenues(location, filters);

  if (locationLoading) {
    return <LoadingSpinner />;
  }

  if (locationError) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{locationError}</Text>
        <Text style={styles.errorSubtext}>
          Please enable location services to use TotSpot
        </Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to get your location</Text>
      </View>
    );
  }

  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${Math.round(meters)}m`;
    }
    return `${(meters / 1000).toFixed(1)}km`;
  };

  const getFacilityIcons = (venue: Venue) => {
    const icons = [];
    if (venue.has_baby_changing) icons.push('🍼');
    if (venue.has_high_chairs) icons.push('🪑');
    if (venue.has_parking) icons.push('🚗');
    if (venue.has_play_area) icons.push('🧸');
    if (venue.has_outdoor_seating) icons.push('🌳');
    if (venue.has_nursing_room) icons.push('🤱');
    return icons.join(' ');
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_DEFAULT}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation
        showsMyLocationButton
      >
        {/* Venue markers */}
        {venues?.map((venue) => (
          <Marker
            key={venue.id}
            coordinate={{
              latitude: venue.location.latitude,
              longitude: venue.location.longitude,
            }}
            pinColor={
              selectedVenue?.id === venue.id
                ? colors.primary
                : colors.secondary
            }
            onPress={() => setSelectedVenue(venue)}
          />
        ))}
      </MapView>

      {/* Loading overlay */}
      {venuesLoading && (
        <View style={styles.loadingOverlay}>
          <View style={styles.loadingCard}>
            <LoadingSpinner size="small" />
            <Text style={styles.loadingText}>Finding nearby venues...</Text>
          </View>
        </View>
      )}

      {/* Error message */}
      {venuesError && (
        <View style={styles.errorOverlay}>
          <Text style={styles.errorOverlayText}>
            Unable to load venues. Please try again.
          </Text>
        </View>
      )}

      {/* Filter pills */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterPill, filters.facilities?.includes('baby_changing') && styles.filterPillActive]}
            onPress={() => {
              const newFilters = { ...filters };
              if (!newFilters.facilities) newFilters.facilities = [];
              const index = newFilters.facilities.indexOf('baby_changing');
              if (index > -1) {
                newFilters.facilities.splice(index, 1);
              } else {
                newFilters.facilities.push('baby_changing');
              }
              setFilters(newFilters);
            }}
          >
            <Text style={[styles.filterPillText, filters.facilities?.includes('baby_changing') && styles.filterPillTextActive]}>
              🍼 Baby Changing
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterPill, filters.facilities?.includes('nursing_room') && styles.filterPillActive]}
            onPress={() => {
              const newFilters = { ...filters };
              if (!newFilters.facilities) newFilters.facilities = [];
              const index = newFilters.facilities.indexOf('nursing_room');
              if (index > -1) {
                newFilters.facilities.splice(index, 1);
              } else {
                newFilters.facilities.push('nursing_room');
              }
              setFilters(newFilters);
            }}
          >
            <Text style={[styles.filterPillText, filters.facilities?.includes('nursing_room') && styles.filterPillTextActive]}>
              🤱 Nursing Room
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterPill, filters.facilities?.includes('high_chairs') && styles.filterPillActive]}
            onPress={() => {
              const newFilters = { ...filters };
              if (!newFilters.facilities) newFilters.facilities = [];
              const index = newFilters.facilities.indexOf('high_chairs');
              if (index > -1) {
                newFilters.facilities.splice(index, 1);
              } else {
                newFilters.facilities.push('high_chairs');
              }
              setFilters(newFilters);
            }}
          >
            <Text style={[styles.filterPillText, filters.facilities?.includes('high_chairs') && styles.filterPillTextActive]}>
              🪑 High Chairs
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.filterPill, filters.facilities?.includes('play_area') && styles.filterPillActive]}
            onPress={() => {
              const newFilters = { ...filters };
              if (!newFilters.facilities) newFilters.facilities = [];
              const index = newFilters.facilities.indexOf('play_area');
              if (index > -1) {
                newFilters.facilities.splice(index, 1);
              } else {
                newFilters.facilities.push('play_area');
              }
              setFilters(newFilters);
            }}
          >
            <Text style={[styles.filterPillText, filters.facilities?.includes('play_area') && styles.filterPillTextActive]}>
              🧸 Play Area
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      {/* Selected venue card */}
      {selectedVenue && (
        <View style={styles.venueCard}>
          <View style={styles.venueCardContent}>
            <View style={styles.venueHeader}>
              <View style={styles.venueInfo}>
                <Text style={styles.venueName}>{selectedVenue.name}</Text>
                <Text style={styles.venueDistance}>
                  {formatDistance(selectedVenue.distance || 0)} away
                </Text>
              </View>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setSelectedVenue(null)}
              >
                <Ionicons name="close" size={24} color={colors.text.secondary} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.venueFacilities}>
              {getFacilityIcons(selectedVenue) || 'No facilities listed'}
            </Text>
            
            <Text style={styles.venueAddress}>{selectedVenue.address}</Text>
            
            <TouchableOpacity 
              style={styles.detailsButton}
              onPress={() => {
                navigation.navigate('VenueDetails', { venueId: selectedVenue.id });
                setSelectedVenue(null);
              }}
            >
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  errorText: {
    ...typography.h3,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  errorSubtext: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  loadingOverlay: {
    position: 'absolute',
    top: spacing.xxl,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  loadingCard: {
    backgroundColor: 'white',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loadingText: {
    ...typography.body,
    marginLeft: spacing.sm,
    color: colors.text.primary,
  },
  errorOverlay: {
    position: 'absolute',
    top: spacing.xxl,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: colors.error,
    padding: spacing.md,
    borderRadius: 8,
  },
  errorOverlayText: {
    ...typography.body,
    color: 'white',
    textAlign: 'center',
  },
  venueCard: {
    position: 'absolute',
    bottom: spacing.xl,
    left: spacing.md,
    right: spacing.md,
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  venueCardContent: {
    padding: spacing.md,
  },
  venueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  venueInfo: {
    flex: 1,
  },
  venueName: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  venueDistance: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  closeButton: {
    padding: spacing.xs,
  },
  closeButtonText: {
    fontSize: 20,
    color: colors.text.secondary,
  },
  venueFacilities: {
    ...typography.body,
    fontSize: 20,
    marginBottom: spacing.sm,
  },
  venueAddress: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  detailsButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: 8,
    alignItems: 'center',
  },
  detailsButtonText: {
    ...typography.bodyBold,
    color: 'white',
  },
  filterContainer: {
    position: 'absolute',
    top: spacing.xxl,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.md,
  },
  filterPill: {
    backgroundColor: 'white',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterPillActive: {
    backgroundColor: colors.primary,
  },
  filterPillText: {
    ...typography.body,
    color: colors.text.primary,
  },
  filterPillTextActive: {
    color: 'white',
  },
});