export interface Location {
  latitude: number;
  longitude: number;
}

export interface VenueType {
  id: number;
  name: string;
  icon: string;
}

export interface Venue {
  id: string;
  name: string;
  description?: string;
  venue_type_id?: number;
  venue_types?: VenueType; // Supabase returns this name for joined tables
  location: Location;
  address: string;
  city: string;
  postcode?: string;
  phone?: string;
  website?: string;
  email?: string;
  
  // Facilities - supporting both naming conventions
  has_baby_change?: boolean;
  has_baby_changing?: boolean;
  has_high_chair?: boolean;
  has_high_chairs?: boolean;
  has_parking?: boolean;
  has_play_area?: boolean;
  has_outdoor_space?: boolean;
  has_outdoor_seating?: boolean;
  has_nursing_room?: boolean;
  
  // Metadata
  created_at: string;
  updated_at: string;
  verified?: boolean;
  verified_at?: string;
  status?: 'active' | 'closed' | 'temporary_closed';
  venue_type?: string;
  
  // Computed fields
  distance?: number;
  rating?: number;
  average_rating?: number;
  review_count?: number;
}

export interface VenueFilters {
  has_baby_change?: boolean;
  has_high_chair?: boolean;
  has_parking?: boolean;
  has_play_area?: boolean;
  has_outdoor_space?: boolean;
  has_nursing_room?: boolean;
  venue_type_id?: number;
  radius?: number; // in meters
  facilities?: string[];
}

export interface Review {
  id: string;
  venue_id: string;
  user_id: string;
  rating: number;
  comment?: string;
  cleanliness_rating?: number;
  facilities_rating?: number;
  staff_rating?: number;
  created_at: string;
  updated_at: string;
  user?: {
    display_name: string;
    avatar_url?: string;
  };
}