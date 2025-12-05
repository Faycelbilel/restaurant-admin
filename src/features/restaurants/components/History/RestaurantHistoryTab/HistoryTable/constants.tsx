"use client";

import { Badge } from "@/shared/atoms";
import { type ColumnDef } from "@/shared/organisms";
import { BadgeVariant, OrderStatus } from "@/shared/types/enums";
import type { LucideIcon } from "lucide-react";
import { CheckCircle2, Clock3, UtensilsCrossed } from "lucide-react";
import { OrderApiResponse } from "../../services/api.types";

export const ORDER_STATUS_META: Record<
  OrderStatus,
  {
    icon: LucideIcon;
    label: string;
    variant: BadgeVariant;
  }
> = {
  [OrderStatus.Pending]: {
    icon: Clock3,
    label: "Pending",
    variant: BadgeVariant.Warning,
  },
  [OrderStatus.Accepted]: {
    icon: CheckCircle2,
    label: "Accepted",
    variant: BadgeVariant.Primary,
  },
  [OrderStatus.Preparing]: {
    icon: UtensilsCrossed,
    label: "Preparing",
    variant: BadgeVariant.Primary,
  },
  [OrderStatus.ReadyForPickUp]: {
    icon: CheckCircle2,
    label: "Ready for Pick Up",
    variant: BadgeVariant.Warning,
  },
  [OrderStatus.InDelivery]: {
    icon: CheckCircle2,
    label: "In Delivery",
    variant: BadgeVariant.Primary,
  },
  [OrderStatus.Delivered]: {
    icon: CheckCircle2,
    label: "Delivered",
    variant: BadgeVariant.Success,
  },
  [OrderStatus.Rejected]: {
    icon: Clock3,
    label: "Rejected",
    variant: BadgeVariant.Danger,
  },
  [OrderStatus.Canceled]: {
    icon: Clock3,
    label: "Canceled",
    variant: BadgeVariant.Disabled,
  },
};

export const DATE_FORMAT_LOCALE = "en-GB";

export const columns: ColumnDef<OrderApiResponse>[] = [
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
    key: "riderName",
    header: "Rider Name",
    width: "1.4fr",
    cellClassName: "text-gray-600",
    render: (order) =>
      (order as any).riderName ?? <span className="text-gray-400">—</span>,
  },
  {
    key: "status",
    header: "Status",
    width: "1.2fr",
    render: (order) => {
      const meta = ORDER_STATUS_META[order.status as OrderStatus];

      return <Badge variant={meta.variant as BadgeVariant}>{meta.label}</Badge>;
    },
  },
  {
    key: "prepTime",
    header: "Prep Time",
    width: "1fr",
    render: (order) =>
      (order as any).prepTime ?? <span className="text-gray-400">—</span>,
  },
  {
    key: "totalAmount",
    header: "Total Amount",
    width: "1fr",
    cellClassName: "font-semibold text-gray-900",
    accessor: (order) => (order as any).totalAmount ?? order.amount,
  },
  {
    key: "commission",
    header: "Commission",
    width: "1fr",
    cellClassName: "text-gray-600",
    accessor: (order) => (order as any).commission ?? 0,
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
