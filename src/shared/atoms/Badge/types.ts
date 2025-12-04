import { type HTMLAttributes } from "react";
import { BadgeVariant, BadgeSize } from "@/shared/types/enums";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
}
