import { forwardRef } from "react";
import { cn } from "@/shared/utils";
import type { CategoryFilterButtonProps } from "./types";
import { BASE_STYLES, ACTIVE_STYLES, INACTIVE_STYLES } from "./constants";

export const CategoryFilterButton = forwardRef<HTMLButtonElement, CategoryFilterButtonProps>(
  ({ className, isActive = false, children, ...props }, ref) => {
    const activeStyles = isActive ? ACTIVE_STYLES : INACTIVE_STYLES;

    return (
      <button
        ref={ref}
        className={cn(BASE_STYLES, activeStyles, className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CategoryFilterButton.displayName = "CategoryFilterButton";
