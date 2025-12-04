import { ReactNode } from "react";

export interface InfoItemProps {
  label: string;
  value: string | ReactNode;
  className?: string;
}
