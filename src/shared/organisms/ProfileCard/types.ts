import { BadgeVariant } from "@/shared/types/enums";

export interface ProfileCardProps {
  name: string;
  isConnected?: boolean;
  status?: string;
  statusVariant?: BadgeVariant;
  className?: string;
}
