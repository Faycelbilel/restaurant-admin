export interface BillingsTableProps {
  startDate: string; // ISO date string YYYY-MM-DD
  endDate: string; // ISO date string YYYY-MM-DD
  initialPage?: number;
  pageSize?: number;
}
