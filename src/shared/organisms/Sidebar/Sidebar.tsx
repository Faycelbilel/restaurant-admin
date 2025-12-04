"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { cn } from "@/shared/utils";
import { Icon, Button } from "@/shared/atoms";
import { BASE_TRANSITION } from "@/shared/configs";
import { ButtonType, ButtonVariant } from "@/shared/types/enums";
import type { SidebarProps } from "./types";

export function Sidebar({ isCollapsed, onToggle, navItems }: SidebarProps) {
  const pathname = usePathname();
  const widthClass = isCollapsed ? "w-20" : "w-64";

  return (
    <aside
      className={cn(
        "hidden flex-col border-r border-gray-200 bg-white py-8 shadow-sm transition-[width] duration-300 md:flex",
        widthClass
      )}
    >
      <div className="flex flex-1 flex-col relative">
        <div
          className={cn(
            "flex flex-col",
            isCollapsed ? "items-center gap-1" : "gap-2 px-3"
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
                  isCollapsed
                    ? "h-12 w-12 justify-center"
                    : "w-full gap-3 justify-start",
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-600 hover:bg-primary/10 hover:text-gray-800"
                )}
              >
                <Icon 
                  src={iconSrc} 
                  alt={label} 
                  className="h-5 w-5" 
                  color={isActive ? "#FFFFFF" : "#17213A"}
                />
                <span
                  className={cn(
                    isCollapsed
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
        <div className="mt-8 flex justify-center absolute right-[-20px] top-[40%]">
          <Button
            type={ButtonType.Button}
            onClick={onToggle}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            variant={ButtonVariant.Primary}
            className={cn(
              "rounded-full p-2",
              BASE_TRANSITION,
              isCollapsed ? "justify-center" : "gap-2"
            )}
          >
            {isCollapsed ? (
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
              isCollapsed ? "h-12 w-12 p-0" : "w-full gap-2 px-4 py-3"
            )}
          >
            <Icon src="/icons/logout.svg" alt="Logout" className="h-5 w-5" />
            <span className={isCollapsed ? "sr-only" : "text-sm font-semibold"}>
              Logout
            </span>
          </Button>
        </div>
      </div>
    </aside>
  );
}
