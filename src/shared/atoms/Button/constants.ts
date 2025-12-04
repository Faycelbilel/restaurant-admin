import { ButtonSize, ButtonVariant } from "@/shared/types";

export const BASE_STYLES = "inline-flex items-center justify-center rounded-2xl font-semibold transition-all duration-150 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

export const VARIANTS = {
    [ButtonVariant.Primary]: "bg-primary text-white focus-visible:outline-white shadow-md",
    [ButtonVariant.Secondary]: "border border-gray-200 text-gray-500 hover:border-primary hover:text-primary",
    [ButtonVariant.Ghost]: "text-gray-600 hover:bg-gray-100 hover:text-gray-800",
    [ButtonVariant.Danger]: "bg-danger text-white hover:bg-danger/90",
};

export const SIZES = {
    [ButtonSize.Small]: "px-3 py-1.5 text-xs",
    [ButtonSize.Medium]: "px-5 py-3 text-sm",
    [ButtonSize.Large]: "px-6 py-4 text-base",
};