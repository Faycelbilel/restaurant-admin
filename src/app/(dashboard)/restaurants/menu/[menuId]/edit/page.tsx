"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { AddDishWizard } from "@/features/restaurants/components/AddDishWizard";
import { categoryApi, type MenuCategory } from "@/features/restaurants/services/categoryApi";
import { menuApi, type CreateMenuItemRequest, type MenuItem } from "@/features/restaurants/services/menuApi";
import type { DishFormData } from "@/features/restaurants/components/AddDishWizard/types";
import { useAuth } from "@/shared/contexts";

export default function EditMenuItemPage() {
  const params = useParams();
  const router = useRouter();
  const { restaurant } = useAuth();
  const restaurantId = restaurant?.id?.toString() || "";
  const restaurantIdNumber = restaurantId ? parseInt(restaurantId, 10) : 0;
  const menuId = params.menuId as string;
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!restaurantId) {
          setIsLoading(false);
          return;
        }
        setIsLoading(true);
        const menuIdNumber = parseInt(menuId, 10);

        // Fetch categories and full menu list, then select the target item
        const [fetchedCategories, menuList] = await Promise.all([
          categoryApi.getCategories(),
          menuApi.getMenuItems(),
        ]);

        const targetItem =
          menuList.find((item) => item.id === menuIdNumber) ?? null;

        setCategories(fetchedCategories);
        setMenuItem(
          targetItem
            ? {
                ...targetItem,
                categoryIds:
                  targetItem.categoryIds ??
                  (targetItem.categories
                    ? targetItem.categories.map((cat) => cat.id)
                    : []),
                imageUrls: targetItem.imageUrls ?? [],
              }
            : null
        );

        if (!targetItem) {
          router.push(`/restaurants/${restaurantId}/menu`);
        }
      } catch (error) {
        router.push(`/restaurants/${restaurantId}/menu`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [restaurantId, menuId, router]);

  const handleCategoryAdd = async (data: { nameEn: string; nameFr: string; nameAr: string }): Promise<void> => {
    if (!restaurantIdNumber) return;
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
        restaurantId: parseInt(restaurantId),
        categoryIds,
        optionGroups: formData.optionGroups,
        imageUrls: formData.existingImageUrls || [], // Keep existing images
      };

      // Update menu item with new images if provided
      await menuApi.updateMenuItem(
        restaurantIdNumber,
        parseInt(menuId),
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

  if (!menuItem) {
    return (
      <div className="flex items-center justify-center p-8">
        <p className="text-sm text-gray-600">Menu item not found</p>
      </div>
    );
  }

  // Map menu item to form data
  const categoryNames = categories
    .filter((cat) => menuItem.categoryIds.includes(cat.id))
    .map((cat) => cat.name);

  const initialData: DishFormData = {
    name: menuItem.name,
    nameEn: menuItem.nameEn,
    nameFr: menuItem.nameFr,
    nameAr: menuItem.nameAr,
    description: menuItem.description,
    descriptionEn: menuItem.descriptionEn,
    descriptionFr: menuItem.descriptionFr,
    descriptionAr: menuItem.descriptionAr,
    price: menuItem.price.toString(),
    categories: categoryNames,
    promotionPrice: menuItem.promotionPrice > 0 ? menuItem.promotionPrice.toString() : "",
    promotionActive: menuItem.promotionActive,
    promotionLabel: menuItem.promotionLabel,
    available: menuItem.available,
    popular: menuItem.popular,
    addonsEnabled: menuItem.optionGroups.length > 0,
    optionGroups: menuItem.optionGroups,
    images: [],
    existingImageUrls: menuItem.imageUrls,
  };

  return (
    <div className="space-y-6 p-6">
      <AddDishWizard
        categories={categories.map((cat) => cat.name)}
        restaurantId={parseInt(restaurantId)}
        onCategoryAdd={handleCategoryAdd}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        initialData={initialData}
        isEditMode
      />
    </div>
  );
}
