"use client";

import React from "react";
import { Badge } from "@/shared/atoms";
import { type ColumnDef } from "@/shared/organisms";
import { BadgeVariant, OrderStatus } from "@/shared/types/enums";
import { OrderApiResponse } from "../../services/api.types";
import { useAuth } from "@/shared";

export const ORDER_STATUS_META: Record<
  OrderStatus,
  { label: string; variant: BadgeVariant }
> = {
  [OrderStatus.Pending]: { label: "Pending", variant: BadgeVariant.Warning },
  [OrderStatus.Accepted]: { label: "Accepted", variant: BadgeVariant.Primary },
  [OrderStatus.Preparing]: {
    label: "Preparing",
    variant: BadgeVariant.Primary,
  },
  [OrderStatus.ReadyForPickUp]: {
    label: "Ready for Pick Up",
    variant: BadgeVariant.Warning,
  },
  [OrderStatus.InDelivery]: {
    label: "In Delivery",
    variant: BadgeVariant.Primary,
  },
  [OrderStatus.Delivered]: {
    label: "Delivered",
    variant: BadgeVariant.Success,
  },
  [OrderStatus.Rejected]: { label: "Rejected", variant: BadgeVariant.Danger },
  [OrderStatus.Canceled]: { label: "Canceled", variant: BadgeVariant.Disabled },
};

export const DATE_FORMAT_LOCALE = "en-GB";

export const useColumns = (): ColumnDef<OrderApiResponse>[] => {
  const { restaurant } = useAuth();
  const commission = restaurant?.commissionRate ?? 0;

  return [
    {
      key: "id",
      header: "Order ID",
      width: "1.1fr",
      cellClassName: "font-semibold text-primary",
      accessor: (order) => (
        <span className="font-semibold text-primary">{order.id}</span>
      ),
    },
    {
      key: "clientName",
      header: "Client Name",
      width: "1.4fr",
      accessor: (order) => order.clientName,
    },
    {
      key: "status",
      header: "Status",
      width: "1.2fr",
      render: (order) => {
        const meta = ORDER_STATUS_META[order.status as OrderStatus];
        return <Badge variant={meta.variant}>{meta.label}</Badge>;
      },
    },
    {
      key: "totalAmount",
      header: "Total Amount",
      width: "1fr",
      cellClassName: "font-semibold text-gray-900",
      accessor: (order) => {
        const orderTotal = order.payment?.itemsTotal ?? 0;
        const couponDiscount = order.payment?.couponDiscount ?? 0;

        const adjustedTotal = orderTotal - couponDiscount;
        const commissionAmount = adjustedTotal * commission;
        const tvaAmount = commissionAmount * 0.19;

        const total = adjustedTotal - (commissionAmount + tvaAmount);
        return total.toFixed(3);
      },
    },
    {
      key: "commission",
      header: "Commission",
      width: "1fr",
      cellClassName: "text-gray-600",
      accessor: () => {
        return commission.toFixed(2) + " TND";
      },
    },
    {
      key: "orderDate",
      header: "Order Date",
      width: "1fr",
      cellClassName: "text-gray-500",
      render: (order) => {
        if (!order.orderDate) return "-";
        try {
          return new Intl.DateTimeFormat(DATE_FORMAT_LOCALE).format(
            new Date(order.orderDate)
          );
        } catch {
          return "-";
        }
      },
    },
  ];
};
