import { cn } from "@/shared/utils";
import { AvatarSize } from "@/shared/types/enums";
import { AvatarProps } from "./types";
import { SIZES } from "./constants";

export function Avatar({
  initials,
  accentColor = "from-[#111827] to-[#1f2937]",
  size = AvatarSize.Medium,
  className,
  ...props
}: AvatarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white",
        accentColor,
        SIZES[size],
        className
      )}
      {...props}
    >
      {initials}
    </div>
  );
}
