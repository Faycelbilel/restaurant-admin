import { cn } from "@/shared/utils";
import { Card, Text } from "@/shared/atoms";
import { CardVariant, CardPadding, TextElement, TextSize, TextWeight } from "@/shared/types/enums";
import type { EmptyStateProps } from "./types";

export function EmptyState({
  title = "No data available",
  description,
  icon,
  action,
  variant = CardVariant.Dashed,
  className,
}: EmptyStateProps) {
  return (
    <Card
      variant={variant}
      padding={CardPadding.Large}
      className={cn("text-center", className)}
    >
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <Text 
        as={TextElement.H3}
        size={TextSize.Large}
        weight={TextWeight.Semibold}
        className="text-gray-800"
      >
        {title}
      </Text>
      {description && (
        <Text 
          as={TextElement.Paragraph}
          className="mt-2 text-sm text-gray-500"
        >
          {description}
        </Text>
      )}
      {action && <div className="mt-4">{action}</div>}
    </Card>
  );
}
