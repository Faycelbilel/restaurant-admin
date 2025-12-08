"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ChevronLeft, X } from "lucide-react";
import { cn } from "@/shared/utils";
import { Icon, Button } from "@/shared/atoms";
import { BASE_TRANSITION } from "@/shared/configs";
import { ButtonType, ButtonVariant } from "@/shared/types/enums";
import type { SidebarProps } from "./types";

export function Sidebar({
  isCollapsed,
  onToggle,
  navItems,
  isMobileOpen = false,
  onCloseMobile,
}: SidebarProps) {
  const pathname = usePathname();
  const isCompact = isMobileOpen ? false : isCollapsed;
  const widthClass = isCompact ? "w-20" : "w-64";
  const effectiveWidthClass = isMobileOpen ? "w-64" : widthClass;

  return (
    <aside
      className={cn(
        "flex flex-col border-r border-gray-200 bg-white py-8 shadow-sm transition-[width,transform] duration-300",
        effectiveWidthClass,
        isMobileOpen
          ? "fixed inset-y-0 left-0 z-40 translate-x-0"
          : "fixed inset-y-0 left-0 z-40 -translate-x-full",
        "md:static md:z-auto md:flex md:translate-x-0",
        isMobileOpen ? "flex" : "hidden md:flex"
      )}
    >
      <div className="flex flex-1 flex-col relative">
        <div className="mb-6 flex items-center justify-between px-4 md:hidden">
          <span className="text-sm font-semibold text-gray-800">Menu</span>
          <Button
            type={ButtonType.Button}
            variant={ButtonVariant.Secondary}
            className="h-10 w-10 rounded-full p-0"
            onClick={onCloseMobile}
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div
          className={cn(
            "flex flex-col",
            isCompact ? "items-center gap-1" : "gap-2 px-3"
          )}
        >
          {navItems.map(({ label, iconSrc, href }) => {
            const isActive = pathname === href;
            
            return (
              <Link
                key={label}
                href={href}
                className={cn(
                  "flex items-center rounded-2xl px-3 py-3 text-sm font-medium",
                  BASE_TRANSITION,
                  isCompact
                    ? "h-12 w-12 justify-center"
                    : "w-full gap-3 justify-start",
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-600 hover:bg-primary/10 hover:text-gray-800"
                )}
                onClick={() => onCloseMobile?.()}
              >
                <Icon 
                  src={iconSrc} 
                  alt={label} 
                  className="h-5 w-5" 
                  color={isActive ? "#FFFFFF" : "#17213A"}
                />
                <span
                  className={cn(
                    isCompact
                      ? "sr-only"
                      : isActive
                        ? "text-sm font-semibold text-white"
                        : "text-sm font-semibold text-gray-800"
                  )}
                >
                  {label}
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-8 hidden justify-center absolute right-[-20px] top-[40%] md:flex">
          <Button
            type={ButtonType.Button}
            onClick={onToggle}
            aria-label={isCompact ? "Expand sidebar" : "Collapse sidebar"}
            variant={ButtonVariant.Primary}
            className={cn(
              "rounded-full p-2",
              BASE_TRANSITION,
              isCompact ? "justify-center" : "gap-2"
            )}
          >
            {isCompact ? (
              <ChevronRight className="h-6 w-6" />
            ) : (
              <ChevronLeft className="h-6 w-6" />
            )}
          </Button>
        </div>
        <div className="mt-auto flex justify-center px-3">
          <Button
            type={ButtonType.Button}
            variant={ButtonVariant.Primary}
            className={cn(
              "rounded-2xl hover:bg-primary/90",
              BASE_TRANSITION,
              isCompact ? "h-12 w-12 p-0" : "w-full gap-2 px-4 py-3"
            )}
          >
            <Icon src="/icons/logout.svg" alt="Logout" className="h-5 w-5" />
            <span className={isCompact ? "sr-only" : "text-sm font-semibold"}>
              Logout
            </span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
