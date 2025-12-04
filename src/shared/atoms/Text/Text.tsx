import { cn } from "@/shared/utils";
import {
  TextElement,
  TextVariant,
  TextWeight,
} from "@/shared/types/enums";
import type { TextProps } from "./types";
import { BASE_STYLES, VARIANTS, WEIGHTS, COLORS, SIZES } from "./constants";

export function Text({
  as: Component = TextElement.Paragraph,
  variant = TextVariant.Body,
  weight = TextWeight.Normal,
  color,
  size,
  className,
  children,
  ...props
}: TextProps) {
  return (
    <Component
      className={cn(
        BASE_STYLES,
        VARIANTS[variant],
        WEIGHTS[weight],
        color && COLORS[color],
        size && SIZES[size],
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}
