import { fetchJsonWithAuth } from "@/lib/services";

export interface MenuCategory {
  id: number;
  name: string;
  nameEn?: string;
  nameFr?: string;
  nameAr?: string;
  restaurantId: number;
}

export interface CreateCategoryRequest {
  name: string;
  nameEn?: string;
  nameFr?: string;
  nameAr?: string;
}

export interface UpdateCategoryRequest {
  name: string;
  nameEn?: string;
  nameFr?: string;
  nameAr?: string;
}

export const categoryApi = {
  /**
   * Get all categories for a restaurant
   */
  async getCategories(restaurantId: number): Promise<MenuCategory[]> {
    return fetchJsonWithAuth<MenuCategory[]>(
      `/api/admin/restaurants/${restaurantId}/categories`
    );
  },

  /**
   * Get a single category by ID
   */
  async getCategory(restaurantId: number, categoryId: number): Promise<MenuCategory> {
    return fetchJsonWithAuth<MenuCategory>(
      `/api/admin/restaurants/${restaurantId}/categories/${categoryId}`
    );
  },

  /**
   * Create a new category
   */
  async createCategory(
    restaurantId: number,
    data: CreateCategoryRequest
  ): Promise<MenuCategory> {
    return fetchJsonWithAuth<MenuCategory>(
      `/api/admin/restaurants/${restaurantId}/categories`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },

  /**
   * Update an existing category
   */
  async updateCategory(
    restaurantId: number,
    categoryId: number,
    data: UpdateCategoryRequest
  ): Promise<MenuCategory> {
    return fetchJsonWithAuth<MenuCategory>(
      `/api/admin/restaurants/${restaurantId}/categories/${categoryId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  },

  /**
   * Delete a category
   */
  async deleteCategory(restaurantId: number, categoryId: number): Promise<void> {
    await fetchJsonWithAuth<void>(
      `/api/admin/restaurants/${restaurantId}/categories/${categoryId}`,
      {
        method: "DELETE",
      }
    );
  },
};

