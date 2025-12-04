import { BadgeSize, BadgeVariant } from "@/shared/types";

export const BASE_STYLES = "inline-flex items-center justify-center gap-1 rounded-xl font-semibold";

export const VARIANTS = {
    [BadgeVariant.Default]: "bg-gray-100 text-gray-700",
    [BadgeVariant.Primary]: "bg-primary/15 text-primary",
    [BadgeVariant.Success]: "bg-success/15 text-success",
    [BadgeVariant.Danger]: "bg-danger/15 text-danger",
    [BadgeVariant.Disabled]: "bg-gray-200 text-gray-600",
    [BadgeVariant.Warning]: "bg-yellow-100 text-yellow-700",
};

export const SIZES = {
    [BadgeSize.Small]: "px-2 py-1 text-xs",
    [BadgeSize.Medium]: "px-3 py-2 text-xs",
    [BadgeSize.Large]: "px-4 py-1.5 text-sm",
};