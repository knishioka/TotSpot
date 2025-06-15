import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Review } from '../../types/venue';
import { colors, spacing, typography } from '../../constants/theme';

interface ReviewListProps {
  reviews: Review[];
}

export const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const renderStars = (rating: number) => {
    return (
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= rating ? 'star' : 'star-outline'}
            size={16}
            color={star <= rating ? colors.warning : colors.border}
          />
        ))}
      </View>
    );
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - d.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  const renderReview = ({ item }: { item: Review }) => (
    <View style={styles.reviewItem}>
      <View style={styles.reviewHeader}>
        <View style={styles.userInfo}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.user?.display_name?.charAt(0).toUpperCase() || 'U'}
            </Text>
          </View>
          <View>
            <Text style={styles.userName}>
              {item.user?.display_name || 'Anonymous'}
            </Text>
            <Text style={styles.reviewDate}>{formatDate(item.created_at)}</Text>
          </View>
        </View>
        {renderStars(item.rating)}
      </View>

      {item.comment && (
        <Text style={styles.reviewComment}>{item.comment}</Text>
      )}

      {(item.cleanliness_rating || item.facilities_rating || item.staff_rating) && (
        <View style={styles.subRatings}>
          {item.cleanliness_rating && (
            <View style={styles.subRating}>
              <Text style={styles.subRatingLabel}>Cleanliness</Text>
              {renderStars(item.cleanliness_rating)}
            </View>
          )}
          {item.facilities_rating && (
            <View style={styles.subRating}>
              <Text style={styles.subRatingLabel}>Facilities</Text>
              {renderStars(item.facilities_rating)}
            </View>
          )}
          {item.staff_rating && (
            <View style={styles.subRating}>
              <Text style={styles.subRatingLabel}>Staff</Text>
              {renderStars(item.staff_rating)}
            </View>
          )}
        </View>
      )}
    </View>
  );

  if (reviews.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No reviews yet</Text>
        <Text style={styles.emptySubtext}>Be the first to review this venue!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={reviews}
      renderItem={renderReview}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  reviewItem: {
    paddingVertical: spacing.md,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  avatarText: {
    ...typography.bodyBold,
    color: 'white',
  },
  userName: {
    ...typography.body,
    color: colors.text.primary,
    fontWeight: '600',
  },
  reviewDate: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  stars: {
    flexDirection: 'row',
  },
  reviewComment: {
    ...typography.body,
    color: colors.text.primary,
    lineHeight: 22,
  },
  subRatings: {
    marginTop: spacing.sm,
  },
  subRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  subRatingLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    width: 80,
  },
  separator: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.xs,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    ...typography.body,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    ...typography.caption,
    color: colors.text.secondary,
  },
});