import { cn } from "@/shared/utils";
import type { FilterGroupProps } from "./types";

export function FilterGroup({ label, children, className }: FilterGroupProps) {
  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <label className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          {label}
        </label>
      )}
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}
