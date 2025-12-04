
export interface AuthResponse {
  restaurant?: {
    id: number;
    name: string;
    nameEn: string;
    nameFr: string;
    nameAr: string;
    description: string;
    descriptionEn: string;
    descriptionFr: string;
    descriptionAr: string;
    rating: number;
    imageUrl: string;
    iconUrl: string;
    images: string[] | null;
    address: string;
    manuallyClosed: boolean;
    phone: string;
    licenseNumber: string;
    taxId: string;
    latitude: number;
    longitude: number;
  };
  refreshToken: string;
  user: {
    id: number;
    email: string;
    password: string;
    authProvider: string;
    name: string;
    enabled: boolean;
    role: string;
    restaurantId?: number;
  };
  accessToken: string;
}
