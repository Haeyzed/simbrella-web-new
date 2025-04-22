"use client";

import { useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const [view, setView] = useState<"daily" | "weekly" | "monthly">("weekly");

  const chartData = {
    daily: [40, 30, 20, 10],
    weekly: [55, 20, 15, 10],
    monthly: [50, 25, 15, 10],
  };

  const data = {
    labels: ["Chrome", "Firefox", "Mobile Phone", "Safari"],
    datasets: [
      {
        data: chartData[view],
        backgroundColor: ["#FF931D", "#F6C744", "#A45C40", "#6FC7E8"],
        hoverOffset: -20,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (tooltipItem: any) {
            const { label, raw } = tooltipItem;
            return `${label} users, ${raw}%`;
          },
        },
        displayColors: false,
        backgroundColor: "#f3f4f6",
        titleColor: "#111827",
        titleFont: { size: 20 },
        bodyColor: "#111827",
        bodyFont: { size: 20 },
        borderColor: "#D1D5DB",
        borderWidth: 0,
      },
      legend: { display: false },
    },
    responsive: true,
    cutout: "70%",
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow w-full mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-sm font-semibold text-gray-800">
          Visitors Statistics
        </h2>

        <Select
          value={view}
          onValueChange={(val) => setView(val as typeof view)}
        >
          <SelectTrigger className="w-[130px] bg-[#FFDFBB] text-xs font-medium border-gray-300 text-gray-700">
            <SelectValue placeholder="Select view" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="daily">Daily</SelectItem>
            <SelectItem value="weekly">Weekly</SelectItem>
            <SelectItem value="monthly">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Separator */}
      <hr className="my-3 border-gray-200" />

      {/* Doughnut Chart */}
      <div className="relative w-full flex justify-center items-center">
        <Doughnut data={data} options={options} className="p-10" />
        <div className="absolute text-sm text-gray-700 font-medium">
          Total Visitors 6.4k
        </div>
      </div>

      <hr className="my-3 border-gray-200" />

      {/* Custom Legend */}
      <div className="flex justify-around mt-4 mb-2 flex-wrap gap-4">
        {[
          { label: "Chrome", color: "#FF931D" },
          { label: "Firefox", color: "#F6C744" },
          { label: "Mobile Phone", color: "#A45C40" },
          { label: "Safari", color: "#6FC7E8" },
        ].map((item) => (
          <div key={item.label} className="flex items-center space-x-2">
            <span
              className="w-4 h-4 block rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-xs font-medium text-gray-600">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
