import { fetchJsonWithAuth, fetchWithAuth } from "@/lib/services";
import type {
  OrdersPagedResponse,
  GetOrdersParams,
  OrderApiResponse,
} from "./api.types";

const ORDER_ENDPOINTS = {
  GET_ALL: "/api/restaurant/my-orders",
  GET_RESTAURANT_ORDERS: "/api/restaurant/my-orders",
  CANCEL_ORDER: (orderId: number) => `/api/orders/${orderId}/cancel`,
} as const;

/**
 * Builds query string from params object, supporting multiple status values
 */
function buildQueryString(params?: GetOrdersParams): string {
  if (!params) return "";

  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null) continue;

    if (key === "status" && Array.isArray(value)) {
      addStatusParams(searchParams, value);
    } else if (!Array.isArray(value)) {
      searchParams.append(key, value.toString());
    }
  }

  const query = searchParams.toString();
  return query ? `?${query}` : "";
}

/**
 * Helper to add multiple status parameters
 */
function addStatusParams(searchParams: URLSearchParams, statuses: string[]): void {
  for (const status of statuses) {
    if (status) searchParams.append("status", status);
  }
}

/**
 * Order API - Proxy-based implementation
 * All endpoints use authenticated fetch with automatic token refresh
 */
export const orderApi = {
  /**
   * Get all orders with pagination and filtering
   */
  async getOrders(params?: GetOrdersParams): Promise<OrdersPagedResponse> {
    const query = buildQueryString(params);
    return fetchJsonWithAuth<OrdersPagedResponse>(
      `${ORDER_ENDPOINTS.GET_ALL}${query}`
    );
  },

  /**
   * Get restaurant orders with date range filtering
   * FIXED: Map backend → frontend structure
   */
 async getRestaurantOrders(
  _restaurantId: number, // unused but kept for compatibility
  startDate?: string,
  endDate?: string,
  page: number = 1,
  pageSize: number = 20
): Promise<OrdersPagedResponse> {
  const searchParams = new URLSearchParams();
  if (startDate) searchParams.append("startDate", startDate);
  if (endDate) searchParams.append("endDate", endDate);
  searchParams.append("page", page.toString());
  searchParams.append("pageSize", pageSize.toString());

  const query = searchParams.toString();

  // Raw API response
  const api = await fetchJsonWithAuth<any>(
    `${ORDER_ENDPOINTS.GET_RESTAURANT_ORDERS}?${query}`
  );

  const totalPages = Math.ceil((api.totalItems ?? 0) / (api.pageSize ?? pageSize));

  // Map backend → frontend structure
  const mappedItems: OrderApiResponse[] = (api.items || []).map((item: { orderId: any; client: { name: any; }; delivery: { driver: { name: any; }; estimatedReadyAt: string | number | Date; }; payment: { total: any; commission: any; }; date: string | number | Date; status: any; restaurant: { id: any; name: any; }; }) => ({
    id: item.orderId,
    clientName: item.client?.name || "N/A",
    riderName: item.delivery?.driver?.name || "N/A",
    amount: item.payment?.total ?? 0,
    orderDate: item.date,
    status: item.status,
    preparationTime: item.delivery?.estimatedReadyAt
      ? new Date(item.delivery.estimatedReadyAt).getTime() - new Date(item.date).getTime()
      : undefined,
    restaurantId: item.restaurant?.id ?? 0,
    restaurantName: item.restaurant?.name ?? "",
    commission: item.payment?.commission ?? 0, // optional, if your API provides it
  }));

  return {
    content: mappedItems,
    totalElements: api.totalItems ?? 0,
    totalPages,
    number: api.page ?? 0,
    size: api.pageSize ?? pageSize,
    first: (api.page ?? 0) === 0,
    last: (api.page ?? 0) + 1 >= totalPages,
    empty: mappedItems.length === 0,
    numberOfElements: mappedItems.length,
    pageable: {
      pageNumber: api.page ?? 0,
      pageSize: api.pageSize ?? pageSize,
      offset: (api.page ?? 0) * (api.pageSize ?? pageSize),
      paged: true,
      unpaged: false,
      sort: {
        sorted: false,
        unsorted: false,
        empty: false,
      },
    },
    sort: {
      empty: true,
      unsorted: true,
      sorted: false,
    },
  };
},

  /**
   * Cancel an order with a reason provided by the admin
   */
  async cancelOrder(
    orderId: number,
    reason: string
  ): Promise<OrderApiResponse | null> {
    const response = await fetchWithAuth(
      ORDER_ENDPOINTS.CANCEL_ORDER(orderId),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ reason }),
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `Failed to cancel order #${orderId}`,
      }));
      throw new Error(error.message || `Failed to cancel order #${orderId}`);
    }

    try {
      return (await response.json()) as OrderApiResponse;
    } catch {
      return null;
    }
  },
};

/**
 * Fetches paginated orders
 */
export async function getOrdersPaged(
  params?: GetOrdersParams
): Promise<OrdersPagedResponse> {
  return orderApi.getOrders(params || { page: 0, size: 20 });
}
