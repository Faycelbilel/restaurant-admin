import { type HTMLAttributes } from "react";
import {
  TextElement,
  TextVariant,
  TextWeight,
  TextColor,
  TextSize,
} from "@/shared/types/enums";

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: TextElement;
  variant?: TextVariant;
  weight?: TextWeight;
  color?: TextColor;
  size?: TextSize;
}
