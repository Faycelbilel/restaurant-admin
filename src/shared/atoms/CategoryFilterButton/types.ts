import { type ButtonHTMLAttributes } from "react";

export interface CategoryFilterButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
}
