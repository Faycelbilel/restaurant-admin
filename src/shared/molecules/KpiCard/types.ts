import { type LucideIcon } from "lucide-react";
import { Trend, KpiCardVariant } from "@/shared/types/enums";

export interface KpiCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  iconClassName?: string;
  delta?: string;
  trend?: Trend;
  variant?: KpiCardVariant;
  className?: string;
}
