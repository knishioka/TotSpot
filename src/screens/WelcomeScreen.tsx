import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/types';
import { colors, typography, spacing, brand, shadows } from '../constants/theme';

type WelcomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Welcome'>;

const { width } = Dimensions.get('window');

export const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation<WelcomeScreenNavigationProp>();

  const handleGetStarted = async () => {
    await AsyncStorage.setItem('hasSeenWelcome', 'true');
    navigation.replace('Main');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={[colors.primary, colors.primaryLight]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Header Section */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <View style={styles.iconWrapper}>
                <Ionicons name="location" size={48} color={colors.primary} />
              </View>
              <Text style={styles.appName}>{brand.name}</Text>
              <Text style={styles.tagline}>{brand.tagline}</Text>
            </View>
          </View>

          {/* Features Section */}
          <View style={styles.featuresSection}>
            <Text style={styles.sectionTitle}>Designed for busy parents</Text>
            
            <View style={styles.featureGrid}>
              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="medical" size={28} color={colors.primary} />
                </View>
                <Text style={styles.featureTitle}>Baby-friendly</Text>
                <Text style={styles.featureText}>Changing rooms, high chairs, and accessible facilities</Text>
              </View>
              
              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="people" size={28} color={colors.primary} />
                </View>
                <Text style={styles.featureTitle}>Real reviews</Text>
                <Text style={styles.featureText}>Honest feedback from other parents just like you</Text>
              </View>
              
              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="time" size={28} color={colors.primary} />
                </View>
                <Text style={styles.featureTitle}>Live updates</Text>
                <Text style={styles.featureText}>Know before you go with real-time crowd levels</Text>
              </View>
              
              <View style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name="sparkles" size={28} color={colors.primary} />
                </View>
                <Text style={styles.featureTitle}>AI Assistant</Text>
                <Text style={styles.featureText}>Get personalised venue recommendations</Text>
              </View>
            </View>
          </View>

          {/* CTA Section */}
          <View style={styles.ctaSection}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleGetStarted}>
              <Text style={styles.primaryButtonText}>Start exploring</Text>
              <Ionicons name="arrow-forward" size={20} color={colors.text.inverse} />
            </TouchableOpacity>
            
            <Text style={styles.disclaimer}>
              Free to use • Trusted by parents across the UK
            </Text>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.component.pageMargin,
  },
  
  // Header Section
  header: {
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xl,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  iconWrapper: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    ...shadows.md,
  },
  appName: {
    ...typography.h1,
    color: colors.text.inverse,
    fontWeight: '700',
    marginBottom: spacing.sm,
    letterSpacing: -0.5,
  },
  tagline: {
    ...typography.bodyLarge,
    color: colors.text.inverse,
    textAlign: 'center',
    opacity: 0.95,
    maxWidth: width * 0.85,
    lineHeight: 26,
  },
  
  // Features Section
  featuresSection: {
    flex: 1,
    paddingVertical: spacing.lg,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.text.inverse,
    textAlign: 'center',
    marginBottom: spacing.lg,
    fontWeight: '600',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  featureCard: {
    width: (width - spacing.component.pageMargin * 2 - spacing.md) / 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: spacing.md,
    padding: spacing.md,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  featureTitle: {
    ...typography.h4,
    color: colors.text.inverse,
    textAlign: 'center',
    marginBottom: spacing.xs,
    fontWeight: '600',
  },
  featureText: {
    ...typography.bodySmall,
    color: colors.text.inverse,
    textAlign: 'center',
    opacity: 0.9,
    lineHeight: 18,
  },
  
  // CTA Section
  ctaSection: {
    paddingVertical: spacing.xl,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.xl,
    borderRadius: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    minWidth: width * 0.7,
    ...shadows.md,
  },
  primaryButtonText: {
    ...typography.buttonLarge,
    color: colors.primary,
    fontWeight: '600',
  },
  disclaimer: {
    ...typography.caption,
    color: colors.text.inverse,
    textAlign: 'center',
    marginTop: spacing.lg,
    opacity: 0.8,
  },
});