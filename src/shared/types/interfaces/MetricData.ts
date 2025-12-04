import { Trend } from "../enums/Trend";

export interface MetricData {
  label: string;
  value: string | number;
  delta?: string;
  trend?: Trend;
}
