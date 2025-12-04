import { ReactNode } from "react";

export interface InfoListItem {
  label: string;
  value: string | ReactNode;
}

export interface InfoListProps {
  items: InfoListItem[];
  className?: string;
}
