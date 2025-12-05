"use client";

import { useAuth } from "@/shared/contexts";
import { RestaurantHistoryTab } from "@/features/restaurants/components/History/RestaurantHistoryTab/RestaurantHistoryTab";

export default function RestaurantHistoryPage() {
  const { restaurant } = useAuth();

  if (!restaurant) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-10 text-center text-gray-600 shadow-sm">
        Restaurant data not available. Please login again.
      </div>
    );
  }

  return <RestaurantHistoryTab restaurantId={restaurant.id.toString()} />;
}
