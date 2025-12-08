"use client";

import { useState, useEffect } from "react";
import { SectionHeader } from "@/shared/organisms";
import { RangeDatePicker } from "@/shared/atoms";
import type { DateRange } from "@/shared/atoms/RangeDatePicker/types";
import type { RestaurantHistoryTabProps } from "./types";
import { HistoryTable } from "./HistoryTable";
import { orderApi } from "../services";
import type { OrderApiResponse } from "../services/api.types";

function formatLocalISO(d: Date) {
  // Backend expects format: 2025-10-10 (date only)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export function RestaurantHistoryTab({
  restaurantId,
}: RestaurantHistoryTabProps) {
  const now = new Date();

  const [dateRange, setDateRange] = useState<{
    start: Date;
    end: Date;
  }>({
    start: new Date(now.getFullYear(), now.getMonth(), 1),
    end: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999),
  });

  const [orders, setOrders] = useState<OrderApiResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!restaurantId) return;

      const startStr = formatLocalISO(dateRange.start);
      const endStr = formatLocalISO(dateRange.end);

      console.log("📌 SENT START →", startStr);
      console.log("📌 SENT END   →", endStr);
      console.log("📌 PAGE / SIZE →", currentPage, pageSize);

      try {
        const response = await orderApi.getRestaurantOrders(
          parseInt(restaurantId),
          startStr,
          endStr,
          currentPage - 1,
          pageSize
        );

        setOrders(response?.content ?? []);
        setTotalPages(response?.totalPages ?? 1);
        setTotalElements(response?.totalElements ?? 0);
      } catch (error) {
        console.error("❌ Failed to fetch orders:", error);
        setOrders([]);
        setTotalPages(1);
        setTotalElements(0);
      }
    };

    fetchOrders();
  }, [
    restaurantId,
    dateRange.start.getTime(),
    dateRange.end.getTime(),
    currentPage,
    pageSize,
  ]);

  const handleDateRangeChange = (range: DateRange) => {
    console.log("📅 PICKER:", range);

    const start = new Date(range.startDate);
    start.setHours(0, 0, 0, 0);

    const end = new Date(range.endDate);
    end.setHours(23, 59, 59, 999);

    setDateRange({
      start,
      end,
    });

    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Orders By Time"
        description={`Monitor orders. Total: ${totalElements} orders`}
        action={
          <RangeDatePicker
            startDate={dateRange.start}
            endDate={dateRange.end}
            onSelectRange={handleDateRangeChange}
          />
        }
      />

      <HistoryTable
        orders={orders}
        pagination={{
          currentPage,
          pageSize,
          totalPages,
          totalItems: totalElements,
          onPageChange: setCurrentPage,
          onPageSizeChange: setPageSize,
        }}
      />
    </div>
  );
}
