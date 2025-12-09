export const BASE_WRAPPER_STYLES =
  "flex items-center gap-2 text-xs font-semibold text-gray-500";

export const TOGGLE_BASE_STYLES =
  "relative flex items-center rounded-full transition-all duration-150 ease-in-out shadow-inner";

export const ENABLED_BACKGROUND = "bg-success";
export const DISABLED_BACKGROUND = "bg-gray-300";

export const THUMB_BASE_STYLES =
  "rounded-full bg-white shadow transition-transform duration-200";

export const SIZE_STYLES = {
  sm: {
    toggle: "h-5 w-9 px-0.5",
    thumb: "h-4 w-4",
    enabledPosition: "translate-x-4",
    disabledPosition: "translate-x-0",
  },
  md: {
    toggle: "h-7 w-12 px-1",
    thumb: "h-5 w-5",
    enabledPosition: "translate-x-5",
    disabledPosition: "translate-x-0",
  },
} as const;
