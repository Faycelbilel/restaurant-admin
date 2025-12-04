"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import type { BarChartProps } from "./types";
import {
  DEFAULT_HEIGHT,
  DEFAULT_COLOR,
  DEFAULT_VALUE_FORMATTER,
  BASE_CHART_OPTIONS,
  MARKER_SIZE,
  MARKER_BACKGROUND_COLOR,
  MARKER_STROKE_WIDTH,
  XAXIS_CONFIG,
  YAXIS_LABEL_STYLE,
} from "./constants";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function BarChart({
  data,
  height = DEFAULT_HEIGHT,
  color = DEFAULT_COLOR,
  valueFormatter = DEFAULT_VALUE_FORMATTER,
}: BarChartProps) {
  const chartOptions = useMemo<ApexOptions>(() => {
    return {
      ...BASE_CHART_OPTIONS,
      chart: {
        ...BASE_CHART_OPTIONS.chart,
        height,
      },
      colors: [color],
      markers: {
        size: MARKER_SIZE,
        colors: [MARKER_BACKGROUND_COLOR],
        strokeColors: [color],
        strokeWidth: MARKER_STROKE_WIDTH,
      },
      xaxis: {
        ...XAXIS_CONFIG,
        categories: data.map((point) => point.label),
      },
      yaxis: {
        labels: {
          formatter: valueFormatter,
          style: YAXIS_LABEL_STYLE,
        },
      },
      tooltip: {
        ...BASE_CHART_OPTIONS.tooltip,
        y: {
          formatter: (value?: number) =>
            value !== undefined ? valueFormatter(value) : "",
        },
      },
    };
  }, [data, height, color, valueFormatter]);

  const chartSeries = useMemo(
    () => [
      {
        name: "Value",
        data: data.map((point) => point.value),
      },
    ],
    [data]
  );

  return (
    <div className="w-full" style={{ height }}>
      <Chart options={chartOptions} series={chartSeries} type="line" height={height} />
    </div>
  );
}
