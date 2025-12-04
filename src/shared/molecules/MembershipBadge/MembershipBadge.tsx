import { Badge } from "@/shared/atoms";
import { Check, X } from "lucide-react";
import { MembershipStatus, BadgeVariant, BadgeSize } from "@/shared/types/enums";
import type { MembershipBadgeProps } from "./types";

export function MembershipBadge({ status, large }: MembershipBadgeProps) {
  const Icon = status === MembershipStatus.Paid ? Check : X;
  const variant = status === MembershipStatus.Paid ? BadgeVariant.Success : BadgeVariant.Danger;

  return (
    <Badge variant={variant} size={large ? BadgeSize.Large : BadgeSize.Medium} className="w-24">
      <Icon className="h-4 w-4" />
      {status === MembershipStatus.Paid ? "Paid" : "Unpaid"}
    </Badge>
  );
}
