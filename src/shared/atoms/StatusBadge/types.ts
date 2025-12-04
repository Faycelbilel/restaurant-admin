import { type HTMLAttributes } from "react";
import { StatusBadgeStatus, StatusBadgeSize } from "@/shared/types/enums";

export interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: StatusBadgeStatus;
  label: string;
  showDot?: boolean;
  size?: StatusBadgeSize;
}
