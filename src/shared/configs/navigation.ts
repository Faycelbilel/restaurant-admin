export { AppRoute } from "./types/AppRoute";
export type { NavItem } from "./types/NavItem";

import { AppRoute } from "./types/AppRoute";
import type { NavItem } from "./types/NavItem";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Restorants",
    iconSrc: "/icons/restaurants.svg",
    href: AppRoute.Restaurants,
  },
];

export const ROUTE_LABELS: Record<string, string> = {
  [AppRoute.Restaurants]: "Restaurants",
};

export function getRouteLabel(path: string): string {
  if (path.startsWith(AppRoute.Restaurants)) {
    return "Restaurants";
  }
  return ROUTE_LABELS[path] || "Unknown";
}
