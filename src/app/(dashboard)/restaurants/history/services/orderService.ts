import { DataService, fetchJsonWithAuth, PaginatedResponse } from "@/lib/services";
import { OrderApiResponse } from "./api.types";

const API = process.env.NEXT_PUBLIC_API_BASE_URL || "";

export const REST_HISTORY_ENDPOINTS = {
  HISTORY: `${API}/restaurant/history`,
} as const;

export const HistoryService = {
 
  async getHistory(
    restaurantId: string | number,
    params?: { page?: number; pageSize?: number; from?: string; to?: string }
  ): Promise<PaginatedResponse<OrderApiResponse>> {
    if (!restaurantId) {
      throw new Error("Restaurant ID is required");
    }

    const query = new URLSearchParams();
    if (params?.page !== undefined) query.append("page", params.page.toString());
    if (params?.pageSize !== undefined) query.append("pageSize", params.pageSize.toString());
    if (params?.from) query.append("from", params.from);
    if (params?.to) query.append("to", params.to);

    const url = `${REST_HISTORY_ENDPOINTS.HISTORY}/${restaurantId}/details?${query.toString()}`;
    return fetchJsonWithAuth<PaginatedResponse<OrderApiResponse>>(url);
  },


  async getHistoryItem(orderId: number): Promise<OrderApiResponse> {
    return fetchJsonWithAuth<OrderApiResponse>(
      `${REST_HISTORY_ENDPOINTS.HISTORY}/${orderId}`
    );
  },

  /**
   * Delete a history item by order ID
   */
  async deleteHistoryItem(orderId: number): Promise<void> {
    await fetchJsonWithAuth<void>(`${REST_HISTORY_ENDPOINTS.HISTORY}/${orderId}`, {
      method: "DELETE",
    });
  },
};
