import { DataService } from "@/lib/services/DataService";
import type { Restaurant, RestaurantDetails } from "../types/restaurant";
import type { CreateRestaurantPayload } from "../types/addRestaurant";
import { MOCK_RESTAURANTS } from "../mocks";

const simulateApiDelay = async (ms: number = 300): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export async function getAllRestaurants(): Promise<Restaurant[]> {
  await simulateApiDelay();
  return MOCK_RESTAURANTS;
}

export async function getRestaurantById(
  id: string
): Promise<Restaurant | undefined> {
  await simulateApiDelay();
  return MOCK_RESTAURANTS.find((restaurant) => restaurant.id === id);
}

export async function getRestaurantDetails(
  id: string
): Promise<RestaurantDetails | undefined> {
  await simulateApiDelay();
  const restaurant = MOCK_RESTAURANTS.find((r) => r.id === id);
  return restaurant?.details;
}

export function filterRestaurants(
  restaurants: Restaurant[],
  query: string
): Restaurant[] {
  if (!query.trim()) {
    return restaurants;
  }

  const normalizedQuery = query.toLowerCase();
  return restaurants.filter((restaurant) => {
    return (
      restaurant.name.toLowerCase().includes(normalizedQuery) ||
      restaurant.cuisine.toLowerCase().includes(normalizedQuery) ||
      restaurant.details.location.toLowerCase().includes(normalizedQuery)
    );
  });
}

/**
 * Create a new restaurant with multipart/form-data
 * @param payload - Restaurant data
 * @param icon - Icon/profile image file
 * @param image - Banner image file
 * @returns Promise with created restaurant response
 */
export async function createRestaurant(
  payload: CreateRestaurantPayload,
  icon: File | null,
  image: File | null
): Promise<{ id: string; message: string }> {
  const formData = new FormData();

  // Add restaurant JSON data as a string
  const restaurantData = {
    name: payload.name,
    nameEn: payload.nameEn,
    nameFr: payload.nameFr,
    nameAr: payload.nameAr,
    description: payload.description,
    descriptionEn: payload.descriptionEn,
    descriptionFr: payload.descriptionFr,
    descriptionAr: payload.descriptionAr,
    phone: payload.phone,
    address: payload.address,
    latitude: payload.latitude,
    longitude: payload.longitude,
    taxId: payload.taxId,
    licenseNumber: payload.licenseNumber,
    commissionRate: payload.commissionRate,
    categories: payload.categories,
    sponsored: payload.sponsored,
    position: payload.position,
    admin: payload.admin,
  };

  formData.append("restaurant", JSON.stringify(restaurantData));

  // Add image files
  if (icon) {
    formData.append("icon", icon);
  }
  if (image) {
    formData.append("image", image);
  }

  const response = await DataService.post<{ id: string; message: string }>(
    "/admin/restaurants/add",
    formData,
    {
      "Content-Type": "multipart/form-data",
    }
  );

  return response.data;
}

/**
 * Update an existing restaurant with multipart/form-data
 * @param id - Restaurant ID
 * @param payload - Restaurant data (without password)
 * @param icon - Icon/profile image file (optional)
 * @param image - Banner image file (optional)
 * @returns Promise with updated restaurant response
 */
export async function updateRestaurant(
  id: string,
  payload: Omit<CreateRestaurantPayload, "admin"> & { admin: { name: string; email: string } },
  icon: File | null,
  image: File | null
): Promise<{ id: string; message: string }> {
  const formData = new FormData();

  // Add restaurant JSON data as a string
  const restaurantData = {
    name: payload.name,
    nameEn: payload.nameEn,
    nameFr: payload.nameFr,
    nameAr: payload.nameAr,
    description: payload.description,
    descriptionEn: payload.descriptionEn,
    descriptionFr: payload.descriptionFr,
    descriptionAr: payload.descriptionAr,
    phone: payload.phone,
    address: payload.address,
    latitude: payload.latitude,
    longitude: payload.longitude,
    taxId: payload.taxId,
    licenseNumber: payload.licenseNumber,
    commissionRate: payload.commissionRate,
    categories: payload.categories,
    sponsored: payload.sponsored,
    position: payload.position,
    admin: payload.admin,
  };

  formData.append("restaurant", JSON.stringify(restaurantData));

  // Add image files only if provided
  if (icon) {
    formData.append("icon", icon);
  }
  if (image) {
    formData.append("image", image);
  }

  const response = await DataService.put<{ id: string; message: string }>(
    `/admin/restaurants/${id}`,
    formData,
    {
      "Content-Type": "multipart/form-data",
    }
  );

  return response.data;
}
