import { DataService, fetchJsonWithAuth } from "@/lib/services";
import { OperatingHoursResponseDTO, SpecialDayEntryDTO ,WeeklyScheduleEntryDTO} from "@/app/(dashboard)/restaurants/RestaurantOperating/operating";
import { RestaurantDetailsApiResponse } from "@/features/restaurants/types/api.types";


const API = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const RESTAURANT_ENDPOINTS = {
  DETAILS: `${API}/admin/restaurants`,
  OPERATING_HOURS: `${API}/restaurant/operating-hours`,
  OPERATING_HOURS_WEEKLY: `${API}/restaurant/operating-hours/weekly`,
  OPERATING_HOURS_SPECIAL_DAYS: `${API}/restaurant/operating-hours/special-days`,
} as const;

export async function fetchRestaurantDetails(
  id: string
): Promise<RestaurantDetailsApiResponse> {
  const response = await DataService.get<RestaurantDetailsApiResponse>(
    `${RESTAURANT_ENDPOINTS.DETAILS}/${id}`
  );
  return response.data;
}

export const OperatingHoursService = {
  async getOperatingHours(): Promise<OperatingHoursResponseDTO> {
    console.log(API)
    return fetchJsonWithAuth<OperatingHoursResponseDTO>(
      RESTAURANT_ENDPOINTS.OPERATING_HOURS
    );
    
  },

  async updateWeeklySchedule(days: WeeklyScheduleEntryDTO[]): Promise<void> {
    await fetchJsonWithAuth<void>(RESTAURANT_ENDPOINTS.OPERATING_HOURS_WEEKLY, {
      method: "PUT",
      body: JSON.stringify({ days }),
    });
  },

  async addSpecialDay(
    payload: Omit<SpecialDayEntryDTO, "id">
  ): Promise<SpecialDayEntryDTO> {
    return fetchJsonWithAuth<SpecialDayEntryDTO>(
      RESTAURANT_ENDPOINTS.OPERATING_HOURS_SPECIAL_DAYS,
      {
        method: "POST",
        body: JSON.stringify(payload),
      }
    );
  },

  async updateSpecialDay(
    id: number,
    payload: Omit<SpecialDayEntryDTO, "id">
  ): Promise<SpecialDayEntryDTO> {
    return fetchJsonWithAuth<SpecialDayEntryDTO>(
      `${RESTAURANT_ENDPOINTS.OPERATING_HOURS_SPECIAL_DAYS}/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );
  },

  async deleteSpecialDay(id: number): Promise<void> {
    await fetchJsonWithAuth<void>(
      `${RESTAURANT_ENDPOINTS.OPERATING_HOURS_SPECIAL_DAYS}/${id}`,
      { method: "DELETE" }
    );
  },
};
