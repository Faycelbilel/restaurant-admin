import { AvatarSize } from "@/shared/types";
import { HTMLAttributes } from "react";

export interface AvatarProps extends HTMLAttributes<HTMLDivElement> {
  initials: string;
  accentColor?: string;
  size?: AvatarSize;
}
