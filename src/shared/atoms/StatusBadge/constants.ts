import { StatusBadgeStatus, StatusBadgeSize } from "@/shared/types/enums";

export const BASE_STYLES = "inline-flex items-center gap-2 rounded-full font-semibold uppercase tracking-wide";

export const STATUS_VARIANTS = {
  [StatusBadgeStatus.Active]: {
    badge: "bg-success/15 text-success",
    dot: "bg-success",
  },
  [StatusBadgeStatus.Inactive]: {
    badge: "bg-gray-100 text-gray-600",
    dot: "bg-gray-500",
  },
  [StatusBadgeStatus.Pending]: {
    badge: "bg-yellow-100 text-yellow-700",
    dot: "bg-yellow-500",
  },
  [StatusBadgeStatus.Success]: {
    badge: "bg-success/15 text-success",
    dot: "bg-success",
  },
  [StatusBadgeStatus.Error]: {
    badge: "bg-danger/15 text-danger",
    dot: "bg-danger",
  },
  [StatusBadgeStatus.Preparing]: {
    badge: "bg-blue-100 text-blue-700",
    dot: "bg-blue-500",
  },
  [StatusBadgeStatus.Ready]: {
    badge: "bg-purple-100 text-purple-700",
    dot: "bg-purple-500",
  },
  [StatusBadgeStatus.Delivered]: {
    badge: "bg-success/15 text-success",
    dot: "bg-success",
  },
  [StatusBadgeStatus.Cancelled]: {
    badge: "bg-danger/15 text-danger",
    dot: "bg-danger",
  },
};

export const SIZES = {
  [StatusBadgeSize.Small]: "px-2 py-0.5 text-xs",
  [StatusBadgeSize.Medium]: "px-3 py-1 text-xs",
  [StatusBadgeSize.Large]: "px-4 py-1.5 text-sm",
};

export const DOT_STYLES = "h-2 w-2 rounded-full";
