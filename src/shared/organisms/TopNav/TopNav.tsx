"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, ChevronRight, Bell, LogOut, Menu } from "lucide-react";
import { Avatar, Button, Text } from "@/shared/atoms";
import { ROUTE_LABELS } from "@/shared/configs";
import { AvatarSize, ButtonType, ButtonVariant, TextElement } from "@/shared/types/enums";
import { useAuth } from "@/shared/contexts";

interface TopNavProps {
  onMenuClick?: () => void;
}

export function TopNav({ onMenuClick }: TopNavProps = {}) {
  const pathname = usePathname();
  const currentLabel = ROUTE_LABELS[pathname] || "Dashboard";
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="grid gap-4 border-b border-white/70 bg-white px-4 py-3 text-center shadow-sm md:grid-cols-[auto_1fr_auto] md:items-center md:px-8">
      <div className="flex items-center gap-3">
        <Button
          type={ButtonType.Button}
          variant={ButtonVariant.Secondary}
          className="h-11 w-11 rounded-2xl p-0 md:hidden"
          onClick={onMenuClick}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
          <ol className="flex items-center gap-2">
            <li className="flex items-center gap-2">
              <Link
                href="/"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Home className="h-4 w-4" />
                <Text as={TextElement.Span} className="hidden sm:inline">Home</Text>
              </Link>
            </li>
            {pathname !== "/" && pathname !== "/home" && (
              <>
                <li>
                  <ChevronRight className="h-3 w-3 text-gray-300" />
                </li>
                <li className="font-semibold text-gray-800">{currentLabel}</li>
              </>
            )}
          </ol>
        </nav>
      </div>

      <div className="flex items-center justify-center gap-4 md:justify-end">
        <Button
          type={ButtonType.Button}
          variant={ButtonVariant.Ghost}
          className="relative h-11 w-11 rounded-full border border-gray-200 p-0 text-gray-500 hover:text-primary hover:bg-transparent"
        >
          <Bell className="h-5 w-5" />
          <Text 
            as={TextElement.Span}
            className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary"
          />
          <Text as={TextElement.Span} className="sr-only">Notifications</Text>
        </Button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setShowUserMenu((prev) => !prev)}
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-full"
          >
            <Avatar 
              initials={user?.name?.substring(0, 2).toUpperCase() || "SA"} 
              size={AvatarSize.Medium} 
            />
          </button>

          {showUserMenu && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-10"
                onClick={() => setShowUserMenu(false)}
                aria-label="Close menu"
              />
              <div className="absolute right-0 top-full mt-2 z-20 w-56 rounded-lg bg-white shadow-lg border border-gray-200 py-2">
                <div className="px-4 py-3 border-b border-gray-100">
                  <Text className="text-sm font-semibold text-gray-900">
                    {user?.name || "Admin"}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {user?.email || "admin@foodify.com"}
                  </Text>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
