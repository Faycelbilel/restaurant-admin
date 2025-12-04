import { forwardRef } from "react";
import { cn } from "@/shared/utils";
import type { InputProps } from "./types";
import { BASE_STYLES } from "./constants";

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(BASE_STYLES, className)}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
