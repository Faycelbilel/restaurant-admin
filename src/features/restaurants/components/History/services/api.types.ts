// types/order.types.ts (or wherever you keep your types)
export interface MenuItem {
  menuItemId: number;
  menuItemName: string;
  quantity: number;
  extras?: string[];
  specialInstructions?: string | null;
  unitBasePrice?: number;
  unitPrice?: number;
  unitExtrasPrice?: number;
  lineSubtotal?: number;
  promotionDiscount?: number;
  lineItemsTotal?: number;
  extrasTotal?: number;
  lineTotal: number;
}

export interface OrderApiResponse {
  orderDate: any;
  id?: any;
  orderId?: number;
  deliveryAddress: string;
  paymentMethod: string;
  date: string;
  items: MenuItem[]; // <- flat array, not nested

  savedAddress?: {
    id: string;
    type: string;
    label?: string;
    formattedAddress: string;
    placeId?: string;
    entrancePreference?: string;
    entranceNotes?: string;
    directions?: string;
    notes?: string;
    primary?: boolean;
  };

  client: {
    id: number;
    name: string;
  };

  status: string;

  deliveryLocation?: {
    lat: number;
    lng: number;
  };

  restaurantImage?: string;
  restaurantIcon?: string;

  restaurant: {
    id: number;
    name: string;
    address?: string;
    phone?: string;
    imageUrl?: string;
    iconUrl?: string;
    location?: {
      lat: number;
      lng: number;
    };
  };

  delivery?: {
    id: number;
    driver?: {
      id: number;
      name: string;
      phone?: string | null;
    };
    estimatedPickupTime?: number;
    estimatedDeliveryTime?: number;
    estimatedReadyAt?: string;
    pickupTime?: string;
    deliveredTime?: string;
    driverLocation?: {
      lat: number;
      lng: number;
    };
    address?: string;
    location?: {
      lat: number;
      lng: number;
    };
  };

  rating?: {
    timing: number;
    foodCondition: number;
    professionalism: number;
    overall: number;
    comments?: string;
    createdAt: string;
    updatedAt: string;
  };

  payment?: {
    subtotal?: number;
    extrasTotal?: number;
    total?: number;
    itemsSubtotal?: number;
    promotionDiscount?: number;
    couponDiscount?: number;
    itemsTotal?: number;
    deliveryFee?: number;
    serviceFee?: number;
    tipPercentage?: number;
    tipAmount?: number;
    totalBeforeTip?: number;
    cashToCollect?: number;
    status?: string;
    paymentUrl?: string;
    paymentReference?: string;
    environment?: string;
  };

  couponCode?: string;
  estimatedReadyAt?: string;

  clientName?: string;
  riderName?: string;
  restaurantName?: string;
  restaurantAddress?: string;
  restaurantPhone?: string;
  amount?: number; 
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
