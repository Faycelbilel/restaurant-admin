"use client";

import { cn } from "@/shared/utils";
import { ButtonType } from "@/shared/types/enums";
import type { SelectableChipGroupProps, SelectableChipItem } from "./types";

export function SelectableChipGroup({
  items,
  selectedItems,
  onToggle,
  disabled = false,
  activeClassName = "bg-primary text-white border-primary",
  inactiveClassName = "bg-gray-100 text-gray-400 border-gray-200 hover:border-gray-300",
  className = "",
}: SelectableChipGroupProps) {
  // Helper to determine if item is an object or string
  const isObjectItem = (item: string | SelectableChipItem): item is SelectableChipItem => {
    return typeof item === 'object' && 'value' in item && 'label' in item;
  };

  // Extract value and label from item
  const getItemValue = (item: string | SelectableChipItem): string => {
    return isObjectItem(item) ? item.value : item;
  };

  const getItemLabel = (item: string | SelectableChipItem): string => {
    return isObjectItem(item) ? item.label : item;
  };

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {items.map((item) => {
        const value = getItemValue(item);
        const label = getItemLabel(item);
        
        return (
          <button
            key={value}
            type={ButtonType.Button}
            onClick={() => onToggle(value)}
            disabled={disabled}
            className={cn(
              "px-5 py-2 rounded-full font-medium border transition-all duration-150 whitespace-nowrap",
              selectedItems.includes(value) && !disabled
                ? activeClassName
                : inactiveClassName,
              disabled && "opacity-50 cursor-not-allowed"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
