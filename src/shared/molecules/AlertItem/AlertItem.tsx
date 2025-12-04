import { Text, Button } from "@/shared/atoms";
import { 
  TextSize, 
  TextWeight, 
  TextColor,
  ButtonVariant,
  ButtonSize 
} from "@/shared/types/enums";
import { AlertTriangle, XCircle, type LucideIcon } from "lucide-react";
import { cn } from "@/shared/utils";
import type { AlertItemProps } from "./types";

export function AlertItem({ 
  type, 
  title, 
  message, 
  actions,
  className 
}: Readonly<AlertItemProps>) {
  const Icon: LucideIcon = type === "warning" ? AlertTriangle : XCircle;
  const iconColor = type === "warning" ? "text-warning" : "text-danger";

  return (
    <div className={cn("rounded-xl border border-gray-200 p-4 space-y-3", className)}>
      <div className="flex items-start gap-3">
        <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", iconColor)} />
        <div className="flex-1">
          <Text 
            size={TextSize.Small} 
            weight={TextWeight.Semibold}
            className="mb-1"
          >
            {title}
          </Text>
          <Text size={TextSize.Small} color={TextColor.Muted}>
            {message}
          </Text>
        </div>
      </div>
      {actions && actions.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {actions.map((action, index: number) => (
            <Button
              key={`action-${action.label}-${index}`}
              variant={ButtonVariant.Secondary}
              size={ButtonSize.Small}
              onClick={action.onClick}
            >
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
}
