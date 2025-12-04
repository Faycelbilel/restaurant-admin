"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/shared/utils";
import type { MultiSelectProps } from "./types";

export function MultiSelect<T = string>({
  options,
  selectedValues,
  onChange,
  placeholder = "Select options",
  className,
  getDisplayText,
}: MultiSelectProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = (value: T) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];

    onChange(newValues);
  };

  const getDefaultDisplayText = () => {
    if (selectedValues.length === 0) return placeholder;
    if (selectedValues.length === 1) {
      const selected = options.find((opt) => opt.value === selectedValues[0]);
      return selected?.label || placeholder;
    }
    return `${selectedValues.length} selected`;
  };

  const displayText = getDisplayText
    ? getDisplayText(selectedValues.length, options.filter((opt) => selectedValues.includes(opt.value)))
    : getDefaultDisplayText();

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-w-[200px] items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
      >
        <span>{displayText}</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[200px] rounded-xl border border-gray-200 bg-white shadow-lg">
          <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
            {options.map((option) => (
              <button
                key={String(option.value)}
                type="button"
                onClick={() => handleToggle(option.value)}
                className="flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors hover:bg-gray-50"
              >
                <span>{option.label}</span>
                {selectedValues.includes(option.value) && (
                  <Check className="h-4 w-4 text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
