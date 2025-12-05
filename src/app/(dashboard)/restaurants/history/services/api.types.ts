export interface OrderApiResponse {
  id: number; // orderId
  clientName: string;
  riderName?: string;
  restaurantId: number;
  restaurantName: string;
  restaurantIcon?: string;
  restaurantImage?: string;
  restaurantAddress?: string;
  restaurantPhone?: string;
  deliveryAddress: string;
  status: string;
  amount: number;
  paymentMethod?: string;
  orderDate: string;
  preparationTime?: number;
  items: {
    menuItemId: number;
    menuItemName: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    extras: string[];
    specialInstructions?: string | null;
  }[];
  payment?: {
    subtotal: number;
    total: number;
    deliveryFee?: number;
    serviceFee?: number;
    tipAmount?: number;
  };
  delivery?: {
    driver?: {
      name: string;
      phone?: string | null;
    };
    estimatedReadyAt?: string;
    pickupTime?: string;
    deliveredTime?: string;
  };
}


export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface OrdersPagedResponse {
  content: OrderApiResponse[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface GetOrdersParams {
  query?: string;
  status?: string | string[];
  restaurantId?: number;
  page?: number;
  size?: number;
}
