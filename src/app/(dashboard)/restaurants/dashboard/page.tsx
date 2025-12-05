"use client";

import { useAuth } from "@/shared/contexts";
import { AuthStatus } from "@/shared/types";
import { RestaurantDashboardTab } from "@/features/restaurants";

export default function RestaurantDashboardPage() {
  const { restaurant, status } = useAuth();

  if (status === AuthStatus.Loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  if (!restaurant) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-600">
        Restaurant data not available. Please login again.
      </div>
    );
  }

  return <RestaurantDashboardTab restaurant={restaurant} />;
}
