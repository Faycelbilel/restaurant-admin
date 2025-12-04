import { ReactNode } from "react";
import { DataTableRenderMode } from "@/shared/types/enums";
import type { ColumnDef } from "./ColumnDef";

export interface DataTableProps<TData = unknown> {
  
  columns: ColumnDef<TData>[];
  
  data: TData[];
  
  getRowKey?: (row: TData, index: number) => string;
  
  pagination?: boolean;
  
  initialPageSize?: number;
  
  pageSizeOptions?: number[];
  
  showPageSize?: boolean;
  
  alwaysShowPagination?: boolean;
  
  emptyState?: ReactNode;
  
  className?: string;
  
  tableClassName?: string;
  
  hoverable?: boolean;
  
  onRowClick?: (row: TData) => void;
  
  showHeader?: boolean;
  
  renderMode?: DataTableRenderMode;
  
  gridTemplateColumns?: string;
  
  // Server-side pagination support
  externalPagination?: {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
  };
}
