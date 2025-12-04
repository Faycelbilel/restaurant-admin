"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import type { ApexOptions } from "apexcharts";
import type { PieChartProps } from "./types";
import {
  DEFAULT_HEIGHT,
  DEFAULT_CENTER_LABEL,
  DEFAULT_VALUE_FORMATTER,
  BASE_CHART_OPTIONS,
} from "./constants";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export function PieChart({
  slices,
  height = DEFAULT_HEIGHT,
  centerLabel = DEFAULT_CENTER_LABEL,
  valueFormatter = DEFAULT_VALUE_FORMATTER,
}: PieChartProps) {
  const colors = slices.map((slice) => slice.color);

  const options = useMemo<ApexOptions>(() => {
    return {
      ...BASE_CHART_OPTIONS,
      labels: slices.map((slice) => slice.label),
      colors,
      plotOptions: {
        pie: {
          donut: {
            ...BASE_CHART_OPTIONS.plotOptions?.pie?.donut,
            labels: {
              show: true,
              total: {
                show: true,
                label: centerLabel,
                formatter: () => {
                  const total = slices.reduce((sum, slice) => sum + slice.value, 0);
                  return `${total}`;
                },
              },
            },
          },
        },
      },
      tooltip: {
        y: {
          formatter: (value?: number) =>
            value !== undefined ? valueFormatter(value) : "",
        },
      },
    };
  }, [colors, slices, centerLabel, valueFormatter]);

  const series = useMemo(
    () => slices.map((slice) => slice.value),
    [slices]
  );

  return (
    <div className="w-full" style={{ height }}>
      <Chart options={options} series={series} type="donut" height={height} />
    </div>
  );
}
