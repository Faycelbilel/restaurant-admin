import type { NavItem } from "@/shared/configs";

export interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  navItems: NavItem[];
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
  onLogout?: () => void;
}
