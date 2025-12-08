"use client";

import { useState } from "react";
import { DataTable } from "@/shared/organisms";
import { DataTableRenderMode } from "@/shared/types/enums";
import { columns } from "./constants";
import type { OrderApiResponse } from "../../services/api.types";
import { OrderModal } from "./OrderDetails";

interface HistoryTableProps {
  orders: OrderApiResponse[];
  loading?: boolean;
  pagination: {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalItems: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
  };
}

export function HistoryTable({
  orders,
  pagination,
}: Readonly<HistoryTableProps>) {
  const [selectedOrder, setSelectedOrder] = useState<OrderApiResponse | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (order: OrderApiResponse) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <DataTable<OrderApiResponse>
        columns={columns}
        data={orders || []}
        getRowKey={(order) => order?.id?.toString() ?? crypto.randomUUID()}
        renderMode={DataTableRenderMode.Grid}
        gridTemplateColumns="1.1fr 1.4fr 1.4fr 1.2fr 1fr 1fr 1fr 1fr"
        externalPagination={pagination}
        pageSizeOptions={[10, 20, 50, 100]}
        alwaysShowPagination
        onRowClick={(order) => openModal(order)}
      />

      <OrderModal
        order={selectedOrder}
        open={isModalOpen}
        onClose={closeModal}
      />
    </>
  );
}
