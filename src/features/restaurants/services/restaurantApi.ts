import { fetchJsonWithAuth } from "@/lib/services";
import type {
  RestaurantsPagedResponse,
  GetRestaurantsParams,
} from "../types/api.types";

const RESTAURANT_ENDPOINTS = {
  GET_ALL: "/api/admin/restaurants",
  GET_SPONSORED_POSITIONS: "/api/admin/restaurants/sponsored-positions",
} as const;
  
/**
 * Builds query string from params object
 */
function buildQueryString(params?: GetRestaurantsParams): string {
  if (!params) return "";
  
  const searchParams = new URLSearchParams();
  
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;
    searchParams.append(key, value.toString());
  }
  
  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

/**
 * Restaurant API - Proxy-based implementation
 * All endpoints use authenticated fetch with automatic token refresh
 */
export const restaurantApi = {
  /**
   * Get all restaurants with pagination and filtering
   */
  async getRestaurants(params?: GetRestaurantsParams): Promise<RestaurantsPagedResponse> {
    const query = buildQueryString(params);
    return fetchJsonWithAuth<RestaurantsPagedResponse>(
      `${RESTAURANT_ENDPOINTS.GET_ALL}${query}`
    );
  },

  /**
   * Get occupied sponsored positions
   */
  async getSponsoredPositions(): Promise<{ positions: number[] }> {
    return fetchJsonWithAuth<{ positions: number[] }>(
      RESTAURANT_ENDPOINTS.GET_SPONSORED_POSITIONS
    );
  },
};

/**
 * Fetches restaurants from the API
 * @param params - Query parameters for pagination and filtering
 * @returns Promise with paged response
 */
export async function getRestaurantsPaged(
  params?: GetRestaurantsParams
): Promise<RestaurantsPagedResponse> {
  return restaurantApi.getRestaurants(params || { page: 0, size: 20 });
}
