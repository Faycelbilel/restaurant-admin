import { cn } from "@/shared/utils";
import { CardVariant, CardPadding, CardRounded } from "@/shared/types/enums";
import type { CardProps } from "./types";
import { BASE_STYLES, VARIANTS, PADDINGS, ROUNDED_CLASSES, HOVER_CLASSES } from "./constants";

export function Card({
  variant = CardVariant.Default,
  padding = CardPadding.Medium,
  rounded = CardRounded.ThreeExtraLarge,
  hoverable = false,
  className,
  children,
  ...props
}: CardProps) {
  const hoverClasses = hoverable ? HOVER_CLASSES : "";

  return (
    <div
      className={cn(
        BASE_STYLES,
        VARIANTS[variant],
        PADDINGS[padding],
        ROUNDED_CLASSES[rounded],
        hoverClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
