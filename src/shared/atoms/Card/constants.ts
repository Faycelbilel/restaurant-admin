import { CardVariant, CardPadding, CardRounded } from "@/shared/types/enums";

export const BASE_STYLES = "bg-white transition-all duration-150";

export const VARIANTS = {
  [CardVariant.Default]: "border border-gray-100 shadow-sm",
  [CardVariant.Bordered]: "border border-gray-200",
  [CardVariant.Elevated]: "shadow-md",
  [CardVariant.Dashed]: "border border-dashed border-gray-200 bg-gray-50",
};

export const PADDINGS = {
  [CardPadding.None]: "",
  [CardPadding.Small]: "p-3",
  [CardPadding.Medium]: "p-4",
  [CardPadding.Large]: "p-6",
};

export const ROUNDED_CLASSES = {
  [CardRounded.Small]: "rounded-sm",
  [CardRounded.Medium]: "rounded-md",
  [CardRounded.Large]: "rounded-lg",
  [CardRounded.ExtraLarge]: "rounded-xl",
  [CardRounded.TwoExtraLarge]: "rounded-2xl",
  [CardRounded.ThreeExtraLarge]: "rounded-3xl",
};

export const HOVER_CLASSES = "hover:shadow-md hover:-translate-y-0.5";
