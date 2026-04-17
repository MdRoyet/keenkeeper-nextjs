"use client"; // Required because we are pulling data from the Context

import React from "react";
import { Plus } from "lucide-react";
import { useFriends } from "@/context/FriendsContext"; // Import your Context

const Banner = () => {
  // 1. Get the friends data from our global state
  const { friends, isLoading } = useFriends();

  // 2. Calculate the stats dynamically
  // Total friends is simply the length of the array
  const totalFriends = friends.length;

  // On Track: filter friends who have the 'on-track' status
  const onTrackCount = friends.filter((f) => f.status === "on-track").length;

  // Need Attention: filter friends who are 'overdue' or 'almost due'
  const needAttentionCount = friends.filter(
    (f) => f.status === "overdue" || f.status === "almost due",
  ).length;

  // Interactions This Month: Anyone contacted in the last 30 days
  const recentInteractions = friends.filter(
    (f) => f.days_since_contact <= 30,
  ).length;

  // 3. Update our array to use the dynamic variables instead of hardcoded strings
  const stats = [
    { id: 1, value: isLoading ? "-" : totalFriends, label: "Total Friends" },
    { id: 2, value: isLoading ? "-" : onTrackCount, label: "On Track" },
    {
      id: 3,
      value: isLoading ? "-" : needAttentionCount,
      label: "Need Attention",
    },
    {
      id: 4,
      value: isLoading ? "-" : recentInteractions,
      label: "Interactions This Month",
    },
  ];

  return (
    <div className="flex flex-col items-center w-full px-4 pt-16 pb-8">
      {/* Header Section */}
      <h1 className="text-4xl md:text-5xl font-bold text-[#0f293e] text-center mb-4 tracking-tight">
        Friends to keep close in your life
      </h1>

      <p className="max-w-2xl mx-auto mb-8 text-center text-[#64748b] leading-relaxed">
        Your personal shelf of meaningful connections. Browse, tend, and nurture
        the relationships that matter most.
      </p>

      {/* Call to Action Button */}
      <button className="flex items-center gap-2 px-5 py-2.5 mb-16 text-sm font-semibold text-white transition-colors rounded-md bg-[#274c3b] hover:bg-[#1e3b2e] shadow-sm">
        <Plus size={18} strokeWidth={2.5} />
        Add a Friend
      </button>

      {/* Statistics Grid */}
      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex flex-col items-center justify-center p-8 bg-white border border-gray-100 shadow-sm rounded-xl"
          >
            {/* The stat number */}
            <span className="mb-2 text-3xl font-bold text-[#274c3b]">
              {stat.value}
            </span>
            {/* The stat label */}
            <span className="text-sm font-medium text-[#64748b]">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Subtle bottom divider */}
      <hr className="w-full max-w-5xl mt-12 border-gray-200" />
    </div>
  );
};

export default Banner;
