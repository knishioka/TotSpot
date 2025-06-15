import { supabase } from './supabase';
import { Review } from '../types/venue';

export const reviewService = {
  async getVenueReviews(venueId: string): Promise<Review[]> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id (
            display_name,
            avatar_url
          )
        `)
        .eq('venue_id', venueId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform the data to match our Review type
      return (data || []).map(review => ({
        ...review,
        user: review.profiles,
      }));
    } catch (error) {
      console.error('Error fetching reviews:', error);
      throw error;
    }
  },

  async createReview(
    venueId: string,
    userId: string,
    review: {
      rating: number;
      comment?: string;
      cleanliness_rating?: number;
      facilities_rating?: number;
      staff_rating?: number;
    }
  ): Promise<Review> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          venue_id: venueId,
          user_id: userId,
          ...review,
        })
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  async getUserReviewForVenue(
    venueId: string,
    userId: string
  ): Promise<Review | null> {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('venue_id', venueId)
        .eq('user_id', userId)
        .single();

      if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows

      return data;
    } catch (error) {
      console.error('Error fetching user review:', error);
      return null;
    }
  },
};