import { AuthStatus } from "../enums/AuthStatus";
import { UserRole } from "../enums/UserRole";

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  restaurantId?: string;
  token?: string;
}

export interface RestaurantAuthInfo {
  id: string;
  name: string;
  nameEn?: string;
  nameFr?: string;
  nameAr?: string;
  description?: string;
  descriptionEn?: string;
  descriptionFr?: string;
  descriptionAr?: string;
  rating?: number;
  imageUrl?: string;
  iconUrl?: string;
  images?: string[] | null;
  address?: string;
  manuallyClosed?: boolean;
  sponsored?: boolean;
  phone?: string;
  licenseNumber?: string;
  taxId?: string;
  latitude?: number;
  longitude?: number;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthContextValue {
  user: User | null;
  restaurant: RestaurantAuthInfo | null;
  status: AuthStatus;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}
