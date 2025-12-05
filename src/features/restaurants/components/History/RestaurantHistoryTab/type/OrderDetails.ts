import { OrderStatus } from "@/shared/types/enums";

export interface RestaurantInfo {
  name: string;
  id: string;
  status: string;
  image?: string;
}

export interface RiderInfo {
  name: string;
  id: string;
  phone: string;
  rating?: string;
}

export interface ClientInfo {
  name: string;
  id: string;
  phone: string;
  address?: string;
}

export interface OngoingOrderItem {
  id: string;
  clientName: string;
  status: OrderStatus;
  prepTime: string;
  orderTime: string;
}

export interface OrderDetails {
  id: string;
  status: OrderStatus;
  amount: string;
  orderDate: string;
  orderTime: string;
  restaurant: RestaurantInfo;
  rider?: RiderInfo;
  client: ClientInfo;
  ongoingOrders?: OngoingOrderItem[];
}
