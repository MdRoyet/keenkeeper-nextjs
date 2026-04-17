"use client";

import React, { useMemo } from "react";
import { useFriends } from "@/context/FriendsContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function StatsPage() {
  const { timeline } = useFriends();

  // 1. Process the Timeline Data
  // We use useMemo so it only recalculates when the timeline actually changes
  const chartData = useMemo(() => {
    // If no interactions exist yet, show a dummy placeholder chart
    if (timeline.length === 0) {
      return [{ name: "No Data", value: 1, color: "#e2e8f0" }]; // Light gray
    }

    // Count how many times each interaction type happened
    const counts = timeline.reduce((acc, entry) => {
      acc[entry.type] = (acc[entry.type] || 0) + 1;
      return acc;
    }, {});

    // Format it specifically for Recharts
    return [
      { name: "Text", value: counts["Text"] || 0, color: "#8b5cf6" }, // Purple
      { name: "Call", value: counts["Call"] || 0, color: "#274c3b" }, // Dark Green
      { name: "Video", value: counts["Video"] || 0, color: "#22c55e" }, // Light Green
    ].filter((item) => item.value > 0); // Only show slices that have actual data
  }, [timeline]);

  // 2. Custom Tooltip for when you hover over the chart slices
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      if (data.name === "No Data") return null;

      return (
        <div className="px-4 py-3 bg-white border border-gray-100 shadow-lg rounded-xl">
          <p className="font-semibold text-[#0f293e]">{data.name}</p>
          <p className="text-sm text-gray-500">
            {data.value} {data.value === 1 ? "interaction" : "interactions"}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full max-w-5xl px-4 py-10 mx-auto">
      {/* Page Heading */}
      <h1 className="mb-8 text-4xl font-bold text-[#0f293e]">
        Friendship Analytics
      </h1>

      {/* Main Chart Card */}
      <div className="w-full p-8 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
        {/* Card Subheading */}
        <h2 className="mb-8 font-medium text-[#274c3b]">By Interaction Type</h2>

        {/* The Chart Container */}
        {/* We use ResponsiveContainer so it scales perfectly on mobile and desktop */}
        <div className="w-full h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%" // Center X
                cy="50%" // Center Y
                innerRadius={100} // Creates the donut hole
                outerRadius={140} // Thickness of the donut
                paddingAngle={5} // The gap between slices (matches your Figma)
                dataKey="value"
                animationBegin={0}
                animationDuration={1500} // Smooth 1.5s load animation
              >
                {/* Map our specific colors to each slice */}
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="transparent" // Removes default borders
                    className="transition-all duration-300 outline-none hover:opacity-80"
                  />
                ))}
              </Pie>

              <Tooltip content={<CustomTooltip />} />

              {/* Legend Configuration */}
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value, entry) => (
                  <span className="text-sm font-medium text-gray-500 ml-1">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Empty State Warning */}
        {timeline.length === 0 && (
          <p className="mt-4 text-sm text-center text-gray-400">
            Go to a friend's profile and log some check-ins to see your stats!
          </p>
        )}
      </div>
    </div>
  );
}
