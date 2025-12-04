import { Card, Text, Badge } from "@/shared/atoms";
import { ConnectionStatus } from "@/shared/molecules";
import { 
  TextElement, 
  TextSize, 
  TextWeight, 
  TextColor,
  BadgeVariant,
  CardPadding 
} from "@/shared/types/enums";
import { cn } from "@/shared/utils";
import type { ProfileCardProps } from "./types";

export function ProfileCard({ 
  name,
  isConnected,
  status,
  statusVariant,
  className 
}: Readonly<ProfileCardProps>) {
  return (
    <Card 
      padding={CardPadding.Large} 
      className={cn("bg-gradient-to-r from-primary/5 to-primary/10", className)}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Text 
            as={TextElement.H2} 
            size={TextSize.TwoExtraLarge} 
            weight={TextWeight.Semibold}
            color={TextColor.Secondary}
          >
            {name}
          </Text>
          {isConnected !== undefined && (
            <ConnectionStatus isConnected={isConnected} className="mt-2" />
          )}
        </div>
        {status && (
          <Badge variant={statusVariant || BadgeVariant.Default}>
            {status}
          </Badge>
        )}
      </div>
    </Card>
  );
}
