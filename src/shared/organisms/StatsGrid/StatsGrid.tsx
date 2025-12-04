import { cn } from "@/shared/utils";
import { GridGap } from "@/shared/types/enums";
import type { StatsGridProps } from "./types";

export function StatsGrid({
  columns = 3,
  gap = GridGap.Large,
  children,
  className,
}: Readonly<StatsGridProps>) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5",
  };

  const gaps = {
    [GridGap.Small]: "gap-3",
    [GridGap.Medium]: "gap-4",
    [GridGap.Large]: "gap-6",
  };

  return (
    <div className={cn("grid", gridCols[columns], gaps[gap], className)}>
      {children}
    </div>
  );
}
