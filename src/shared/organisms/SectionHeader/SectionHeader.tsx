import { cn } from "@/shared/utils";
import { Card, Text } from "@/shared/atoms";
import {
  CardPadding,
  SectionHeaderVariant,
  TextColor,
  TextElement,
  TextSize,
  TextWeight,
} from "@/shared/types/enums";
import type { SectionHeaderProps } from "./types";

export function SectionHeader({
  title,
  description,
  action,
  variant = SectionHeaderVariant.Default,
  className,
}: SectionHeaderProps) {
  const content = (
    <>
      <div>
        <Text as={TextElement.H2} size={TextSize.Large} weight={TextWeight.Semibold} color={TextColor.Secondary}>
          {title}
        </Text>
        {description && (
          <Text as={TextElement.Paragraph} size={TextSize.Small} color={TextColor.Muted} className="mt-1">
            {description}
          </Text>
        )}
      </div>
      {action && <div className="flex items-center">{action}</div>}
    </>
  );

  if (variant === SectionHeaderVariant.Card) {
    return (
      <Card
        padding={CardPadding.Medium}
        className={cn(
          "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
          className
        )}
      >
        {content}
      </Card>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className
      )}
    >
      {content}
    </div>
  );
}
