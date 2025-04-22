"use client";

import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title,
  ChartOptions,
  TooltipItem,
} from "chart.js";

ChartJS.register(
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  Title
);

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor: string;
  hoverBackgroundColor: string;
  borderRadius: number;
}

interface ChartViewData {
  labels: string[];
  datasets: ChartDataset[];
}

interface ChartData {
  daily: ChartViewData;
  weekly: ChartViewData;
  monthly: ChartViewData;
}

export default function BarChart() {
  const [view, setView] = useState<"daily" | "weekly" | "monthly">("daily");

  // Chart data for different views
  const chartData: ChartData = {
    daily: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Visitors",
          data: [2000, 3500, 4500, 3000, 2500, 4000, 6000],
          backgroundColor: "#36B7FF",
          hoverBackgroundColor: "#2D3192",
          borderRadius: 50,
        },
      ],
    },
    weekly: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Visitors",
          data: [12000, 15000, 14000, 18000],
          backgroundColor: "#36B7FF",
          hoverBackgroundColor: "#2D3192",
          borderRadius: 50,
        },
      ],
    },
    monthly: {
      labels: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      datasets: [
        {
          label: "Visitors",
          data: [
            20000, 25000, 22000, 24000, 28000, 30000, 27000, 26000, 25000,
            29000, 31000, 32000,
          ],
          backgroundColor: "#36B7FF",
          hoverBackgroundColor: "#2D3192",
          borderRadius: 50,
        },
      ],
    },
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context: TooltipItem<"bar">) => {
            if (typeof context.raw === "number") {
              return `${context.raw.toLocaleString()} visitors`;
            }
            return "0 visitors";
          },
        },
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        titleFont: { size: 12 },
        bodyFont: { size: 14 },
        displayColors: false,
        padding: 10,
        cornerRadius: 8,
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawTicks: false,
        },
        ticks: {
          color: "#6B7280",
          font: {
            size: 12,
          },
        },
      },
      y: {
        ticks: {
          color: "#6B7280",
          callback: (value: string | number) => {
            const numValue =
              typeof value === "string" ? parseFloat(value) : value;
            return `${(numValue / 1000).toFixed(0)}k`;
          },
          font: {
            size: 12,
          },
          padding: 10,
        },
        grid: {
          display: true,

          color: "#E5E7EB",
        },
      },
    },
    layout: {
      padding: {
        top: 20,
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Total Visitors</h2>
        <div className="relative">
          <select
            className="bg-[#FFDFBB] text-gray-700 text-sm font-medium py-2 px-4 rounded-lg border-0 focus:ring-2 focus:ring-primary-500 focus:outline-none appearance-none"
            value={view}
            onChange={(e) =>
              setView(e.target.value as "daily" | "weekly" | "monthly")
            }
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="w-full h-[300px]">
        <Bar data={chartData[view]} options={options} />
      </div>
    </div>
  );
}
