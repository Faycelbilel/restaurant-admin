"use client";

import { useState } from "react";
import { BillingsTable } from "@/features/restaurants/components/BillingsTable";
import { RangeDatePicker } from "@/shared/atoms";
import type { DateRange } from "@/shared/atoms/RangeDatePicker/types";
import { SectionHeader } from "@/shared/organisms";
import { useAuth } from "@/shared/contexts";

function formatLocalISODate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;
}

export default function RestaurantBillingPage() {
  const { restaurant } = useAuth();
  const now = new Date();

  const [dateRange, setDateRange] = useState<{
    start: Date;
    end: Date;
  }>({
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999),
  });

  const handleDateRangeChange = (range: DateRange) => {
    const start = new Date(range.startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(range.endDate);
    end.setHours(23, 59, 59, 999);

    setDateRange({ start, end });
  };

  if (!restaurant) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-10 text-center text-gray-600 shadow-sm">
        Restaurant data not available. Please login again.
      </div>
    );
  }

  const startDate = formatLocalISODate(dateRange.start);
  const endDate = formatLocalISODate(dateRange.end);

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Billing"
        description="Review invoices for the selected period."
        action={
          <RangeDatePicker
            startDate={dateRange.start}
            endDate={dateRange.end}
            onSelectRange={handleDateRangeChange}
            label="Period"
          />
        }
      />

      <BillingsTable
        startDate={startDate}
        endDate={endDate}
        pageSize={20}
        key={`${startDate}-${endDate}`}
      />
    </div>
  );
}
