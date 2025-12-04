import { cn } from "@/shared/utils";
import type { LabelProps } from "./types";
import { BASE_STYLES, DISABLED_STYLES, REQUIRED_STYLES } from "./constants";

export function Label({
  className,
  required,
  disabled,
  children,
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        BASE_STYLES,
        disabled && DISABLED_STYLES,
        className
      )}
      {...props}
    >
      {children}
      {required && <span className={REQUIRED_STYLES}>*</span>}
    </label>
  );
}
