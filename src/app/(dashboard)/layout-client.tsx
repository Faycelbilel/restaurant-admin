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

  const restaurantDashboardPath = useMemo(() => {
    if (user?.role !== UserRole.RestaurantAdmin) return null;
    const targetId = user.restaurantId || user.id;
    return targetId ? `/restaurants/${targetId}/dashboard` : null;
  }, [user]);

  useEffect(() => {
    if (restaurantDashboardPath) {
      const normalizedPath = pathname?.replace(/\/$/, "");
      if (!normalizedPath?.startsWith(restaurantDashboardPath)) {
        router.replace(restaurantDashboardPath);
      }
    }
  }, [restaurantDashboardPath, pathname, router]);

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
