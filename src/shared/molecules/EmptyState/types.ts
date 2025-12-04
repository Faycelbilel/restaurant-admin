import { type ReactNode } from "react";
import { CardVariant } from "@/shared/types/enums";

export interface EmptyStateProps {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
  variant?: CardVariant.Default | CardVariant.Dashed;
  className?: string;
}
