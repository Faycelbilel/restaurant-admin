"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { AddDishWizard } from "@/features/restaurants/components/AddDishWizard";
import { categoryApi, type MenuCategory } from "@/features/restaurants/services/categoryApi";
import { menuApi, type CreateMenuItemRequest } from "@/features/restaurants/services/menuApi";
import type { DishFormData } from "@/features/restaurants/components/AddDishWizard/types";

export default function AddMenuItemPage() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.id as string;
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const fetchedCategories = await categoryApi.getCategories(parseInt(restaurantId));
        setCategories(fetchedCategories);
      } catch (error) {
        setCategories([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [restaurantId]);

  const handleCategoryAdd = async (data: { nameEn: string; nameFr: string; nameAr: string }): Promise<void> => {
    const newCategory = await categoryApi.createCategory(parseInt(restaurantId), {
      name: data.nameEn,
      nameEn: data.nameEn,
      nameFr: data.nameFr,
      nameAr: data.nameAr,
    });
    setCategories((prev) => [...prev, newCategory]);
  };

  const handleSubmit = async (formData: DishFormData) => {
    try {
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
        restaurantId: parseInt(restaurantId),
        categoryIds,
        optionGroups: formData.optionGroups,
        imageUrls: [], // Will be populated by backend after upload
      };

      // Create menu item with images
      await menuApi.createMenuItem(
        parseInt(restaurantId),
        menuData,
        formData.images || []
      );

      // Navigate back to menu page on success
      router.push(`/restaurants/${restaurantId}/menu`);
    } catch (error) {
    }
  };

  const handleCancel = () => {
    router.push(`/restaurants/${restaurantId}/menu`);
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
        restaurantId={parseInt(restaurantId)}
        onCategoryAdd={handleCategoryAdd}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    </div>
  );
}
