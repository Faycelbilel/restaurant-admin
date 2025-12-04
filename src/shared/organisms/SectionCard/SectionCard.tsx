import { Card, Text } from "@/shared/atoms";
import { 
  TextElement, 
  TextSize, 
  TextWeight,
  CardPadding 
} from "@/shared/types/enums";
import { cn } from "@/shared/utils";
import type { SectionCardProps } from "./types";

export function SectionCard({ 
  title, 
  children, 
  action,
  className 
}: Readonly<SectionCardProps>) {
  return (
    <Card padding={CardPadding.Large} className={cn(className)}>
      <div className="flex items-center justify-between mb-4">
        <Text 
          as={TextElement.H3} 
          size={TextSize.Large} 
          weight={TextWeight.Semibold}
        >
          {title}
        </Text>
        {action}
      </div>
      {children}
    </Card>
  );
}
