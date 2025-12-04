import { type ReactNode } from "react";
import { SectionHeaderVariant } from "@/shared/types/enums";

export interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  variant?: SectionHeaderVariant;
  className?: string;
}
