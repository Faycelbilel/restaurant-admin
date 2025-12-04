import { cn } from "@/shared/utils";
import type { InfoRowProps } from "./types";

export function InfoRow({
  icon: Icon,
  label,
  className,
  iconClassName,
}: InfoRowProps) {
  return (
    <span className={cn("inline-flex items-center gap-2 text-sm text-gray-600", className)}>
      <Icon className={cn("h-4 w-4 text-primary", iconClassName)} />
      {label}
    </span>
  );
}
