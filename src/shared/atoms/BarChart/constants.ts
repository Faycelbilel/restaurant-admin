import type { ApexOptions } from "apexcharts";

export const DEFAULT_HEIGHT = 280;
export const DEFAULT_COLOR = "#2563EB";
export const DEFAULT_VALUE_FORMATTER = (value: number) => `${Math.round(value)}`;

export const STROKE_CURVE = "smooth";
export const STROKE_WIDTH = 3;
export const MARKER_SIZE = 4;
export const MARKER_STROKE_WIDTH = 2;
export const MARKER_BACKGROUND_COLOR = "#ffffff";

export const GRID_STROKE_DASH_ARRAY = 4;
export const GRID_BORDER_COLOR = "#e5e7eb";

export const BASE_CHART_OPTIONS: Partial<ApexOptions> = {
  chart: {
    type: "line",
    toolbar: { show: false },
    fontFamily: "inherit",
  },
  stroke: {
    curve: STROKE_CURVE,
    width: STROKE_WIDTH,
  },
  dataLabels: { enabled: false },
  grid: {
    strokeDashArray: GRID_STROKE_DASH_ARRAY,
    borderColor: GRID_BORDER_COLOR,
  },
  tooltip: {
    theme: "light",
  },
};

export const XAXIS_CONFIG = {
  axisBorder: { show: false },
  axisTicks: { show: false },
  labels: {
    style: { colors: "#6b7280", fontWeight: 600 },
  },
};

export const YAXIS_LABEL_STYLE = {
  colors: "#6b7280",
  fontWeight: 600,
};
