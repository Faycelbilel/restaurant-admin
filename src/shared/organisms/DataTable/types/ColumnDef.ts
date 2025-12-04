import { ReactNode } from "react";

export interface ColumnDef<TData = unknown> {
  
  key: string;
  
  header: string;
  
  width?: string;
  
  render?: (row: TData) => ReactNode;
  
  accessor?: (row: TData) => ReactNode;
  
  cellClassName?: string;
  
  headerClassName?: string;
}
