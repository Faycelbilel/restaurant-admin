"use client";

import { useState, useMemo } from "react";
import { Pagination } from "@/shared/molecules";
import { Select } from "@/shared/atoms";
import { cn } from "@/shared/utils";
import { DataTableRenderMode } from "@/shared/types/enums";
import type { DataTableProps } from "./types";

export function DataTable<TData = unknown>({
  columns,
  data = [],
  getRowKey = (_, index) => String(index),
  pagination = true,
  initialPageSize = 5,
  pageSizeOptions = [5, 10, 20, 50],
  showPageSize = true,
  alwaysShowPagination = false,
  emptyState,
  className,
  tableClassName,
  hoverable = true,
  onRowClick,
  showHeader = true,
  renderMode = DataTableRenderMode.Grid,
  gridTemplateColumns,
  externalPagination,
}: DataTableProps<TData>) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  // Use external pagination if provided, otherwise use internal
  const isExternalPagination = !!externalPagination;
  const activePage = isExternalPagination
    ? externalPagination.currentPage
    : currentPage;
  const activePageSize = isExternalPagination
    ? externalPagination.pageSize
    : pageSize;
  const activeTotalPages = isExternalPagination
    ? externalPagination.totalPages
    : Math.ceil(data.length / activePageSize);

  // For internal pagination, slice the data
  const startIndex = (activePage - 1) * activePageSize;
  const endIndex = startIndex + activePageSize;
  const paginatedData =
    pagination && !isExternalPagination
      ? data.slice(startIndex, endIndex)
      : data;

  const gridTemplate = useMemo(() => {
    if (gridTemplateColumns) return gridTemplateColumns;
    if (columns.every((col) => col.width)) {
      return columns.map((col) => col.width).join(" ");
    }
    return `repeat(${columns.length}, 1fr)`;
  }, [columns, gridTemplateColumns]);

  const handlePageChange = (page: number) => {
    if (isExternalPagination) {
      externalPagination.onPageChange(page);
    } else {
      setCurrentPage(page);
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    if (isExternalPagination) {
      externalPagination.onPageSizeChange(newSize);
    } else {
      setPageSize(newSize);
      setCurrentPage(1);
    }
  };

  if (data.length === 0) {
    return (
      <div className={cn("space-y-4", className)}>
        {emptyState || (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-6 text-center text-sm text-gray-500">
            No data available.
          </div>
        )}
      </div>
    );
  }

  if (renderMode === DataTableRenderMode.Grid) {
    return (
      <div className={cn("space-y-4", className)}>
        <div
          className={cn(
            "overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm",
            tableClassName
          )}
        >
          {showHeader && (
            <div
              className="hidden rounded-xl bg-gray-50 px-6 py-4 text-xs font-semibold tracking-wide text-gray-600 shadow-sm lg:grid"
              style={{
                gridTemplateColumns: gridTemplate,
              }}
            >
              {columns.map((column) => (
                <span key={column.key} className={column.headerClassName}>
                  {column.header}
                </span>
              ))}
            </div>
          )}
          <div className="divide-y divide-gray-100">
            {paginatedData.map((row, index) => (
              <div
                key={getRowKey(row, index)}
                className={cn(
                  "grid grid-cols-1 gap-3 px-6 py-5 text-sm text-gray-700 lg:grid-cols-[auto]",
                  hoverable && "transition hover:bg-gray-50",
                  onRowClick && "cursor-pointer"
                )}
                style={{
                  gridTemplateColumns: gridTemplate,
                }}
                onClick={() => onRowClick?.(row)}
              >
                {columns.map((column) => (
                  <div key={column.key} className={column.cellClassName}>
                    {column.render
                      ? column.render(row)
                      : column.accessor
                        ? column.accessor(row)
                        : null}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {pagination && (alwaysShowPagination || activeTotalPages > 1) && (
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            {showPageSize && (
              <Select
                value={activePageSize}
                onChange={(value) => handlePageSizeChange(Number(value))}
                options={pageSizeOptions.map((size) => ({
                  value: size,
                  label: `${size} per page`,
                }))}
                label="Show:"
              />
            )}
            {activeTotalPages > 1 && (
              <Pagination
                currentPage={activePage}
                totalPages={activeTotalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div
        className={cn(
          "overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm",
          tableClassName
        )}
      >
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            {showHeader && (
              <thead className="bg-gray-50">
                <tr className="text-left text-xs font-semibold tracking-wide text-gray-600">
                  {columns.map((column) => (
                    <th
                      key={column.key}
                      className={cn("px-6 py-4", column.headerClassName)}
                    >
                      {column.header}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
              {paginatedData.map((row, index) => (
                <tr
                  key={getRowKey(row, index)}
                  className={cn(
                    hoverable && "transition hover:bg-gray-50",
                    onRowClick && "cursor-pointer"
                  )}
                  onClick={() => onRowClick?.(row)}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className={cn("px-6 py-4", column.cellClassName)}
                    >
                      {column.render
                        ? column.render(row)
                        : column.accessor
                          ? column.accessor(row)
                          : null}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && (alwaysShowPagination || activeTotalPages > 1) && (
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          {showPageSize && (
            <Select
              value={activePageSize}
              onChange={(value) => handlePageSizeChange(Number(value))}
              options={pageSizeOptions.map((size) => ({
                value: size,
                label: `${size} per page`,
              }))}
              label="Show:"
            />
          )}
          {activeTotalPages > 1 && (
            <Pagination
              currentPage={activePage}
              totalPages={activeTotalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      )}
    </div>
  );
}
