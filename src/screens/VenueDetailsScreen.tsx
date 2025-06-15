import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { venueService } from '../services/venueService';
import { reviewService } from '../services/reviewService';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { ReviewList } from '../components/venue/ReviewList';
import { colors, spacing, typography } from '../constants/theme';
import { RootStackParamList } from '../navigation/types';

type VenueDetailsRouteProp = RouteProp<RootStackParamList, 'VenueDetails'>;

export const VenueDetailsScreen: React.FC = () => {
  const route = useRoute<VenueDetailsRouteProp>();
  const { venueId } = route.params;

  const { data: venue, isLoading, error } = useQuery({
    queryKey: ['venue', venueId],
    queryFn: () => venueService.getVenueById(venueId),
  });

  const { data: reviews } = useQuery({
    queryKey: ['reviews', venueId],
    queryFn: () => reviewService.getVenueReviews(venueId),
    enabled: !!venueId,
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error || !venue) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Unable to load venue details</Text>
      </View>
    );
  }

  const getCrowdingColor = () => {
    const hour = new Date().getHours();
    // Mock crowding levels based on typical patterns
    if (hour >= 12 && hour <= 14) return colors.error; // Busy lunch time
    if (hour >= 10 && hour <= 11) return colors.warning; // Moderate morning
    if (hour >= 15 && hour <= 17) return colors.warning; // Moderate afternoon
    return colors.success; // Quiet other times
  };

  const getCrowdingStatus = () => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour <= 14) return 'Very Busy';
    if (hour >= 10 && hour <= 11) return 'Moderately Busy';
    if (hour >= 15 && hour <= 17) return 'Getting Busy';
    return 'Not Busy';
  };

  const getCrowdingTip = () => {
    const hour = new Date().getHours();
    if (hour >= 12 && hour <= 14) return '💡 Try visiting after 2:30 PM for a quieter experience';
    if (hour >= 10 && hour <= 11) return '💡 Great time to visit! Usually quieter than lunch hours';
    return '💡 Perfect time to visit with little ones!';
  };

  const getHourlyData = () => {
    const currentHour = new Date().getHours();
    const data = [];
    for (let i = 9; i <= 18; i++) {
      let percentage = 30; // Base level
      if (i >= 12 && i <= 14) percentage = 90; // Lunch peak
      else if (i >= 10 && i <= 11) percentage = 60;
      else if (i >= 15 && i <= 17) percentage = 70;
      
      data.push({
        hour: i === 12 ? '12pm' : i > 12 ? `${i-12}pm` : `${i}am`,
        percentage,
        isCurrent: i === currentHour,
      });
    }
    return data;
  };

  const openMaps = () => {
    const scheme = Platform.select({
      ios: 'maps:0,0?q=',
      android: 'geo:0,0?q=',
    });
    const latLng = `${venue.location.latitude},${venue.location.longitude}`;
    const label = venue.name;
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  const callVenue = () => {
    if (venue.phone) {
      Linking.openURL(`tel:${venue.phone}`);
    }
  };

  const openWebsite = () => {
    if (venue.website) {
      Linking.openURL(venue.website);
    }
  };

  const facilities = [
    { key: 'has_baby_change', label: 'Baby Changing', icon: '🍼' },
    { key: 'has_high_chair', label: 'High Chairs', icon: '🪑' },
    { key: 'has_parking', label: 'Parking', icon: '🚗' },
    { key: 'has_play_area', label: 'Play Area', icon: '🧸' },
    { key: 'has_outdoor_space', label: 'Outdoor Space', icon: '🌳' },
    { key: 'has_nursing_room', label: 'Nursing Room', icon: '🤱' },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.venueName}>{venue.name}</Text>
        {venue.venue_types && (
          <View style={styles.typeChip}>
            <Text style={styles.typeText}>
              {venue.venue_types.name}
            </Text>
          </View>
        )}
        {venue.verified && (
          <View style={styles.verifiedBadge}>
            <Ionicons name="checkmark-circle" size={16} color={colors.success} />
            <Text style={styles.verifiedText}>Verified</Text>
          </View>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.actionButton} onPress={openMaps}>
          <Ionicons name="navigate" size={24} color={colors.primary} />
          <Text style={styles.actionButtonText}>Directions</Text>
        </TouchableOpacity>
        
        {venue.phone && (
          <TouchableOpacity style={styles.actionButton} onPress={callVenue}>
            <Ionicons name="call" size={24} color={colors.primary} />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
        )}
        
        {venue.website && (
          <TouchableOpacity style={styles.actionButton} onPress={openWebsite}>
            <Ionicons name="globe" size={24} color={colors.primary} />
            <Text style={styles.actionButtonText}>Website</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Facilities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Facilities</Text>
        <View style={styles.facilitiesGrid}>
          {facilities.map((facility) => {
            const isAvailable = venue[facility.key as keyof typeof venue];
            return (
              <View
                key={facility.key}
                style={[
                  styles.facilityItem,
                  !isAvailable && styles.facilityItemUnavailable,
                ]}
              >
                <Text style={styles.facilityIcon}>{facility.icon}</Text>
                <Text
                  style={[
                    styles.facilityLabel,
                    !isAvailable && styles.facilityLabelUnavailable,
                  ]}
                >
                  {facility.label}
                </Text>
                {isAvailable ? (
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                ) : (
                  <Ionicons name="close-circle" size={20} color={colors.text.light} />
                )}
              </View>
            );
          })}
        </View>
      </View>

      {/* Description */}
      {venue.description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.description}>{venue.description}</Text>
        </View>
      )}

      {/* Contact Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.contactItem}>
          <Ionicons name="location" size={20} color={colors.text.secondary} />
          <View style={styles.contactDetails}>
            <Text style={styles.contactText}>{venue.address}</Text>
            {venue.postcode && (
              <Text style={styles.contactText}>{venue.postcode}</Text>
            )}
          </View>
        </View>
        
        {venue.phone && (
          <TouchableOpacity style={styles.contactItem} onPress={callVenue}>
            <Ionicons name="call" size={20} color={colors.text.secondary} />
            <Text style={[styles.contactText, styles.contactLink]}>
              {venue.phone}
            </Text>
          </TouchableOpacity>
        )}
        
        {venue.email && (
          <TouchableOpacity
            style={styles.contactItem}
            onPress={() => Linking.openURL(`mailto:${venue.email}`)}
          >
            <Ionicons name="mail" size={20} color={colors.text.secondary} />
            <Text style={[styles.contactText, styles.contactLink]}>
              {venue.email}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Status */}
      <View style={styles.section}>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              venue.status === 'active' && styles.statusDotActive,
              venue.status === 'closed' && styles.statusDotClosed,
              venue.status === 'temporary_closed' && styles.statusDotTemporary,
            ]}
          />
          <Text style={styles.statusText}>
            {venue.status === 'active' && 'Open'}
            {venue.status === 'closed' && 'Permanently Closed'}
            {venue.status === 'temporary_closed' && 'Temporarily Closed'}
          </Text>
        </View>
      </View>

      {/* Reviews */}
      <View style={styles.section}>
        <View style={styles.reviewsHeader}>
          <Text style={styles.sectionTitle}>Reviews</Text>
        </View>

        {/* Real-time Crowding (Mock) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Live Crowding</Text>
          <View style={styles.crowdingCard}>
            <View style={styles.crowdingHeader}>
              <View style={styles.crowdingIndicator}>
                <View style={[styles.crowdingDot, { backgroundColor: getCrowdingColor() }]} />
                <Text style={styles.crowdingStatus}>{getCrowdingStatus()}</Text>
              </View>
              <Text style={styles.crowdingTime}>Updated 5 min ago</Text>
            </View>
            
            <View style={styles.crowdingChart}>
              {getHourlyData().map((data, index) => (
                <View key={index} style={styles.hourColumn}>
                  <View 
                    style={[
                      styles.hourBar, 
                      { 
                        height: `${data.percentage}%`,
                        backgroundColor: data.isCurrent ? colors.primary : colors.border,
                      }
                    ]} 
                  />
                  <Text style={[
                    styles.hourLabel,
                    data.isCurrent && styles.currentHourLabel
                  ]}>
                    {data.hour}
                  </Text>
                </View>
              ))}
            </View>
            
            <View style={styles.crowdingTips}>
              <Text style={styles.crowdingTip}>
                {getCrowdingTip()}
              </Text>
            </View>
            
            <TouchableOpacity style={styles.notifyButton}>
              <Ionicons name="notifications-outline" size={20} color={colors.primary} />
              <Text style={styles.notifyButtonText}>Notify when less busy</Text>
            </TouchableOpacity>
          </View>
          {reviews && reviews.length > 0 && (
            <View style={styles.ratingOverview}>
              <Ionicons name="star" size={20} color={colors.warning} />
              <Text style={styles.ratingText}>
                {venue.rating || '4.5'} ({reviews.length})
              </Text>
            </View>
          )}
        </View>
        {reviews && <ReviewList reviews={reviews} />}
      </View>

      {/* Bottom Padding */}
      <View style={{ height: spacing.xl }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  errorText: {
    ...typography.body,
    color: colors.error,
    textAlign: 'center',
  },
  header: {
    padding: spacing.lg,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  venueName: {
    ...typography.h1,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  typeChip: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  typeText: {
    ...typography.caption,
    color: 'white',
    fontWeight: '600',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifiedText: {
    ...typography.caption,
    color: colors.success,
    marginLeft: spacing.xs,
  },
  actionButtons: {
    flexDirection: 'row',
    padding: spacing.lg,
    backgroundColor: 'white',
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.sm,
  },
  actionButtonText: {
    ...typography.caption,
    color: colors.primary,
    marginTop: spacing.xs,
  },
  section: {
    padding: spacing.lg,
    backgroundColor: 'white',
    marginTop: spacing.sm,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  facilitiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  facilityItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  facilityItemUnavailable: {
    opacity: 0.5,
  },
  facilityIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  facilityLabel: {
    ...typography.body,
    color: colors.text.primary,
    flex: 1,
  },
  facilityLabelUnavailable: {
    color: colors.text.secondary,
  },
  description: {
    ...typography.body,
    color: colors.text.primary,
    lineHeight: 24,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  contactDetails: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  contactText: {
    ...typography.body,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  contactLink: {
    color: colors.primary,
    textDecorationLine: 'underline',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  statusDotActive: {
    backgroundColor: colors.success,
  },
  statusDotClosed: {
    backgroundColor: colors.error,
  },
  statusDotTemporary: {
    backgroundColor: colors.warning,
  },
  statusText: {
    ...typography.body,
    color: colors.text.primary,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  ratingOverview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    ...typography.body,
    color: colors.text.primary,
    marginLeft: spacing.xs,
    fontWeight: '600',
  },
  crowdingCard: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  crowdingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  crowdingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  crowdingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: spacing.sm,
  },
  crowdingStatus: {
    ...typography.bodyBold,
    color: colors.text.primary,
  },
  crowdingTime: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  crowdingChart: {
    flexDirection: 'row',
    height: 100,
    alignItems: 'flex-end',
    marginBottom: spacing.md,
  },
  hourColumn: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  hourBar: {
    width: '80%',
    borderRadius: 4,
    marginBottom: spacing.xs,
  },
  hourLabel: {
    ...typography.small,
    color: colors.text.secondary,
  },
  currentHourLabel: {
    color: colors.primary,
    fontWeight: '600',
  },
  crowdingTips: {
    backgroundColor: colors.primary + '10',
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.md,
  },
  crowdingTip: {
    ...typography.caption,
    color: colors.text.primary,
  },
  notifyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: spacing.sm,
  },
  notifyButtonText: {
    ...typography.body,
    color: colors.primary,
    marginLeft: spacing.xs,
  },
});