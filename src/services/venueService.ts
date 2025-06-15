import { supabase } from './supabase';
import { Venue, VenueFilters, Location } from '../types/venue';

export const venueService = {
  async searchNearby(
    location: Location,
    filters?: VenueFilters
  ): Promise<Venue[]> {
    try {
      // Use the PostGIS function we created
      const radius = filters?.radius || 5000;
      const { data, error } = await supabase
        .rpc('find_venues_near', {
          lat: location.latitude,
          lng: location.longitude,
          radius_meters: radius,
        });

      if (error) throw error;

      // Now fetch full venue details with filters
      let query = supabase
        .from('venues')
        .select('*, venue_types(name, icon)')
        .eq('status', 'active')
        .in('id', (data || []).map((v: any) => v.id));

      // Apply filters
      if (filters) {
        if (filters.facilities && filters.facilities.length > 0) {
          // Apply facility filters based on the facilities array
          filters.facilities.forEach(facility => {
            switch(facility) {
              case 'baby_changing':
                query = query.eq('has_baby_changing', true);
                break;
              case 'high_chairs':
                query = query.eq('has_high_chairs', true);
                break;
              case 'parking':
                query = query.eq('has_parking', true);
                break;
              case 'play_area':
                query = query.eq('has_play_area', true);
                break;
              case 'outdoor_seating':
                query = query.eq('has_outdoor_seating', true);
                break;
              case 'nursing_room':
                query = query.eq('has_nursing_room', true);
                break;
            }
          });
        }
        
        // Legacy filter support
        if (filters.has_baby_change !== undefined) {
          query = query.eq('has_baby_change', filters.has_baby_change);
        }
        if (filters.has_high_chair !== undefined) {
          query = query.eq('has_high_chair', filters.has_high_chair);
        }
        if (filters.has_parking !== undefined) {
          query = query.eq('has_parking', filters.has_parking);
        }
        if (filters.has_play_area !== undefined) {
          query = query.eq('has_play_area', filters.has_play_area);
        }
        if (filters.has_outdoor_space !== undefined) {
          query = query.eq('has_outdoor_space', filters.has_outdoor_space);
        }
        if (filters.has_nursing_room !== undefined) {
          query = query.eq('has_nursing_room', filters.has_nursing_room);
        }
        if (filters.venue_type_id) {
          query = query.eq('venue_type_id', filters.venue_type_id);
        }
      }

      const { data: venues, error: venueError } = await query;

      if (venueError) throw venueError;

      // Map venues with distance and parsed location
      const venuesWithDistance = (venues || []).map((venue) => {
        const distanceData = data.find((d: any) => d.id === venue.id);
        
        // Parse location from PostGIS format
        const coords = venue.location.match(/POINT\(([^ ]+) ([^ ]+)\)/);
        const longitude = coords ? parseFloat(coords[1]) : 0;
        const latitude = coords ? parseFloat(coords[2]) : 0;

        return {
          ...venue,
          location: { latitude, longitude },
          distance: distanceData?.distance_meters || 0,
        };
      });

      // Sort by distance
      return venuesWithDistance.sort((a, b) => a.distance - b.distance);
    } catch (error) {
      console.error('Error searching venues:', error);
      throw error;
    }
  },

  async getVenueById(id: string): Promise<Venue | null> {
    try {
      const { data, error } = await supabase
        .from('venues')
        .select('*, venue_types(name, icon)')
        .eq('id', id)
        .single();

      if (error) throw error;

      if (data) {
        // Parse location
        const coords = data.location.match(/POINT\(([^ ]+) ([^ ]+)\)/);
        const longitude = coords ? parseFloat(coords[1]) : 0;
        const latitude = coords ? parseFloat(coords[2]) : 0;

        return {
          ...data,
          location: { latitude, longitude },
        };
      }

      return null;
    } catch (error) {
      console.error('Error fetching venue:', error);
      throw error;
    }
  },

  async createVenue(venue: Partial<Venue>): Promise<Venue> {
    try {
      // Convert location to PostGIS format
      const locationString = venue.location
        ? `POINT(${venue.location.longitude} ${venue.location.latitude})`
        : null;

      const { data, error } = await supabase
        .from('venues')
        .insert({
          ...venue,
          location: locationString,
        })
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error creating venue:', error);
      throw error;
    }
  },

  async updateVenue(id: string, updates: Partial<Venue>): Promise<Venue> {
    try {
      // Convert location if provided
      const updateData = { ...updates };
      if (updates.location) {
        updateData.location = `POINT(${updates.location.longitude} ${updates.location.latitude})` as any;
      }

      const { data, error } = await supabase
        .from('venues')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error updating venue:', error);
      throw error;
    }
  },

  async getPopular(limit: number = 10): Promise<Venue[]> {
    try {
      const { data, error } = await supabase
        .from('venues')
        .select('*, venue_types(name, icon)')
        .eq('status', 'active')
        .order('average_rating', { ascending: false })
        .limit(limit);

      if (error) throw error;

      // Parse location for each venue
      return (data || []).map((venue) => {
        const coords = venue.location.match(/POINT\(([^ ]+) ([^ ]+)\)/);
        const longitude = coords ? parseFloat(coords[1]) : 0;
        const latitude = coords ? parseFloat(coords[2]) : 0;

        return {
          ...venue,
          location: { latitude, longitude },
        };
      });
    } catch (error) {
      console.error('Error fetching popular venues:', error);
      throw error;
    }
  },
};