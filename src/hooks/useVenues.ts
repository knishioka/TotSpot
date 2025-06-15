import { useQuery } from '@tanstack/react-query';
import { venueService } from '../services/venueService';
import { Location, VenueFilters } from '../types/venue';

export function useVenues(location: Location | null, filters?: VenueFilters) {
  return useQuery({
    queryKey: ['venues', location, filters],
    queryFn: () => {
      if (!location) throw new Error('Location is required');
      return venueService.searchNearby(location, filters);
    },
    enabled: !!location,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}