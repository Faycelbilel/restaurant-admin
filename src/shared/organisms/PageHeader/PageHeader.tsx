import { cn } from "@/shared/utils";
import { Text } from "@/shared/atoms";
import {
  TextColor,
  TextElement,
  TextSize,
  TextWeight,
} from "@/shared/types/enums";
import type { PageHeaderProps } from "./types";

export function PageHeader({
  title,
  description,
  action,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("space-y-2", className)}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <Text as={TextElement.H1} size={TextSize.ThreeExtraLarge} weight={TextWeight.Semibold} color={TextColor.Secondary}>
            {title}
          </Text>
          {description && (
            <Text as={TextElement.Paragraph} color={TextColor.Muted} className="mt-2">
              {description}
            </Text>
          )}
        </div>
        {action && <div className="flex items-center">{action}</div>}
      </div>
    </header>
  );
}
