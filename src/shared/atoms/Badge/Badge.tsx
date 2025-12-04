import { cn } from "@/shared/utils";
import { BadgeSize, BadgeVariant } from "@/shared/types/enums";
import { BASE_STYLES, SIZES, VARIANTS } from "./constants";
import { BadgeProps } from "./types";

export function Badge({
  className,
  variant = BadgeVariant.Success,
  size = BadgeSize.Medium,
  children,
  ...props
}: BadgeProps) {

  return (
    <span
      className={cn(BASE_STYLES, VARIANTS[variant], SIZES[size], className)}
      {...props}
    >
      {children}
    </span>
  );
}
