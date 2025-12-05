"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AuthGuard, TopNav, Sidebar } from "@/shared/organisms";
import { useAuth } from "@/shared/contexts";
import { UserRole } from "@/shared/types";
import type { NavItem } from "@/shared/configs";

export function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

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

  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Dashboard", iconSrc: "/icons/dashboard.svg", href: "/restaurants" },
      { label: "History", iconSrc: "/icons/history.svg", href: "/restaurants/history" },
      { label: "Menu", iconSrc: "/icons/menu.svg", href: "/restaurants/menu" },
      { label: "Billing", iconSrc: "/icons/billing.svg", href: "/restaurants/billing" },
      { label: "Operating Hours", iconSrc: "/icons/clock.svg", href: "/restaurants/operating-hours" },
    ],
    []
  );

  return (
    <AuthGuard>
      <div className="flex h-screen bg-gradient-to-b from-white via-white to-gray-50 text-gray-800">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
          navItems={navItems}
        />
        <div className="flex flex-1 flex-col">
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
      </div>
    </AuthGuard>
  );
}
