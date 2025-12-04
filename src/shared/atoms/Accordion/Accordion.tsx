"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/shared/utils";
import type { AccordionProps } from "./types";

export function Accordion({
  header,
  children,
  defaultOpen = false,
  className,
  headerClassName,
  bodyClassName,
  isOpen: controlledIsOpen,
  onToggle,
}: AccordionProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  
  // Use controlled state if provided, otherwise use internal state
  const isOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;
  
  const handleToggle = () => {
    const newState = !isOpen;
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(newState);
    }
    onToggle?.(newState);
  };

  return (
    <div className={cn("border border-gray-200 rounded-2xl overflow-hidden bg-white", className)}>
      {/* Header - Clickable */}
      <button
        onClick={handleToggle}
        className={cn(
          "w-full flex items-center justify-between gap-3 px-4 py-3",
          "bg-white hover:bg-gray-50 transition-colors",
          "text-left font-medium text-gray-900",
          headerClassName
        )}
        aria-expanded={isOpen}
      >
        <span className="flex-1">{header}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-gray-500 transition-transform duration-200 flex-shrink-0",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {/* Body - Collapsible */}
      {isOpen && (
        <div
          className={cn(
            "px-4 py-3 bg-gray-50 border-t border-gray-200",
            "text-gray-700 text-sm leading-relaxed",
            bodyClassName
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
