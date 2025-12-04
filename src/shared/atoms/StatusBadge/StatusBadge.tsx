import { cn } from "@/shared/utils";
import { StatusBadgeSize } from "@/shared/types/enums";
import type { StatusBadgeProps } from "./types";
import { BASE_STYLES, STATUS_VARIANTS, SIZES, DOT_STYLES } from "./constants";

export function StatusBadge({
  status,
  label,
  showDot = true,
  size = StatusBadgeSize.Medium,
  className,
  ...props
}: StatusBadgeProps) {
  const { badge, dot } = STATUS_VARIANTS[status];

  return (
    <span
      className={cn(BASE_STYLES, badge, SIZES[size], className)}
      {...props}
    >
      {showDot && <span className={cn(DOT_STYLES, dot)} />}
      {label}
    </span>
  );
}
