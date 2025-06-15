import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from '../navigation/types';
import { colors, typography, spacing } from '../constants/theme';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

interface FeatureCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, color }) => (
  <View style={styles.featureCard}>
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
      <Ionicons name={icon} size={28} color="white" />
    </View>
    <View style={styles.featureContent}>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </View>
  </View>
);

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();
  const [currentStep, setCurrentStep] = useState(0);

  const features = [
    {
      icon: 'sparkles' as keyof typeof Ionicons.glyphMap,
      title: 'AI-Powered Recommendations',
      description: 'Get personalized venue suggestions based on your child\'s age and needs',
      color: colors.primary,
    },
    {
      icon: 'time' as keyof typeof Ionicons.glyphMap,
      title: 'Real-Time Crowd Levels',
      description: 'See how busy venues are right now and plan the perfect time to visit',
      color: '#FF6B6B',
    },
    {
      icon: 'location' as keyof typeof Ionicons.glyphMap,
      title: 'Essential Facilities',
      description: 'Find venues with baby changing, high chairs, nursing rooms, and more',
      color: '#4ECDC4',
    },
    {
      icon: 'people' as keyof typeof Ionicons.glyphMap,
      title: 'Trusted Parent Reviews',
      description: 'Read honest experiences from other parents in your community',
      color: '#95E1D3',
    },
  ];

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Location Permission',
          'TotSpot works best with location access to show nearby family-friendly venues. You can always search manually.',
          [
            { text: 'Continue Anyway', onPress: completeOnboarding },
            { text: 'Open Settings', onPress: () => Location.requestForegroundPermissionsAsync() },
          ]
        );
      } else {
        completeOnboarding();
      }
    } catch (error) {
      console.error('Error requesting location permission:', error);
      completeOnboarding();
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem('hasSeenWelcome', 'true');
      navigation.replace('Main');
    } catch (error) {
      console.error('Error saving welcome state:', error);
      navigation.replace('Main');
    }
  };

  const handleGetStarted = () => {
    if (currentStep === 0) {
      setCurrentStep(1);
    } else {
      requestLocationPermission();
    }
  };

  const handleSkip = () => {
    completeOnboarding();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {currentStep === 0 ? (
          <>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Ionicons name="heart-circle" size={80} color={colors.primary} />
              </View>
              <Text style={styles.title}>Welcome to TotSpot</Text>
              <Text style={styles.subtitle}>
                Your guide to child-friendly venues across the UK
              </Text>
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.stat}>
                <Text style={styles.statNumber}>500+</Text>
                <Text style={styles.statLabel}>Venues</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statNumber}>1,000+</Text>
                <Text style={styles.statLabel}>Reviews</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.stat}>
                <Text style={styles.statNumber}>5,000+</Text>
                <Text style={styles.statLabel}>Parents</Text>
              </View>
            </View>

            <Text style={styles.tagline}>
              "Finally, an app that understands what parents really need when going out with little ones!"
            </Text>
          </>
        ) : (
          <>
            <View style={styles.header}>
              <Text style={styles.featuresTitle}>What TotSpot Offers</Text>
            </View>

            <View style={styles.featuresContainer}>
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </View>

            <View style={styles.permissionInfo}>
              <Ionicons name="location-outline" size={24} color={colors.primary} />
              <Text style={styles.permissionText}>
                TotSpot needs your location to show nearby venues. You can always search manually too!
              </Text>
            </View>
          </>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handleGetStarted} style={styles.primaryButton}>
          <Text style={styles.primaryButtonText}>
            {currentStep === 0 ? 'Get Started' : 'Enable Location & Continue'}
          </Text>
          <Ionicons name="arrow-forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginTop: spacing.xl,
    marginBottom: spacing.xl,
  },
  logoContainer: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    textAlign: 'center',
    color: colors.text.secondary,
    maxWidth: 280,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    ...typography.h2,
    color: colors.primary,
    fontWeight: '700',
  },
  statLabel: {
    ...typography.caption,
    color: colors.text.secondary,
    marginTop: spacing.xs,
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  tagline: {
    ...typography.body,
    textAlign: 'center',
    color: colors.text.secondary,
    fontStyle: 'italic',
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
  },
  featuresTitle: {
    ...typography.h2,
    textAlign: 'center',
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  featuresContainer: {
    marginTop: spacing.lg,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    backgroundColor: 'white',
    padding: spacing.md,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    ...typography.bodyBold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  featureDescription: {
    ...typography.caption,
    color: colors.text.secondary,
    lineHeight: 18,
  },
  permissionInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '10',
    padding: spacing.md,
    borderRadius: 12,
    marginTop: spacing.xl,
  },
  permissionText: {
    ...typography.caption,
    color: colors.text.primary,
    flex: 1,
    marginLeft: spacing.sm,
  },
  footer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    paddingBottom: Platform.OS === 'ios' ? spacing.xl : spacing.md,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: 12,
    marginTop: spacing.sm,
  },
  primaryButtonText: {
    ...typography.bodyBold,
    color: 'white',
    marginRight: spacing.sm,
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  skipText: {
    ...typography.body,
    color: colors.text.secondary,
  },
});