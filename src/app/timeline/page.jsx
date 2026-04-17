"use client";

import React, { useState } from "react";
import { useFriends } from "@/context/FriendsContext";
import { Search, Phone, MessageSquare, Video, Users } from "lucide-react";

export default function TimelinePage() {
  const { timeline } = useFriends();

  // State for filtering, sorting, and searching
  const [filterType, setFilterType] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Helper function to pick the right icon based on the interaction type
  const getIcon = (type) => {
    switch (type) {
      case "Call":
        return <Phone className="text-red-500" size={24} />;
      case "Text":
        return <MessageSquare className="text-gray-700" size={24} />;
      case "Video":
        return <Video className="text-gray-700" size={24} />;
      case "Meetup":
        return <Users className="text-yellow-500" size={24} />;
      default:
        return <MessageSquare className="text-gray-400" size={24} />;
    }
  };

  // Process the timeline array based on user controls
  const processedTimeline = timeline
    // 1. Filter by Type
    .filter((entry) => filterType === "All" || entry.type === filterType)
    // 2. Search by Name or Type
    .filter((entry) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        entry.title.toLowerCase().includes(searchLower) ||
        entry.type.toLowerCase().includes(searchLower)
      );
    })
    // 3. Sort by Date
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

  // Helper function to format the date to look like "March 29, 2026"
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="w-full max-w-4xl px-4 py-10 mx-auto">
      <h1 className="mb-8 text-3xl font-bold text-[#0f293e]">Timeline</h1>

      {/* Controls: Filter, Sort, and Search */}
      <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
        {/* Left Side Controls (Filter & Sort) */}
        <div className="flex gap-4">
          <select
            className="w-full max-w-xs text-sm bg-white border-gray-200 select select-bordered focus:border-[#0ca789] focus:ring-[#0ca789]"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="All">Filter Timeline</option>
            <option value="Call">Call</option>
            <option value="Text">Text</option>
            <option value="Video">Video</option>
            <option value="Meetup">Meetup</option>
          </select>

          <select
            className="w-full max-w-xs text-sm bg-white border-gray-200 select select-bordered focus:border-[#0ca789] focus:ring-[#0ca789]"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>

        {/* Right Side Control (Search) */}
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search timeline..."
            className="w-full pl-10 pr-4 text-sm bg-white border-gray-200 input input-bordered focus:border-[#0ca789] focus:ring-[#0ca789]"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search
            className="absolute text-gray-400 transform -translate-y-1/2 left-3 top-1/2"
            size={16}
          />
        </div>
      </div>

      {/* Timeline List */}
      <div className="flex flex-col gap-4">
        {processedTimeline.length === 0 ? (
          <div className="py-12 text-center bg-white border border-gray-100 rounded-xl">
            <p className="text-gray-500">No interactions found.</p>
          </div>
        ) : (
          processedTimeline.map((entry) => {
            // Extract the friend's name from the title string (e.g., "Call with Sarah" -> "Sarah")
            const name = entry.title.replace(`${entry.type} with `, "");

            return (
              <div
                key={entry.id}
                className="flex items-center gap-6 p-4 transition-colors bg-white border border-gray-100 shadow-sm rounded-xl hover:border-gray-200"
              >
                {/* Icon Container */}
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-slate-50 shrink-0">
                  {getIcon(entry.type)}
                </div>

                {/* Entry Details */}
                <div className="flex flex-col">
                  <p className="text-[#0f293e] text-base">
                    <span className="font-bold">{entry.type}</span>{" "}
                    <span className="text-gray-500">with {name}</span>
                  </p>
                  <p className="text-sm text-gray-400">
                    {formatDate(entry.date)}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
