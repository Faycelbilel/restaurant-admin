"use client";

import { cn } from "@/shared/utils";
import { ButtonType, TabNavigationVariant } from "@/shared/types/enums";
import type { TabNavigationProps } from "./types/TabNavigationProps";

export function TabNavigation({
  tabs,
  activeTab,
  onTabChange,
  variant = TabNavigationVariant.Pills,
  className,
}: TabNavigationProps) {
  if (variant === TabNavigationVariant.Underline) {
    return (
      <div className={cn("flex flex-wrap items-center gap-2 border-b border-gray-200", className)}>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type={ButtonType.Button}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-1 items-center justify-center gap-2 border-b-2 pb-2 text-sm font-semibold transition-all duration-150",
                isActive
                  ? "border-primary text-primary"
                  : "border-transparent text-gray-500 hover:text-primary"
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {tab.label}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === TabNavigationVariant.Bordered) {
    return (
      <nav className={cn("border-t border-gray-100 pt-4", className)}>
        <ul className="flex flex-wrap items-center justify-center gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <li key={tab.id}>
                <button
                  type={ButtonType.Button}
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    "flex items-center gap-2 rounded-2xl px-5 py-2 text-sm font-semibold transition-all duration-150",
                    isActive
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-600 hover:bg-gray-100"
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {tab.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-2", className)}>
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = tab.id === activeTab;
        return (
          <button
            key={tab.id}
            type={ButtonType.Button}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "flex items-center gap-2 rounded-2xl px-5 py-2 text-sm font-semibold transition-all duration-150",
              isActive
                ? "bg-primary text-white shadow-sm"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {Icon && <Icon className="h-4 w-4" />}
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
