import { Text } from "@/shared/atoms";
import { TextSize, TextWeight, TextColor } from "@/shared/types/enums";
import { cn } from "@/shared/utils";
import type { InfoItemProps } from "./types";

export function InfoItem({ label, value, className }: Readonly<InfoItemProps>) {
  return (
    <div className={cn("flex justify-between py-2 border-b border-gray-100 last:border-0", className)}>
      <Text size={TextSize.Small} weight={TextWeight.Medium} color={TextColor.Muted}>
        {label}
      </Text>
      <Text size={TextSize.Small} weight={TextWeight.Medium} color={TextColor.Secondary}>
        {value}
      </Text>
    </div>
  );
}
