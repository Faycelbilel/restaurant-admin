export interface RestaurantApiResponse {
  id: number;
  name: string;
  imageUrl: string;
  categories: string[];
  rating: number | null;
  todaySchedule: string | null;
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

export interface RestaurantsPagedResponse {
  content: RestaurantApiResponse[];
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

export interface GetRestaurantsParams {
  query?: string;
  page?: number;
  size?: number;
}

export interface RestaurantAdmin {
  name: string;
  email: string;
}

export interface RestaurantDetailsApiResponse {
  id: number;
  name: string;
  nameEn: string | null;
  nameFr: string | null;
  nameAr: string | null;
  address: string;
  phone: string;
  description: string;
  descriptionEn: string | null;
  descriptionFr: string | null;
  descriptionAr: string | null;
  categories: string[];
  latitude: number;
  longitude: number;
  licenseNumber: string;
  taxId: string;
  commissionRate: number;
  sponsored: boolean;
  position: number | null;
  imageUrl: string;
  iconUrl: string;
  rating: number | null;
  admin: RestaurantAdmin;
}
