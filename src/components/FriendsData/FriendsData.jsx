"use client"; // Required because we are using the Context hook

import React from "react";
import { useFriends } from "@/context/FriendsContext"; // Import our custom hook

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

  // Show a loading state while fetching from the public folder
  if (isLoading) {
    return (
      <div className="w-full max-w-5xl px-4 py-8 mx-auto text-center">
        <p className="text-gray-500">Loading your friends...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl px-4 py-8 mx-auto">
      <h2 className="mb-6 text-2xl font-bold text-[#0f293e]">Your Friends</h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {friends.map((friend) => (
          <div
            key={friend.id}
            className="flex flex-col items-center p-6 bg-white border border-gray-100 shadow-sm rounded-xl"
          >
            <img
              src={friend.picture}
              alt={friend.name}
              className="object-cover w-20 h-20 mb-4 rounded-full"
            />
            <h3 className="text-lg font-bold text-[#0f293e]">{friend.name}</h3>
            <p className="mb-3 text-sm text-gray-400">
              {friend.days_since_contact}d ago
            </p>
            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {friend.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-[10px] font-bold text-green-800 uppercase bg-[#d1fae5] rounded-full tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span
              className={`px-4 py-1 text-xs font-semibold rounded-full ${getStatusStyle(friend.status)}`}
            >
              {formatStatusText(friend.status)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsData;
