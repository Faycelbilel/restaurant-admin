import { cn } from "@/shared/utils";
import { Trend, KpiCardVariant, TextElement, TextWeight, TextSize } from "@/shared/types/enums";
import { Text } from "@/shared/atoms";
import type { KpiCardProps } from "./types";

export function KpiCard({
  label,
  value,
  icon: Icon,
  iconClassName,
  delta,
  trend,
  variant = KpiCardVariant.Default,
  className,
}: KpiCardProps) {
  if (variant === KpiCardVariant.Compact) {
    return (
      <div
        className={cn(
          "flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm",
          className
        )}
      >
        {Icon && (
          <div
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-2xl",
              iconClassName
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        )}
        <div>
          <Text 
            as={TextElement.Paragraph}
            weight={TextWeight.Semibold}
            className="text-xs uppercase text-gray-500"
          >
            {label}
          </Text>
          <div className="mt-2 flex items-baseline gap-2">
            <Text 
              as={TextElement.Span}
              className="text-2xl font-semibold text-gray-900"
            >
              {value}
            </Text>
            {delta && (
              <Text
                as={TextElement.Span}
                className={cn(
                  "text-sm font-semibold",
                  trend === Trend.Up
                    ? "text-success"
                    : trend === Trend.Down
                      ? "text-danger"
                      : ""
                )}
              >
                {delta}
              </Text>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-3xl border border-gray-200 bg-white px-5 py-6 shadow-sm transition hover:shadow-md",
        className
      )}
    >
      <Text 
        as={TextElement.Paragraph}
        weight={TextWeight.Semibold}
        className="text-sm text-black"
      >
        {label}
      </Text>
      <div className="mt-3 flex items-baseline gap-2">
        <Text 
          as={TextElement.Paragraph}
          weight={TextWeight.Semibold}
          size={TextSize.ThreeExtraLarge}
          className="text-gray-800"
        >
          {value}
        </Text>
        {delta && (
          <Text 
            as={TextElement.Span}
            weight={TextWeight.Semibold}
            className="text-md text-success"
          >
            {delta}
          </Text>
        )}
      </div>
    </div>
  );
}
