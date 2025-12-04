"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/shared/utils";
import type { SelectProps } from "./types";

export function Select({
  value,
  onChange,
  options,
  className,
  label,
  placeholder = "Select an option",
  required = false,
  disabled = false,
}: SelectProps) {
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

  const selectedOption = options.find((opt) => opt.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      {label && (
        <label className="block font-semibold text-gray-800">
          {label}
          {required && <span className="text-danger ml-1">*</span>}
        </label>
      )}
      <div className="w-full relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className={cn(
            "flex w-full items-center justify-between gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors focus:outline-none",
            disabled
              ? "cursor-not-allowed opacity-60"
              : "hover:bg-gray-50 focus:ring-2 focus:ring-primary focus:ring-offset-2"
          )}
        >
          <span>{displayText}</span>
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform",
              isOpen && !disabled && "rotate-180"
            )}
          />
        </button>

        {isOpen && !disabled && (
          <div className="absolute left-0 top-full z-50 mt-2 w-full min-w-[140px] rounded-xl border border-gray-200 bg-white shadow-lg">
            <div className="max-h-[300px] overflow-y-auto p-2 scrollbar-hide">
              {options.map((option) => (
                <button
                  key={String(option.value)}
                  type="button"
                  onClick={() => {
                    if (!option.disabled) {
                      onChange(option.value);
                      setIsOpen(false);
                    }
                  }}
                  disabled={option.disabled}
                  className={cn(
                    "flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2 text-sm text-gray-700 transition-colors",
                    option.disabled
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-gray-50"
                  )}
                >
                  <span>{option.label}</span>
                  {value === option.value && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
