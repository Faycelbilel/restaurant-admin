import type { ApexOptions } from "apexcharts";

export const DEFAULT_HEIGHT = 260;
export const DEFAULT_CENTER_LABEL = "Total";
export const DEFAULT_VALUE_FORMATTER = (value: number) => `${value}`;

export const DONUT_SIZE = "64%";
export const STROKE_WIDTH = 2;
export const STROKE_COLOR = "#ffffff";

export const BASE_CHART_OPTIONS: Partial<ApexOptions> = {
  chart: {
    type: "donut",
    toolbar: { show: false },
    fontFamily: "inherit",
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  stroke: {
    colors: [STROKE_COLOR],
    width: STROKE_WIDTH,
  },
  plotOptions: {
    pie: {
      donut: {
        size: DONUT_SIZE,
        labels: {
          show: true,
          total: {
            show: true,
          },
        },
      },
    },
  },
};
