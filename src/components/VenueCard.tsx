import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Venue } from '../types/venue';
import { colors, typography, spacing } from '../constants/theme';
import { VenueCrowdIndicator } from './VenueCrowdIndicator';

interface VenueCardProps {
  venue: Venue;
  onPress: () => void;
  distance?: number;
  style?: ViewStyle;
}

export const VenueCard: React.FC<VenueCardProps> = ({ venue, onPress, distance, style }) => {
  const facilityIcons = {
    baby_changing: 'body',
    high_chairs: 'restaurant',
    nursing_room: 'water',
    parking: 'car',
    play_area: 'fitness',
    outdoor_seating: 'sunny',
  };

  const getTopFacilities = () => {
    const facilities = [];
    if (venue.has_baby_changing) facilities.push('baby_changing');
    if (venue.has_high_chairs) facilities.push('high_chairs');
    if (venue.has_nursing_room) facilities.push('nursing_room');
    if (venue.has_parking) facilities.push('parking');
    return facilities.slice(0, 4);
  };

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.name} numberOfLines={1}>{venue.name}</Text>
          <Text style={styles.type}>{venue.venue_type}</Text>
        </View>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFA502" />
          <Text style={styles.rating}>
            {venue.average_rating ? venue.average_rating.toFixed(1) : 'New'}
          </Text>
        </View>
      </View>

      <View style={styles.middleRow}>
        <Text style={styles.address} numberOfLines={1}>
          {venue.address}
        </Text>
        <VenueCrowdIndicator venueId={venue.id} size="small" />
      </View>

      <View style={styles.footer}>
        <View style={styles.facilities}>
          {getTopFacilities().map((facility) => (
            <View key={facility} style={styles.facilityBadge}>
              <Ionicons
                name={facilityIcons[facility as keyof typeof facilityIcons] as any}
                size={14}
                color={colors.primary}
              />
            </View>
          ))}
        </View>

        {distance !== undefined && (
          <Text style={styles.distance}>
            {distance < 1000 
              ? `${Math.round(distance)}m` 
              : `${(distance / 1000).toFixed(1)}km`}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  titleContainer: {
    flex: 1,
    marginRight: spacing.sm,
  },
  name: {
    ...typography.bodyBold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  type: {
    ...typography.caption,
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFA502' + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 8,
  },
  rating: {
    ...typography.caption,
    color: '#FFA502',
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
  middleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  address: {
    ...typography.caption,
    color: colors.text.secondary,
    flex: 1,
    marginRight: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  facilities: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  facilityBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
  },
  distance: {
    ...typography.caption,
    color: colors.text.secondary,
    fontWeight: '600',
  },
});