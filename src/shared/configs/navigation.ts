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

// Explicit labels for known routes (exact matches)
export const ROUTE_LABELS: Record<string, string> = {
  [AppRoute.Restaurants]: "Home",
  "/restaurants/history": "History",
  "/restaurants/menu": "Menu",
  "/restaurants/billing": "Billing",
  "/restaurants/operating-hours": "Operating Hours",
  "/restaurants/analytics": "Analytics",
};

// Prefix-based labels to cover nested pages
const ROUTE_PREFIX_LABELS: { match: string; label: string }[] = [
  { match: "/restaurants/history", label: "History" },
  { match: "/restaurants/menu", label: "Menu" },
  { match: "/restaurants/billing", label: "Billing" },
  { match: "/restaurants/operating-hours", label: "Operating Hours" },
  { match: "/restaurants/analytics", label: "Analytics" },
  { match: AppRoute.Restaurants, label: "Home" },
];

export function getRouteLabel(path: string): string {
  // Check for exact matches first
  if (ROUTE_LABELS[path]) {
    return ROUTE_LABELS[path];
  }

  // Fallback to prefix matches for nested routes
  const match = ROUTE_PREFIX_LABELS.find(
    ({ match }) => path === match || path.startsWith(`${match}/`)
  );

  return match?.label ?? "Unknown";
}
