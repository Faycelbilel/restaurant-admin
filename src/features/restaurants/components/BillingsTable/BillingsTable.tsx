"use client";

import { useState, useEffect, memo, useCallback } from "react";
import { ArrowDownToLine } from "lucide-react";
import { Button } from "@/shared/atoms";
import { DataTable, type ColumnDef } from "@/shared/organisms/DataTable";
import { ButtonVariant, ButtonSize, DataTableRenderMode } from "@/shared/types/enums";
import { restaurantApi } from "../../services/restaurantApi";
import type { BillingsTableProps } from "./types";
import { CURRENCY_FORMAT_OPTIONS, DATE_FORMAT_OPTIONS, DEFAULT_PAGE_SIZE } from "./constants";
import { RestaurantInvoice } from "../../types/interfaces/RestaurantInvoice";

/**
 * Format date string
 */
const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat(DATE_FORMAT_OPTIONS.locale).format(new Date(dateString));
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat(
    DATE_FORMAT_OPTIONS.locale,
    CURRENCY_FORMAT_OPTIONS
  ).format(value);
};

/**
 * Format period from start and end dates
 */
const formatPeriod = (startDate: string, endDate: string): string => {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
};

/**
 * Trigger download of invoice PDF
 */
const handleDownloadInvoice = async (invoice: RestaurantInvoice) => {
  try {
    const blob = await restaurantApi.downloadInvoicePdf(invoice.id);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `invoice-${invoice.invoiceNumber}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    
  }
};

const columns: ColumnDef<RestaurantInvoice>[] = [
  {
    key: "invoiceNumber",
    header: "Invoice Number",
    width: "1.1fr",
    cellClassName: "font-semibold text-primary",
    accessor: (invoice) => invoice.invoiceNumber,
  },
  {
    key: "period",
    header: "Period",
    width: "1.6fr",
    render: (invoice) => formatPeriod(invoice.periodStartDate, invoice.periodEndDate),
  },
  {
    key: "receivedAmount",
    header: "Amount",
    width: "1fr",
    cellClassName: "font-semibold text-gray-900",
    render: (invoice) => formatCurrency(invoice.receivedAmount),
  },
  {
    key: "generationDate",
    header: "Generated On",
    width: "1fr",
    render: (invoice) => formatDate(invoice.generationDate),
  },
  {
    key: "emailSentAt",
    header: "Email Sent",
    width: "1.2fr",
    render: (invoice) => {
      const date = new Date(invoice.emailSentAt);
      return new Intl.DateTimeFormat(DATE_FORMAT_OPTIONS.locale, {
        dateStyle: "short",
        timeStyle: "short",
      }).format(date);
    },
  },
  {
    key: "actions",
    header: "Actions",
    width: "0.9fr",
    render: (invoice) => (
      <Button
        type="button"
        variant={ButtonVariant.Secondary}
        size={ButtonSize.Small}
        className="rounded-xl"
        onClick={() => handleDownloadInvoice(invoice)}
      >
        <ArrowDownToLine className="mr-2 h-4 w-4" />
        Download
      </Button>
    ),
  },
];

export const BillingsTable = memo(function BillingsTable({
  startDate,
  endDate,
  initialPage = 1,
  pageSize: initialPageSize = DEFAULT_PAGE_SIZE,
}: Readonly<BillingsTableProps>) {
  const [invoices, setInvoices] = useState<RestaurantInvoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(0);

  // Memoize page change handler - must be before any conditional returns
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handlePageSizeChange = useCallback((size: number) => {
    setCurrentPage(1);
    setPageSize(size);
  }, []);

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await restaurantApi.getRestaurantInvoices({
          startDate,
          endDate,
          page: currentPage - 1,
          size: pageSize,
        });

        setInvoices(response.content);
        setTotalPages(response.totalPages || 1);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch invoices");
        
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, [startDate, endDate, currentPage, pageSize]);

  if (loading) {
    return <div className="py-8 text-center text-gray-500">Loading invoices...</div>;
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">Error: {error}</div>;
  }

  return (
    <DataTable
      columns={columns}
      data={invoices}
      getRowKey={(invoice) => invoice.id.toString()}
      renderMode={DataTableRenderMode.Grid}
      gridTemplateColumns={columns.map((col) => col.width || "1fr").join(" ")}
      pageSizeOptions={[10, 20, 50, 100]}
      alwaysShowPagination
      externalPagination={{
        currentPage,
        totalPages,
        pageSize,
        onPageChange: handlePageChange,
        onPageSizeChange: handlePageSizeChange,
      }}
    />
  );
});
