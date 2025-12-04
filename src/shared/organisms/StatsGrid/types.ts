import type { ReactNode } from "react";
import { GridGap } from "@/shared/types/enums";

export interface StatsGridProps {
  columns?: 1 | 2 | 3 | 4 | 5;
  gap?: GridGap;
  children: ReactNode;
  className?: string;
}
