import { type ButtonHTMLAttributes } from "react";
import { ButtonVariant, ButtonSize, IconButtonRounded } from "@/shared/types/enums";

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  rounded?: IconButtonRounded;
}
