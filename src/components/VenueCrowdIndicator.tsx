import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../constants/theme';

interface VenueCrowdIndicatorProps {
  venueId: string;
  size?: 'small' | 'large';
}

export const VenueCrowdIndicator: React.FC<VenueCrowdIndicatorProps> = ({ 
  venueId, 
  size = 'small' 
}) => {
  // Mock crowding data based on current time
  const getCrowdingLevel = () => {
    const hour = new Date().getHours();
    const random = parseInt(venueId.slice(-2), 16) % 3; // Mock variation based on venue ID
    
    if (hour >= 12 && hour <= 14) {
      return ['busy', 'very_busy', 'moderate'][random];
    } else if (hour >= 10 && hour <= 11 || hour >= 15 && hour <= 17) {
      return ['moderate', 'quiet', 'busy'][random];
    }
    return ['quiet', 'quiet', 'moderate'][random];
  };

  const level = getCrowdingLevel();
  
  const crowdingConfig: Record<string, {
    color: string;
    icon: string;
    text: string;
    description: string;
  }> = {
    quiet: {
      color: colors.success,
      icon: 'checkmark-circle',
      text: 'Quiet',
      description: 'Great time to visit',
    },
    moderate: {
      color: colors.warning,
      icon: 'time',
      text: 'Moderate',
      description: 'Some waiting expected',
    },
    busy: {
      color: colors.error,
      icon: 'warning',
      text: 'Busy',
      description: 'Expect delays',
    },
    very_busy: {
      color: colors.error,
      icon: 'alert-circle',
      text: 'Very Busy',
      description: 'Consider another time',
    },
  };

  const config = crowdingConfig[level];

  if (size === 'small') {
    return (
      <View style={styles.smallContainer}>
        <View style={[styles.smallDot, { backgroundColor: config.color }]} />
        <Text style={styles.smallText}>{config.text}</Text>
      </View>
    );
  }

  return (
    <View style={styles.largeContainer}>
      <Ionicons name={config.icon as any} size={24} color={config.color} />
      <View style={styles.largeTextContainer}>
        <Text style={styles.largeText}>{config.text}</Text>
        <Text style={styles.largeDescription}>{config.description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  smallContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  smallDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: spacing.xs,
  },
  smallText: {
    ...typography.caption,
    color: colors.text.secondary,
  },
  largeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.sm,
    borderRadius: 8,
  },
  largeTextContainer: {
    marginLeft: spacing.sm,
  },
  largeText: {
    ...typography.bodyBold,
    color: colors.text.primary,
  },
  largeDescription: {
    ...typography.caption,
    color: colors.text.secondary,
  },
});