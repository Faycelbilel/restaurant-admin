import { DataService } from "@/lib/services";
import { RestaurantDetailsApiResponse } from "@/features/restaurants/types/api.types";


const API = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const RESTAURANT_ENDPOINTS = {
  DETAILS: `${API}/admin/restaurants`,
} as const;

export async function fetchRestaurantDetails(
  id: string
): Promise<RestaurantDetailsApiResponse> {
  const response = await DataService.get<RestaurantDetailsApiResponse>(
    `${RESTAURANT_ENDPOINTS.DETAILS}/${id}`
  );
  return response.data;
}

