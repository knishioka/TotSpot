import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { colors, spacing, typography } from '../../constants/theme';

interface VenueQuickActionsProps {
  venueId: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export const VenueQuickActions: React.FC<VenueQuickActionsProps> = ({
  venueId: _venueId,
  isFavorite,
  onToggleFavorite,
}) => {
  const { user } = useAuth();

  const handleShare = () => {
    // In a real app, this would use the Share API
    Alert.alert('Share', 'Sharing functionality would be implemented here');
  };

  const handleAddReview = () => {
    if (!user) {
      Alert.alert('Sign In Required', 'Please sign in to add a review');
      return;
    }
    Alert.alert('Add Review', 'Review functionality would be implemented here');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.actionButton} onPress={onToggleFavorite}>
        <Ionicons
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={24}
          color={isFavorite ? colors.error : colors.primary}
        />
        <Text style={styles.actionText}>
          {isFavorite ? 'Saved' : 'Save'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
        <Ionicons name="share-outline" size={24} color={colors.primary} />
        <Text style={styles.actionText}>Share</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton} onPress={handleAddReview}>
        <Ionicons name="star-outline" size={24} color={colors.primary} />
        <Text style={styles.actionText}>Review</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'white',
  },
  actionButton: {
    alignItems: 'center',
    padding: spacing.sm,
  },
  actionText: {
    ...typography.caption,
    color: colors.primary,
    marginTop: spacing.xs,
  },
});