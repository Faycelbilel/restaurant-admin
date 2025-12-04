import { type ButtonHTMLAttributes } from "react";
import { ButtonVariant, ButtonSize } from "@/shared/types/enums";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}
