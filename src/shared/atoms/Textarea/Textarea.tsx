import { forwardRef } from "react";
import { cn } from "@/shared/utils";
import type { TextareaProps } from "./types";

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          "w-full border border-gray-300 rounded-lg p-3 text-sm resize-none",
          "focus:ring-2 focus:ring-primary focus:border-transparent",
          "placeholder:text-gray-400",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          className
        )}
        {...props}
      />
    );
  }
);

Textarea.displayName = "Textarea";
