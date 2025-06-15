import { VenueFilters } from '../types/venue';

export type RootStackParamList = {
  Welcome: undefined;
  Main: undefined;
  Map: { filters?: VenueFilters } | undefined;
  Search: { query?: string; sortBy?: string } | undefined;
  VenueDetails: { venueId: string };
  Auth: undefined;
  AddVenue: undefined;
  Profile: undefined;
  Favorites: undefined;
  AIAssistant: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  AIAssistant: undefined;
  Map: { filters?: VenueFilters } | undefined;
  Search: { query?: string; sortBy?: string } | undefined;
  Saved: undefined;
  Profile: undefined;
};