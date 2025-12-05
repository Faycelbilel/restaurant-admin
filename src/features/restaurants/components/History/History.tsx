"use client";

import { Card, Text } from "@/shared/atoms";
import { TextElement, TextWeight } from "@/shared/types/enums";

export function HistoryContent() {
  return (
    <div className="space-y-6 p-6">
      <Card>
        <div className="flex flex-col gap-2">
          <Text as={TextElement.H2} weight={TextWeight.Semibold} className="text-gray-900">
            History
          </Text>
          <Text className="text-gray-600">History section placeholder.</Text>
        </div>
      </Card>
    </div>
  );
}
