import { ButtonVariant, ButtonSize, IconButtonRounded } from "@/shared/types/enums";

export const BASE_STYLES = "inline-flex items-center justify-center font-semibold transition-all duration-150 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

export const VARIANTS = {
  [ButtonVariant.Primary]: "bg-primary text-white hover:bg-primary/90 focus-visible:outline-primary shadow-sm",
  [ButtonVariant.Secondary]: "border border-gray-200 text-gray-500 hover:border-primary hover:text-primary bg-white",
  [ButtonVariant.Ghost]: "text-gray-600 hover:bg-gray-100 hover:text-gray-800",
  [ButtonVariant.Danger]: "bg-danger text-white hover:bg-danger/90",
};

export const SIZES = {
  [ButtonSize.Small]: "h-8 w-8 p-1.5",
  [ButtonSize.Medium]: "h-10 w-10 p-2",
  [ButtonSize.Large]: "h-12 w-12 p-3",
};

export const ROUNDED_CLASSES = {
  [IconButtonRounded.Medium]: "rounded-md",
  [IconButtonRounded.Large]: "rounded-lg",
  [IconButtonRounded.ExtraLarge]: "rounded-xl",
  [IconButtonRounded.Full]: "rounded-full",
};
