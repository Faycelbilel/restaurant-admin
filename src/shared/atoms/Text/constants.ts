import {
  TextVariant,
  TextWeight,
  TextColor,
  TextSize,
} from "@/shared/types/enums";

export const BASE_STYLES = "text-black transition-colors duration-150";

export const VARIANTS = {
  [TextVariant.Body]: "text-sm",
  [TextVariant.Caption]: "text-xs",
  [TextVariant.Label]: "text-xs font-semibold uppercase tracking-wide",
  [TextVariant.Heading]: "font-semibold",
};

export const WEIGHTS = {
  [TextWeight.Normal]: "font-normal",
  [TextWeight.Medium]: "font-medium",
  [TextWeight.Semibold]: "font-semibold",
  [TextWeight.Bold]: "font-bold",
};

export const COLORS = {
  [TextColor.Primary]: "text-primary",
  [TextColor.Secondary]: "text-gray-800",
  [TextColor.Success]: "text-success",
  [TextColor.Danger]: "text-danger",
  [TextColor.Muted]: "text-gray-500",
};

export const SIZES = {
  [TextSize.ExtraSmall]: "text-xs",
  [TextSize.Small]: "text-sm",
  [TextSize.Medium]: "text-base",
  [TextSize.Large]: "text-lg",
  [TextSize.ExtraLarge]: "text-xl",
  [TextSize.TwoExtraLarge]: "text-2xl",
  [TextSize.ThreeExtraLarge]: "text-3xl",
};
