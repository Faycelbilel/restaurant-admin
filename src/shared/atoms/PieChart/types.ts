export interface PieChartSlice {
  label: string;
  value: number;
  color: string;
}

export interface PieChartProps {
  slices: PieChartSlice[];
  height?: number;
  centerLabel?: string;
  valueFormatter?: (value: number) => string;
}
