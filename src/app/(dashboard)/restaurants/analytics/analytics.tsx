"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  AnalyticsOverviewResponse,
  AnalyticsPeriod,
  AnalyticsSalesTrendResponse,
  AnalyticsTopDish,
  AnalyticsTopDishesResponse,
} from "./types/api";
import { restaurantApi } from "@/features/restaurants/services/restaurantApi";

// --- Types ---
export type TimeframeKey = "today" | "week" | "month";

export const timeframePeriodMap: Record<TimeframeKey, AnalyticsPeriod> = {
  today: "today",
  week: "week",
  month: "month",
};

export type AnalyticsMetric = {
  id: string;
  label: string;
  value: string;
  unit?: string;
  detail?: string;
  change: number;
};

export type TopDish = {
  id: number;
  name: string;
  percentage: number;
};

// --- Hook ---
export function useAnalytics(initialTimeframe: TimeframeKey = "today") {
  const [timeframe, setTimeframe] = useState(initialTimeframe);
  const [overview, setOverview] = useState<AnalyticsOverviewResponse | null>(
    null
  );
  const [salesTrend, setSalesTrend] =
    useState<AnalyticsSalesTrendResponse | null>(null);
  const [topDishesResponse, setTopDishesResponse] =
    useState<AnalyticsTopDishesResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestIdRef = useRef(0);
  const selectedPeriod = timeframePeriodMap[timeframe];

  const fetchAnalytics = useCallback(async (period: AnalyticsPeriod) => {
    const requestId = ++requestIdRef.current;
    setIsLoading(true);
    setError(null);

    try {
      const [overviewRes, salesTrendRes, topDishesRes] = await Promise.all([
        restaurantApi.getAnalyticsOverview(period),
        restaurantApi.getAnalyticsSalesTrend(period),
        restaurantApi.getAnalyticsTopDishes(period),
      ]);

      if (requestId !== requestIdRef.current) return;

      setOverview(overviewRes);
      setSalesTrend(salesTrendRes);
      setTopDishesResponse(topDishesRes);
    } catch {
      if (requestId === requestIdRef.current) {
        setError("Unable to load analytics data right now.");
      }
    } finally {
      if (requestId === requestIdRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchAnalytics(selectedPeriod);
  }, [fetchAnalytics, selectedPeriod]);

  const metrics = useMemo(() => buildMetrics(overview), [overview]);
  const salesValues = useMemo(
    () => salesTrend?.data.map((p) => p.revenue ?? 0) ?? [],
    [salesTrend]
  );
  const topDishes = useMemo(
    () => buildTopDishes(topDishesResponse?.topDishes ?? []),
    [topDishesResponse]
  );

  return {
    timeframe,
    setTimeframe,
    metrics,
    salesValues,
    topDishes,
    isLoading,
    error,
  };
}

// --- Helpers ---
function formatNumber(value: number, fractionDigits = 0): string {
  if (!Number.isFinite(value)) return "0";
  const fixedValue =
    fractionDigits > 0
      ? value.toFixed(fractionDigits)
      : String(Math.round(value));
  const [whole, decimal] = fixedValue.split(".");
  const withSeparators = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return decimal && fractionDigits > 0
    ? `${withSeparators}.${decimal}`
    : withSeparators;
}

function buildMetrics(
  overview: AnalyticsOverviewResponse | null
): AnalyticsMetric[] {
  if (!overview) return [];

  const prepMinutes = overview.preparationTime.currentMinutes;
  const prepDigits = Number.isInteger(prepMinutes) ? 0 : 1;
  const previousRating = overview.rating.previousStars;
  const hasPreviousRating = Number.isFinite(previousRating);

  return [
    {
      id: "revenue",
      label: "Total Revenue",
      value: formatNumber(overview.revenue.current, 2),
      unit: "DT",
      change: overview.revenue.percentageChange ?? 0,
    },
    {
      id: "completed",
      label: "Orders Completed",
      value: formatNumber(overview.orders.current),
      change: overview.orders.percentageChange ?? 0,
    },
    {
      id: "prep",
      label: "Avg. Prep Time",
      value: formatNumber(prepMinutes, prepDigits),
      unit: "min",
      change: overview.preparationTime.percentageChange ?? 0,
    },
    {
      id: "rating",
      label: "Customer Rating",
      value: formatNumber(overview.rating.currentStars, 1),
      detail: hasPreviousRating
        ? `(Prev ${previousRating.toFixed(1)})`
        : undefined,
      change: overview.rating.percentageChange ?? 0,
    },
  ];
}

function clampPercentage(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

function buildTopDishes(entries: AnalyticsTopDish[]): TopDish[] {
  if (!entries.length) return [];

  const highestQuantity = Math.max(...entries.map((e) => e.quantitySold));
  return entries.map((entry) => ({
    id: entry.menuItemId,
    name: entry.menuItemName,
    percentage: clampPercentage(
      highestQuantity > 0 ? (entry.quantitySold / highestQuantity) * 100 : 0
    ),
  }));
}
