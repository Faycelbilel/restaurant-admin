"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/contexts";
import { AuthStatus, UserRole } from "@/shared/types";

export function RestaurantDashboard() {
  const router = useRouter();
  const { user, restaurant, status } = useAuth();
  const isRestaurantAdmin = user?.role === UserRole.RestaurantAdmin;

  const restaurantDashboardPath = useMemo(() => {
    if (!isRestaurantAdmin) return null;
    return "/restaurants/dashboard";
  }, [isRestaurantAdmin]);

  useEffect(() => {
    if (restaurantDashboardPath && status === AuthStatus.Authenticated) {
      router.replace(restaurantDashboardPath);
    }
  }, [restaurantDashboardPath, router, status]);

  if (status === AuthStatus.Loading) {
    return null;
  }

  if (!restaurantDashboardPath) {
    return (
      <div className="flex items-center justify-center min-h-[200px] text-gray-600">
        Aucune donnee restaurant. Veuillez vous connecter.
      </div>
    );
  }

  return null;
}
