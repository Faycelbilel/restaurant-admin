import { fetchWithAuth } from "@/lib/services";
import type { OptionGroup } from "../components/AddModifierModal/types";
import type { Pageable, Sort } from "../types/api.types";

export interface MenuCategorySummary {
  id: number;
  name: string;
  nameEn?: string;
  nameFr?: string;
  nameAr?: string;
}

export interface MenuItem {
  id: number;
  name: string;
  nameEn: string;
  nameFr: string;
  nameAr: string;
  description: string;
  descriptionEn: string;
  descriptionFr: string;
  descriptionAr: string;
  price: number;
  promotionPrice: number;
  promotionActive: boolean;
  promotionLabel: string;
  available: boolean;
  popular: boolean;
  restaurantId: number;
  categoryIds: number[];
  categories?: MenuCategorySummary[];
  optionGroups: OptionGroup[];
  imageUrls: string[];
}

export interface MenuItemApiResponse {
  id: number;
  name: string;
  nameEn: string | null;
  nameFr: string | null;
  nameAr: string | null;
  imageUrls: string[];
  categoryNames: string[];
  originalPrice: number;
  promotionPrice: number | null;
  available: boolean;
}

export interface MenuItemsPagedResponse {
  content: MenuItemApiResponse[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

export interface CreateMenuItemRequest {
  name: string;
  nameEn: string;
  nameFr: string;
  nameAr: string;
  description: string;
  descriptionEn: string;
  descriptionFr: string;
  descriptionAr: string;
  price: number;
  promotionPrice: number;
  promotionActive: boolean;
  promotionLabel: string;
  available: boolean;
  popular: boolean;
  restaurantId: number;
  categoryIds: number[];
  optionGroups: OptionGroup[];
  imageUrls: string[];
}

export const menuApi = {
  /**
   * Create a new menu item with multiple images
   * Uses multipart/form-data to upload images along with menu data
   */
  async createMenuItem(
    restaurantId: number,
    menuData: CreateMenuItemRequest,
    images: File[]
  ): Promise<MenuItem> {
    const formData = new FormData();
    const normalizedMenuData = { ...menuData, restaurantId };

    // Add menu data as JSON string
    formData.append("menu", JSON.stringify(normalizedMenuData));

    // Add all image files
    images.forEach((file) => {
      formData.append("files", file);
    });

    const response = await fetchWithAuth(
      "/api/restaurant/addMenu",
      {
        method: "POST",
        body: formData,
        // Don't set Content-Type header - browser will set it automatically with boundary
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Failed to create menu item",
      }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  },

  /**
   * Get all menu items for the authenticated restaurant
   */
  async getMenuItems(): Promise<MenuItem[]> {
    const response = await fetchWithAuth("/api/restaurant/my-menu");

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Failed to fetch menu items",
      }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    const data = (await response.json()) as MenuItem[];

    return data.map((item) => ({
      ...item,
      imageUrls: item.imageUrls || [],
       // Ensure required fields are populated from either direct values or nested data
      categoryIds:
        item.categoryIds ??
        (item.categories ? item.categories.map((cat) => cat.id) : []),
      optionGroups: item.optionGroups || [],
    }));
  },

  /**
   * Update an existing menu item for the authenticated restaurant
   */
  async updateMenuItem(
    restaurantId: number,
    menuId: number,
    menuData: CreateMenuItemRequest,
    images?: File[]
  ): Promise<MenuItem> {
    const formData = new FormData();

    // Add menu data as JSON string
    formData.append("menu", JSON.stringify(menuData));

    // Add new image files if provided
    if (images && images.length > 0) {
      images.forEach((file) => {
        formData.append("files", file);
      });
    }

    const response = await fetchWithAuth(
      `/api/restaurant/menu/${menuId}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Failed to update menu item",
      }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }

    return response.json();
  },

  /**
   * Delete a menu item for the authenticated restaurant
   */
  async deleteMenuItem(menuId: number): Promise<void> {
    const response = await fetchWithAuth(
      `/api/restaurant/menu/${menuId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: "Failed to delete menu item",
      }));
      throw new Error(error.message || `HTTP ${response.status}`);
    }
  },
};

/**
 * Fetches paginated menu items from the API
 * @param restaurantId - The restaurant ID
 * @param page - Page number (0-indexed)
 * @param size - Page size
 * @returns Promise with paged response
 */


