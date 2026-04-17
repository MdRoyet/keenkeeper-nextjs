"use client";

import React from "react";
import Link from "next/link"; // Added Link for routing
import { useFriends } from "@/context/FriendsContext";

const FriendsData = () => {
  // Pull the friends data and loading state from Context
  const { friends, isLoading } = useFriends();

  const getStatusStyle = (status) => {
    switch (status) {
      case "overdue":
        return "bg-[#ef4444] text-white";
      case "almost due":
        return "bg-[#f59e0b] text-white";
      case "on-track":
        return "bg-[#274c3b] text-white";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  const formatStatusText = (status) => {
    switch (status) {
      case "overdue":
        return "Overdue";
      case "almost due":
        return "Almost Due";
      case "on-track":
        return "On-Track";
      default:
        return status;
    }
  };

  // DaisyUI Loading Spinner State
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-5xl py-24 mx-auto">
        {/* DaisyUI Spinner using your teal theme color */}
        <span className="loading loading-spinner loading-lg text-[#0ca789]"></span>
        <p className="mt-4 font-medium text-gray-500">
          Loading your friends...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl px-4 py-8 mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-center text-[#0f293e] sm:text-left">
        Your Friends
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {friends.map((friend) => (
          // ⚡ Wrapped the card in a Link to make it clickable
          <Link
            href={`/friend/${friend.id}`}
            key={friend.id}
            className="block transition-transform hover:-translate-y-1"
          >
            <div className="flex flex-col items-center h-full p-6 transition-shadow bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-md">
              <img
                src={friend.picture}
                alt={friend.name}
                className="object-cover w-20 h-20 mb-4 rounded-full"
              />
              <h3 className="text-lg font-bold text-[#0f293e] text-center">
                {friend.name}
              </h3>
              <p className="mb-3 text-sm text-gray-400">
                {friend.days_since_contact}d ago
              </p>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {friend.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-[10px] font-bold text-green-800 uppercase bg-[#d1fae5] rounded-full tracking-wide text-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Status Badge (Pushed to bottom using mt-auto if tags take multiple lines) */}
              <div className="mt-auto">
                <span
                  className={`inline-block px-4 py-1 text-xs font-semibold rounded-full ${getStatusStyle(friend.status)}`}
                >
                  {formatStatusText(friend.status)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FriendsData;
