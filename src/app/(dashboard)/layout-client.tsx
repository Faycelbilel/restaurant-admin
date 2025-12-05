"use client";

import { useEffect, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthGuard, TopNav } from "@/shared/organisms";
import { useAuth } from "@/shared/contexts";
import { UserRole } from "@/shared/types";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const restaurantRootPath = useMemo(() => {
    if (user?.role !== UserRole.RestaurantAdmin) return null;
    return "/restaurants";
  }, [user]);

  useEffect(() => {
    if (!restaurantRootPath) return;
    const normalizedPath = pathname?.replace(/\/$/, "");
    const isRestaurantsPath =
      normalizedPath === restaurantRootPath ||
      normalizedPath?.startsWith(`${restaurantRootPath}/`);

    // Only redirect if the user is a restaurant admin and is outside the restaurants area
    if (!isRestaurantsPath) {
      router.replace(restaurantRootPath);
    }
  }, [restaurantRootPath, pathname, router]);

  return (
    <AuthGuard>
      <div className="flex h-screen flex-col bg-gradient-to-b from-white via-white to-gray-50 text-gray-800">
        <header className="sticky top-0 z-20 border-b border-gray-100 bg-white/90 backdrop-blur">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <TopNav />
          </div>
        </header>

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}
