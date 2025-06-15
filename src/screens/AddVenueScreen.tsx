import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { useLocation } from '../hooks/useLocation';
import { useAuth } from '../hooks/useAuth';
import { venueService } from '../services/venueService';
import { colors, spacing, typography } from '../constants/theme';
import { Location } from '../types/venue';
import { RootStackParamList } from '../navigation/types';

type AddVenueScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Main'>;

export const AddVenueScreen: React.FC = () => {
  const navigation = useNavigation<AddVenueScreenNavigationProp>();
  const { location: currentLocation } = useLocation();
  const { user } = useAuth();
  
  // Form state
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [postcode, setPostcode] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  
  // Facilities state
  const [hasBabyChange, setHasBabyChange] = useState(false);
  const [hasHighChair, setHasHighChair] = useState(false);
  const [hasParking, setHasParking] = useState(false);
  const [hasPlayArea, setHasPlayArea] = useState(false);
  const [hasOutdoorSpace, setHasOutdoorSpace] = useState(false);
  const [hasNursingRoom, setHasNursingRoom] = useState(false);
  
  // Location state
  const [location, setLocation] = useState<Location | null>(
    currentLocation || { latitude: 51.7520, longitude: -1.2577 } // Oxford center default
  );
  
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <View style={styles.authRequired}>
        <Ionicons name="lock-closed" size={60} color={colors.text.secondary} />
        <Text style={styles.authRequiredText}>Sign in required</Text>
        <Text style={styles.authRequiredSubtext}>
          You need to be signed in to add venues
        </Text>
      </View>
    );
  }

  const handleSubmit = async () => {
    // Validation
    if (!name.trim()) {
      Alert.alert('Error', 'Please enter a venue name');
      return;
    }
    if (!address.trim()) {
      Alert.alert('Error', 'Please enter an address');
      return;
    }
    if (!location) {
      Alert.alert('Error', 'Please set the venue location on the map');
      return;
    }

    setLoading(true);

    try {
      await venueService.createVenue({
        name: name.trim(),
        address: address.trim(),
        postcode: postcode.trim(),
        phone: phone.trim(),
        website: website.trim(),
        description: description.trim(),
        location,
        has_baby_change: hasBabyChange,
        has_high_chair: hasHighChair,
        has_parking: hasParking,
        has_play_area: hasPlayArea,
        has_outdoor_space: hasOutdoorSpace,
        has_nursing_room: hasNursingRoom,
        city: 'Oxford', // Default for now
        venue_type_id: 1, // Default to cafe for now
      });

      Alert.alert(
        'Success!',
        'Thank you for adding this venue. It will be reviewed and added to the map.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to add venue. Please try again.');
      console.error('Error adding venue:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Venue Name *</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="e.g., The Missing Bean"
              placeholderTextColor={colors.text.secondary}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Address *</Text>
            <TextInput
              style={styles.input}
              value={address}
              onChangeText={setAddress}
              placeholder="e.g., 14 Turl Street"
              placeholderTextColor={colors.text.secondary}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Postcode</Text>
            <TextInput
              style={styles.input}
              value={postcode}
              onChangeText={setPostcode}
              placeholder="e.g., OX1 3DQ"
              placeholderTextColor={colors.text.secondary}
              autoCapitalize="characters"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={setPhone}
              placeholder="e.g., 01865 794886"
              placeholderTextColor={colors.text.secondary}
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Website</Text>
            <TextInput
              style={styles.input}
              value={website}
              onChangeText={setWebsite}
              placeholder="e.g., https://themissingbean.co.uk"
              placeholderTextColor={colors.text.secondary}
              keyboardType="url"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={description}
              onChangeText={setDescription}
              placeholder="Tell other parents what makes this place special..."
              placeholderTextColor={colors.text.secondary}
              multiline
              numberOfLines={3}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.mapInstructions}>
            Drag the pin to set the exact location
          </Text>
          
          <View style={styles.mapContainer}>
            <MapView
              style={styles.map}
              provider={PROVIDER_DEFAULT}
              initialRegion={{
                latitude: location?.latitude || 51.7520,
                longitude: location?.longitude || -1.2577,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              onPress={(e) => setLocation(e.nativeEvent.coordinate)}
            >
              {location && (
                <Marker
                  coordinate={location}
                  draggable
                  onDragEnd={(e) => setLocation(e.nativeEvent.coordinate)}
                />
              )}
            </MapView>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Facilities</Text>
          
          <View style={styles.facilityItem}>
            <View style={styles.facilityInfo}>
              <Text style={styles.facilityIcon}>🍼</Text>
              <Text style={styles.facilityLabel}>Baby Changing</Text>
            </View>
            <Switch
              value={hasBabyChange}
              onValueChange={setHasBabyChange}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="white"
            />
          </View>

          <View style={styles.facilityItem}>
            <View style={styles.facilityInfo}>
              <Text style={styles.facilityIcon}>🪑</Text>
              <Text style={styles.facilityLabel}>High Chairs</Text>
            </View>
            <Switch
              value={hasHighChair}
              onValueChange={setHasHighChair}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="white"
            />
          </View>

          <View style={styles.facilityItem}>
            <View style={styles.facilityInfo}>
              <Text style={styles.facilityIcon}>🚗</Text>
              <Text style={styles.facilityLabel}>Parking</Text>
            </View>
            <Switch
              value={hasParking}
              onValueChange={setHasParking}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="white"
            />
          </View>

          <View style={styles.facilityItem}>
            <View style={styles.facilityInfo}>
              <Text style={styles.facilityIcon}>🧸</Text>
              <Text style={styles.facilityLabel}>Play Area</Text>
            </View>
            <Switch
              value={hasPlayArea}
              onValueChange={setHasPlayArea}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="white"
            />
          </View>

          <View style={styles.facilityItem}>
            <View style={styles.facilityInfo}>
              <Text style={styles.facilityIcon}>🌳</Text>
              <Text style={styles.facilityLabel}>Outdoor Space</Text>
            </View>
            <Switch
              value={hasOutdoorSpace}
              onValueChange={setHasOutdoorSpace}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="white"
            />
          </View>

          <View style={styles.facilityItem}>
            <View style={styles.facilityInfo}>
              <Text style={styles.facilityIcon}>🤱</Text>
              <Text style={styles.facilityLabel}>Nursing Room</Text>
            </View>
            <Switch
              value={hasNursingRoom}
              onValueChange={setHasNursingRoom}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor="white"
            />
          </View>
        </View>

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Adding Venue...' : 'Add Venue'}
          </Text>
        </TouchableOpacity>

        <View style={{ height: spacing.xl }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  authRequired: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.xl,
  },
  authRequiredText: {
    ...typography.h3,
    color: colors.text.primary,
    marginTop: spacing.md,
    marginBottom: spacing.sm,
  },
  authRequiredSubtext: {
    ...typography.body,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: 'white',
    padding: spacing.lg,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  inputContainer: {
    marginBottom: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  input: {
    ...typography.body,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    color: colors.text.primary,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  mapInstructions: {
    ...typography.caption,
    color: colors.text.secondary,
    marginBottom: spacing.sm,
  },
  mapContainer: {
    height: 200,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  map: {
    flex: 1,
  },
  facilityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  facilityInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  facilityIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  facilityLabel: {
    ...typography.body,
    color: colors.text.primary,
  },
  submitButton: {
    backgroundColor: colors.primary,
    marginHorizontal: spacing.lg,
    marginTop: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    ...typography.bodyBold,
    color: 'white',
  },
});