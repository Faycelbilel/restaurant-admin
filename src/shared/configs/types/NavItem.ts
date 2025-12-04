import { AppRoute } from "./AppRoute";

export interface NavItem {
  label: string;
  iconSrc: string;
  href: AppRoute | string;
}
