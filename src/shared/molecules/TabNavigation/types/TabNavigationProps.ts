import { TabNavigationVariant } from "@/shared/types/enums";
import { Tab } from "./Tab";

export interface TabNavigationProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  variant?: TabNavigationVariant;
  className?: string;
}
