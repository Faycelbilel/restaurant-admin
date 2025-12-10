import { fetchJsonWithAuth, fetchWithAuth } from "@/lib/services";
import type {
 
  AnalyticsOverviewResponse,
  AnalyticsSalesTrendResponse,
  AnalyticsTopDishesResponse,
  AnalyticsPeriod
  ,
} from "@/app/(dashboard)/restaurants/analytics/types/api";
import { GetRestaurantInvoicesParams, GetRestaurantsParams, InvoicesPagedResponse, RestaurantsPagedResponse } from "../types/api.types";

const RESTAURANT_ENDPOINTS = {
  GET_ALL: "/api/admin/restaurants",
  GET_SPONSORED_POSITIONS: "/api/admin/restaurants/sponsored-positions",
  ANALYTICS_OVERVIEW: "/api/restaurant/analytics/overview",
  ANALYTICS_SALES_TREND: "/api/restaurant/analytics/sales-trend",
  ANALYTICS_TOP_DISHES: "/api/restaurant/analytics/top-dishes",
  POINTS_BALANCE: "/api/restaurant/points/balance",
  GET_INVOICES: "/api/restaurant/invoices",
  DOWNLOAD_INVOICE_PDF: (invoiceId: number) =>
    `/api/restaurant/${invoiceId}/pdf`,
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

  /**
   * Get analytics overview
   */
async getAnalyticsOverview(period?: AnalyticsPeriod): Promise<AnalyticsOverviewResponse> {
  const query = period ? `?period=${encodeURIComponent(period.toUpperCase())}` : "";
  return fetchJsonWithAuth<AnalyticsOverviewResponse>(
    `${RESTAURANT_ENDPOINTS.ANALYTICS_OVERVIEW}${query}`
  );
},

async getAnalyticsSalesTrend(period?: AnalyticsPeriod): Promise<AnalyticsSalesTrendResponse> {
  const query = period ? `?period=${encodeURIComponent(period.toUpperCase())}` : "";
  return fetchJsonWithAuth<AnalyticsSalesTrendResponse>(
    `${RESTAURANT_ENDPOINTS.ANALYTICS_SALES_TREND}${query}`
  );
},

async getAnalyticsTopDishes(period?: AnalyticsPeriod): Promise<AnalyticsTopDishesResponse> {
  const query = period ? `?period=${encodeURIComponent(period.toUpperCase())}` : "";
  return fetchJsonWithAuth<AnalyticsTopDishesResponse>(
    `${RESTAURANT_ENDPOINTS.ANALYTICS_TOP_DISHES}${query}`
  );
},

  /**
   * Get points balance
   */
  async getPointsBalance(): Promise<number> {
    return fetchJsonWithAuth<number>(RESTAURANT_ENDPOINTS.POINTS_BALANCE);
  },

  async getRestaurantInvoices(
    params: GetRestaurantInvoicesParams
  ): Promise<InvoicesPagedResponse> {
    const { startDate, endDate, page = 0, size = 20 } = params;

    if (!startDate || !endDate) {
      throw new Error("startDate and endDate are required to fetch invoices");
    }

    const searchParams = new URLSearchParams({
      startDate,
      endDate,
      page: page.toString(),
      size: size.toString(),
    });

    const url = `${RESTAURANT_ENDPOINTS.GET_INVOICES}?${searchParams.toString()}`;
    return fetchJsonWithAuth<InvoicesPagedResponse>(url);
  },

  /**
   * Download invoice PDF
   * Returns a blob that can be used to trigger a download
   */
  async downloadInvoicePdf(invoiceId: number): Promise<Blob> {
    const response = await fetchWithAuth(RESTAURANT_ENDPOINTS.DOWNLOAD_INVOICE_PDF(invoiceId), {
      method: "GET",
    });
    
    if (!response.ok) {
      throw new Error(`Failed to download invoice: ${response.statusText}`);
    }
    
    return response.blob();
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
