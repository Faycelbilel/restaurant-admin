import { type HTMLAttributes } from "react";
import { CardVariant, CardPadding, CardRounded } from "@/shared/types/enums";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: CardPadding;
  rounded?: CardRounded;
  hoverable?: boolean;
}
