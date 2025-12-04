"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { RestaurantDashboardTab } from "@/features/restaurants";
import { useAuth } from "@/shared/contexts";
import { AuthStatus } from "@/shared/types";

export default function RestaurantDashboardPage() {
  const params = useParams();
  const restaurantId = params.id as string;
  const router = useRouter();
  const { restaurant, status } = useAuth();

  useEffect(() => {
    if (restaurant && restaurant.id !== restaurantId) {
      router.replace(`/restaurants/${restaurant.id}/dashboard`);
    }
  }, [restaurant, restaurantId, router]);

  if (status === AuthStatus.Loading) {
    return <div className="flex items-center justify-center p-8">Loading...</div>;
  }

  if (!restaurant || restaurant.id !== restaurantId) {
    return (
      <div className="flex items-center justify-center p-8 text-gray-600">
        Restaurant data not available. Please login again.
      </div>
    );
  }

  return <RestaurantDashboardTab restaurant={restaurant} />;
}
