import { fetchJsonWithAuth } from "@/lib/services";
import type {
  OperatingHoursResponseDTO,
  SpecialDayEntryDTO,
  WeeklyScheduleEntryDTO,
} from "../operating";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "";

const ENDPOINTS = {
  OPERATING_HOURS: `${API}/restaurant/operating-hours`,
  OPERATING_HOURS_WEEKLY: `${API}/restaurant/operating-hours/weekly`,
  OPERATING_HOURS_SPECIAL_DAYS: `${API}/restaurant/operating-hours/special-days`,
} as const;

export const operatingHoursService = {
  async getOperatingHours(): Promise<OperatingHoursResponseDTO> {
    return fetchJsonWithAuth<OperatingHoursResponseDTO>(ENDPOINTS.OPERATING_HOURS);
  },

  async updateWeeklySchedule(days: WeeklyScheduleEntryDTO[]): Promise<void> {
    await fetchJsonWithAuth<void>(ENDPOINTS.OPERATING_HOURS_WEEKLY, {
      method: "PUT",
      body: JSON.stringify({ days }),
    });
  },

  async addSpecialDay(
    payload: Omit<SpecialDayEntryDTO, "id">
  ): Promise<SpecialDayEntryDTO> {
    return fetchJsonWithAuth<SpecialDayEntryDTO>(ENDPOINTS.OPERATING_HOURS_SPECIAL_DAYS, {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  async updateSpecialDay(
    id: number,
    payload: Omit<SpecialDayEntryDTO, "id">
  ): Promise<SpecialDayEntryDTO> {
    return fetchJsonWithAuth<SpecialDayEntryDTO>(
      `${ENDPOINTS.OPERATING_HOURS_SPECIAL_DAYS}/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(payload),
      }
    );
  },

  async deleteSpecialDay(id: number): Promise<void> {
    await fetchJsonWithAuth<void>(`${ENDPOINTS.OPERATING_HOURS_SPECIAL_DAYS}/${id}`, {
      method: "DELETE",
    });
  },
};

export type OperatingHoursService = typeof operatingHoursService;
