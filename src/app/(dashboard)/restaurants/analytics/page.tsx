"use client";
import React, { useMemo } from "react";
import { TimeframeKey, useAnalytics } from "./analytics";

const TIMEFRAMES = [
  { key: "today" as TimeframeKey, label: "Today" },
  { key: "week" as TimeframeKey, label: "Week" },
  { key: "month" as TimeframeKey, label: "Month" },
];

export default function AnalyticsPage() {
  const {
    timeframe,
    setTimeframe,
    metrics,
    salesValues,
    topDishes,
    isLoading,
    error,
  } = useAnalytics();

  const linePath = useMemo(() => {
    if (salesValues.length === 0) return "";
    const width = 1000; // Always full component width
    const height = 240;
    const max = Math.max(...salesValues);
    const min = Math.min(...salesValues);
    const range = max - min || 1;
    const step =
      salesValues.length > 1 ? width / (salesValues.length - 1) : width;
    return salesValues
      .map(
        (v, i) =>
          ` ${i === 0 ? "M" : "L"}${i * step} ${height - ((v - min) / range) * height}`
      )
      .join(" ");
  }, [salesValues]);

  const formatChangePercentage = (value: number) => {
    if (!Number.isFinite(value)) return "+0%";
    const isPositive = value >= 0;
    const absValue = Math.abs(value);
    const fractionDigits = absValue % 1 === 0 ? 0 : 2;
    return `${isPositive ? "+" : "-"}${absValue.toFixed(fractionDigits)}%`;
  };

  const xLabels = useMemo(() => {
    const today = new Date();
    if (timeframe === "today") {
      return salesValues.map((_, i) => `${i}:00`);
    }
    if (timeframe === "week") {
      const firstDay = new Date();
      firstDay.setDate(today.getDate() - 6);
      const lastDay = today;
      const options: Intl.DateTimeFormatOptions = {
        day: "2-digit",
        month: "short",
      };
      return [
        firstDay.toLocaleDateString("en-GB", options),
        lastDay.toLocaleDateString("en-GB", options),
      ];
    }
    if (timeframe === "month") {
      const year = today.getFullYear();
      const month = today.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const labels: string[] = [];
      for (let day = 1; day <= daysInMonth; day += 6) {
        const date = new Date(year, month, day);
        labels.push(
          date.toLocaleDateString("en-GB", { day: "2-digit", month: "short" })
        );
      }
      return labels;
    }
    return salesValues.map((_, i) => `${i + 1}`);
  }, [salesValues, timeframe]);

  return (
    <div className="min-h-screen font-sans ">
      <div className="max-w-7xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Understand what’s working, spot opportunities, and make smarter
            decisions.
          </p>
        </header>

        <div className="flex gap-4 mb-10">
          {TIMEFRAMES.map((f) => (
            <button
              key={f.key}
              onClick={() => setTimeframe(f.key)}
              className={`px-5 py-3 rounded-full font-medium transition ${
                f.key === timeframe
                  ? "bg-red-600 text-white shadow-lg hover:bg-red-700"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {isLoading && (
          <p className="text-gray-500 mb-6">Loading analytics...</p>
        )}
        {error && <p className="text-red-600 mb-6">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {metrics.map((m) => (
            <div
              key={m.id}
              className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white rounded-2xl p-8 shadow-xl hover:scale-105 transition-transform"
            >
              <p className="text-gray-300 text-sm">{m.label}</p>
              <div className="flex items-center gap-3 mt-2">
                <p className="text-3xl font-bold">{m.value}</p>
                {m.unit && <span className="text-gray-300">{m.unit}</span>}
                {m.detail && <span className="text-gray-400">{m.detail}</span>}
              </div>
              <p
                className={`mt-3 font-medium ${
                  m.change >= 0 ? "text-green-400" : "text-red-400"
                }`}
              >
                {formatChangePercentage(m.change)}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-16 bg-white p-8 rounded-2xl shadow-xl overflow-x-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Sales Trends
          </h2>
          <svg width="100%" height={240} className="w-full">
            <path d={linePath} fill="none" stroke="#F54E4E" strokeWidth={3} />
          </svg>
          <div className="flex justify-between text-gray-500 text-sm mt-3 w-full">
            {xLabels.map((label, idx) => (
              <span key={idx}>{label}</span>
            ))}
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Top Dishes
          </h2>
          <div className="space-y-6">
            {topDishes.map((d) => (
              <div key={d.id}>
                <div className="flex justify-between mb-2 text-gray-700 font-medium">
                  <span>{d.name}</span>
                  <span>{d.percentage}%</span>
                </div>
                <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    style={{ width: `${d.percentage}%` }}
                    className="h-full bg-red-500 rounded-full transition-all"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
