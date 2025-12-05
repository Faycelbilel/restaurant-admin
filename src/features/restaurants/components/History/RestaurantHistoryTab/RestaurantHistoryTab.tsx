"use client";

import { useState, useEffect } from "react";
import { SectionHeader } from "@/shared/organisms";
import { RangeDatePicker } from "@/shared/atoms";
import type { DateRange } from "@/shared/atoms/RangeDatePicker/types";
import type { RestaurantHistoryTabProps } from "./types";
import { HistoryTable } from "./HistoryTable";
import { orderApi } from "../services";
import { OrderApiResponse } from "../services/api.types";

export function RestaurantHistoryTab({
  restaurantId,
}: RestaurantHistoryTabProps) {
  const now = new Date();
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(now.getFullYear(), now.getMonth(), 1),
    endDate: new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59),
  });
  const [orders, setOrders] = useState<OrderApiResponse[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const startDate = new Date(dateRange.startDate);
        startDate.setHours(0, 0, 0, 0);

        const endDate = new Date(dateRange.endDate);
        endDate.setHours(23, 59, 59, 999);

        const startDateStr = startDate.toISOString().slice(0, 19);
        const endDateStr = endDate.toISOString().slice(0, 19);

        const response = await orderApi.getRestaurantOrders(
          parseInt(restaurantId),
          startDateStr,
          endDateStr,
          currentPage - 1, // API is 0-based
          pageSize
        );

        setOrders(response.content);
        setTotalPages(response.totalPages);
        setTotalElements(response.totalElements);
      } catch (error) {
        setOrders([]);
      }
    };

    fetchOrders();
  }, [restaurantId, dateRange, currentPage, pageSize]);

  const pagination = {
    currentPage,
    pageSize,
    totalPages,
    totalItems: totalElements, // needed by HistoryTable
    onPageChange: (page: number) => setCurrentPage(page),
    onPageSizeChange: (size: number) => {
      setPageSize(size);
      setCurrentPage(1);
    },
  };

  return (
    <div className="space-y-6">
      <SectionHeader
        title="Orders By Time"
        description={`Monitor orders completed, in progress, and pending. Total: ${totalElements} orders`}
        action={
          <RangeDatePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            onSelectRange={setDateRange}
          />
        }
      />

      <HistoryTable orders={orders} pagination={pagination} />
    </div>
  );
}
