import { forwardRef } from "react";
import { cn } from "@/shared/utils";
import { ButtonVariant, ButtonSize, IconButtonRounded } from "@/shared/types/enums";
import type { IconButtonProps } from "./types";
import { BASE_STYLES, VARIANTS, SIZES, ROUNDED_CLASSES } from "./constants";

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = ButtonVariant.Primary,
      size = ButtonSize.Medium,
      rounded = IconButtonRounded.Full,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          BASE_STYLES,
          VARIANTS[variant],
          SIZES[size],
          ROUNDED_CLASSES[rounded],
          className
        )}
        {...props}
      />
    );
  }
);

IconButton.displayName = "IconButton";
