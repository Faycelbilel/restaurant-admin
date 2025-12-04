import { forwardRef } from "react";
import { cn } from "@/shared/utils";
import { ButtonVariant, ButtonSize } from "@/shared/types/enums";
import type { ButtonProps } from "./types";
import { BASE_STYLES, VARIANTS, SIZES } from "./constants";
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = ButtonVariant.Primary, size = ButtonSize.Medium, ...props },
    ref
  ) => {

    return (
      <button
        ref={ref}
        className={cn(BASE_STYLES, VARIANTS[variant], SIZES[size], className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
