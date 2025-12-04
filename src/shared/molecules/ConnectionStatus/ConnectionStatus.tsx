import { Text } from "@/shared/atoms";
import { TextSize, TextColor } from "@/shared/types/enums";
import { Wifi, WifiOff } from "lucide-react";
import { cn } from "@/shared/utils";
import type { ConnectionStatusProps } from "./types";

export function ConnectionStatus({ 
  isConnected, 
  connectedLabel = "Connected",
  disconnectedLabel = "Disconnected",
  className 
}: ConnectionStatusProps) {
  const Icon = isConnected ? Wifi : WifiOff;
  const iconColor = isConnected ? "text-success" : "text-gray-400";
  const textColor = isConnected ? TextColor.Success : TextColor.Muted;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Icon className={cn("h-4 w-4", iconColor)} />
      <Text size={TextSize.Small} color={textColor}>
        {isConnected ? connectedLabel : disconnectedLabel}
      </Text>
    </div>
  );
}
