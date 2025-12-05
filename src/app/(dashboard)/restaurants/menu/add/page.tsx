"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AddDishWizard } from "@/features/restaurants/components/AddDishWizard";
import { categoryApi, type MenuCategory } from "@/features/restaurants/services/categoryApi";
import { menuApi, type CreateMenuItemRequest } from "@/features/restaurants/services/menuApi";
import type { DishFormData } from "@/features/restaurants/components/AddDishWizard/types";
import { useAuth } from "@/shared/contexts";

export default function AddMenuItemPage() {
  const router = useRouter();
  const { restaurant } = useAuth();
  const restaurantId = restaurant?.id?.toString() || "";
  const restaurantIdNumber = restaurantId ? parseInt(restaurantId, 10) : 0;
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const fetchedCategories = await categoryApi.getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryAdd = async (data: { nameEn: string; nameFr: string; nameAr: string }): Promise<void> => {
    const newCategory = await categoryApi.createCategory({
      name: data.nameEn,
      nameEn: data.nameEn,
      nameFr: data.nameFr,
      nameAr: data.nameAr,
    });
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleSubmit = async (formData: DishFormData) => {
    try {
      if (!restaurantIdNumber) return;
      // Map category names to category IDs
      const categoryIds = categories
        .filter((cat) => formData.categories.includes(cat.name))
        .map((cat) => cat.id);

      // Prepare menu data according to API structure
      const menuData: CreateMenuItemRequest = {
        name: formData.nameEn,
        nameEn: formData.nameEn,
        nameFr: formData.nameFr,
        nameAr: formData.nameAr,
        description: formData.descriptionEn,
        descriptionEn: formData.descriptionEn,
        descriptionFr: formData.descriptionFr,
        descriptionAr: formData.descriptionAr,
        price: parseFloat(formData.price),
        promotionPrice: formData.promotionPrice ? parseFloat(formData.promotionPrice) : 0,
        promotionActive: formData.promotionActive,
        promotionLabel: formData.promotionLabel,
        available: formData.available,
        popular: formData.popular,
        restaurantId: restaurantIdNumber,
        categoryIds,
        optionGroups: formData.optionGroups,
        imageUrls: [], // Will be populated by backend after upload
      };

      // Create menu item with images
      await menuApi.createMenuItem(
        restaurantIdNumber,
        menuData,
        formData.images || []
      );

      // Navigate back to menu page on success
      router.push(`/restaurants/menu`);
    } catch (error) {
    }
  };

  const handleCancel = () => {
    router.push(`/restaurants/menu`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-primary" />
          <p className="text-sm text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <AddDishWizard
        categories={categories.map((cat) => cat.name)}
        restaurantId={restaurantIdNumber}
        onCategoryAdd={handleCategoryAdd}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
