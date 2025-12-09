"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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
      {
        label: "Home",
        iconSrc: "/icons/home.svg",
        href: "/restaurants",
      },
      {
        label: "Analytics",
        iconSrc: "/icons/analytics.svg",
        href: "/restaurants/analytics",
      },
      {
        label: "Menu",
        iconSrc: "/icons/menu.svg",
        href: "/restaurants/menu"
      },
      {
        label: "Operating Hours",
        iconSrc: "/icons/clock.svg",
        href: "/restaurants/operating-hours",
      },
      {
        label: "History",
        iconSrc: "/icons/history.svg",
        href: "/restaurants/history",
      },
      {
        label: "Billing",
        iconSrc: "/icons/billing.svg",
        href: "/restaurants/billing",
      },
    ],
    []
  );

  return (
    <AuthGuard>
      <div className="flex h-screen text-gray-800">
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          onToggle={() => setIsSidebarCollapsed((prev) => !prev)}
          navItems={navItems}
          isMobileOpen={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
          onLogout={logout}
        />
        {isMobileSidebarOpen && (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/30 backdrop-blur-[1px] transition-opacity md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
            aria-label="Close sidebar overlay"
          />
        )}

        <div className="flex flex-1 flex-col overflow-hidden bg-gray-50">
          <header className="sticky top-0 z-10 bg-white shadow flex-shrink-0">
            <TopNav onMenuClick={() => setIsMobileSidebarOpen(true)} />
          </header>

          <main className="flex-1 overflow-y-auto bg-white p-4 sm:p-6 lg:px-10 lg:py-8">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
