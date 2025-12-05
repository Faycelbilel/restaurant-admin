"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Plus, Loader2 } from "lucide-react";
import { Button, Text } from "@/shared/atoms";
import { ButtonVariant, ButtonSize, TextElement, TextWeight } from "@/shared/types/enums";
import { MenuItemCard } from "@/features/restaurants/components/MenuItemCard/MenuItemCard";
import { menuApi } from "@/features/restaurants/services/menuApi";
import { Pagination } from "@/shared/molecules";
import type { MenuItem } from "@/features/restaurants/services/menuApi";
import { RestaurantMenuItem } from "@/features/restaurants/types/interfaces/RestaurantMenuItem";

export default function RestaurantMenuPage() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.id as string;
  const PAGE_SIZE = 12;
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setIsLoading(true);
        const items = await menuApi.getMenuItems();
        setMenuItems(items);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch menu items")
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  const totalElements = menuItems.length;
  const totalPages = Math.max(1, Math.ceil(totalElements / PAGE_SIZE));

  const paginatedItems = menuItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  const formatPrice = (value: unknown): string => {
    const numericValue =
      typeof value === "number" ? value : Number(value ?? NaN);
    return Number.isFinite(numericValue) ? numericValue.toFixed(2) : "";
  };

  const mapToCardItem = (item: MenuItem): RestaurantMenuItem => ({
    id: item.id.toString(),
    name: item.name || item.nameEn || item.nameFr || item.nameAr || "Menu item",
    price: formatPrice(item.price),
    isAvailable: item.available,
    category:
      item.categories?.map((cat) => cat.name).join(", ") || "Uncategorized",
    imageUrl: item.imageUrls?.[0],
    description:
      item.description ||
      item.descriptionEn ||
      item.descriptionFr ||
      item.descriptionAr,
  });

  const displayItems = paginatedItems.map(mapToCardItem);

  const handleAddMenuItem = () => {
    router.push(`/restaurants/${restaurantId}/menu/add`);
  };

  const handleEditMenuItem = (item: RestaurantMenuItem) => {
    router.push(`/restaurants/${restaurantId}/menu/${item.id}/edit`);
  };

  const handleDeleteMenuItem = async (item: RestaurantMenuItem) => {
    try {
      await menuApi.deleteMenuItem(Number(item.id));
      setMenuItems((prev) => {
        const updated = prev.filter((menuItem) => menuItem.id.toString() !== item.id);
        const updatedTotalPages = Math.max(
          1,
          Math.ceil(updated.length / PAGE_SIZE)
        );
        if (currentPage > updatedTotalPages) {
          setCurrentPage(updatedTotalPages);
        }
        return updated;
      });
    } catch (err) {
    }
  };

  const handleToggleAvailability = async (item: RestaurantMenuItem) => {
    // TODO: Implement toggle availability API call
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-lg bg-red-50 border border-red-200 p-4">
          <Text className="text-red-800">{error.message}</Text>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Text 
            as={TextElement.H2} 
            weight={TextWeight.Semibold}
            className="text-2xl text-gray-900"
          >
            Menu Items
          </Text>
          <Text className="text-sm text-gray-600 mt-1">
            {totalElements} {totalElements === 1 ? "item" : "items"} total
          </Text>
        </div>
        <Button
          variant={ButtonVariant.Primary}
          size={ButtonSize.Medium}
          onClick={handleAddMenuItem}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add Menu Item</span>
        </Button>
      </div>

      {/* Menu Items Grid */}
      {menuItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <Text className="text-gray-500 mb-4">No menu items found</Text>
          <Button
            variant={ButtonVariant.Primary}
            size={ButtonSize.Medium}
            onClick={handleAddMenuItem}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add First Menu Item</span>
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onClick={() => {}}
                onEdit={handleEditMenuItem}
                onDelete={handleDeleteMenuItem}
                onToggleAvailability={handleToggleAvailability}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
