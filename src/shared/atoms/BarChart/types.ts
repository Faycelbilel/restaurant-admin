export interface BarChartDataPoint {
  label: string;
  value: number;
}

export interface BarChartProps {
  data: BarChartDataPoint[];
  height?: number;
  color?: string;
  title?: string;
  valueFormatter?: (value: number) => string;
}
