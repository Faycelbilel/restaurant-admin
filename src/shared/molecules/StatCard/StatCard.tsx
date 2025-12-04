import { cn } from "@/shared/utils";
import { Text } from "@/shared/atoms";
import { TextElement, TextWeight, TextSize } from "@/shared/types/enums";
import type { StatCardProps } from "./types";

export function StatCard({ label, value, delta, valueClassName }: StatCardProps) {
  return (
    <div className="rounded-3xl border border-gray-200 bg-white px-5 py-6 shadow-sm transition hover:shadow-md">
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
          className={cn("text-gray-800", valueClassName)}
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
