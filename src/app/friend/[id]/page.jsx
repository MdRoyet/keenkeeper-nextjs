"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { useFriends } from "@/context/FriendsContext";
import toast, { Toaster } from "react-hot-toast";
import {
  Phone,
  MessageSquare,
  Video,
  Bell,
  Archive,
  Trash2,
} from "lucide-react";

export default function FriendDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { friends, isLoading, addTimelineEntry } = useFriends();

  // Find the specific friend based on the URL ID
  // We convert params.id to a Number because JSON IDs are numbers
  const friend = friends.find((f) => f.id === Number(params.id));

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!friend) return <div className="p-8 text-center">Friend not found.</div>;

  // Helper functions for styling
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

  // ⚡ Check-In Function
  const handleCheckIn = (type) => {
    // 1. Add to our global timeline context
    addTimelineEntry(friend.name, type);

    // 2. Fire the toast notification!
    toast.success(`${type} entry added for ${friend.name}!`, {
      style: {
        border: "1px solid #0ca789",
        padding: "16px",
        color: "#0f293e",
      },
      iconTheme: {
        primary: "#0ca789",
        secondary: "#FFFAEE",
      },
    });
  };

  return (
    <div className="w-full max-w-5xl px-4 py-8 mx-auto">
      {/* The Toaster component renders our popup notifications */}
      <Toaster position="top-right" />

      {/* Back button (Optional but helpful) */}
      <button
        onClick={() => router.push("/")}
        className="mb-6 text-sm font-medium text-gray-500 hover:text-[#0ca789]"
      >
        ← Back to Dashboard
      </button>

      {/* Two Column Layout Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* ==================================================== */}
        {/* LEFT COLUMN (Takes up 1 fraction of space)           */}
        {/* ==================================================== */}
        <div className="flex flex-col gap-4 md:col-span-1">
          {/* Friend Info Card */}
          <div className="flex flex-col items-center p-8 bg-white border border-gray-100 shadow-sm rounded-xl">
            <img
              src={friend.picture}
              alt={friend.name}
              className="object-cover w-24 h-24 mb-4 rounded-full"
            />
            <h2 className="text-xl font-bold text-[#0f293e] mb-2">
              {friend.name}
            </h2>

            <span
              className={`px-4 py-1 text-xs font-semibold rounded-full mb-3 ${getStatusStyle(friend.status)}`}
            >
              {formatStatusText(friend.status)}
            </span>

            <div className="flex flex-wrap justify-center gap-2 mb-4">
              {friend.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-[10px] font-bold text-green-800 uppercase bg-[#d1fae5] rounded-full tracking-wide"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="mb-2 text-sm italic text-center text-gray-500">
              "{friend.bio}"
            </p>
            <p className="text-xs text-gray-400">
              Preferred:{" "}
              <a
                href={`mailto:${friend.email}`}
                className="text-[#0ca789] hover:underline"
              >
                {friend.email}
              </a>
            </p>
          </div>

          {/* Action Buttons */}
          <button className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-[#0f293e] transition-colors bg-white border border-gray-200 rounded-lg hover:bg-slate-50 shadow-sm">
            <Bell size={16} /> Snooze 2 Weeks
          </button>
          <button className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-[#0f293e] transition-colors bg-white border border-gray-200 rounded-lg hover:bg-slate-50 shadow-sm">
            <Archive size={16} /> Archive
          </button>
          <button className="flex items-center justify-center gap-2 py-3 text-sm font-medium text-red-500 transition-colors bg-white border border-red-200 rounded-lg hover:bg-red-50 shadow-sm">
            <Trash2 size={16} /> Delete
          </button>
        </div>

        {/* ==================================================== */}
        {/* RIGHT COLUMN (Takes up 2 fractions of space)         */}
        {/* ==================================================== */}
        <div className="flex flex-col gap-6 md:col-span-2">
          {/* ① Stats Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex flex-col items-center justify-center py-6 bg-white border border-gray-100 shadow-sm rounded-xl">
              <span className="text-3xl font-bold text-[#274c3b] mb-1">
                {friend.days_since_contact}
              </span>
              <span className="text-sm text-gray-500">Days Since Contact</span>
            </div>
            <div className="flex flex-col items-center justify-center py-6 bg-white border border-gray-100 shadow-sm rounded-xl">
              <span className="text-3xl font-bold text-[#274c3b] mb-1">
                {friend.goal}
              </span>
              <span className="text-sm text-gray-500">Goal (Days)</span>
            </div>
            <div className="flex flex-col items-center justify-center py-6 bg-white border border-gray-100 shadow-sm rounded-xl">
              {/* In a real app, you'd format this date properly */}
              <span className="text-2xl font-bold text-[#274c3b] mb-1">
                {friend.next_due_date}
              </span>
              <span className="text-sm text-gray-500">Next Due</span>
            </div>
          </div>

          {/* ② Relationship Goal Card */}
          <div className="flex items-center justify-between p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
            <div>
              <h3 className="text-lg font-semibold text-[#0f293e] mb-1">
                Relationship Goal
              </h3>
              <p className="text-sm text-gray-500">
                Connect every{" "}
                <span className="font-bold text-[#0f293e]">
                  {friend.goal} days
                </span>
              </p>
            </div>
            <button className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-md hover:bg-gray-50">
              Edit
            </button>
          </div>

          {/* ③ Quick Check-In Card */}
          <div className="p-6 bg-white border border-gray-100 shadow-sm rounded-xl">
            <h3 className="text-lg font-semibold text-[#0f293e] mb-4">
              Quick Check-In
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {/* Call Button */}
              <button
                onClick={() => handleCheckIn("Call")}
                className="flex flex-col items-center justify-center gap-2 py-6 text-gray-600 transition-colors border border-gray-200 rounded-lg hover:border-[#0ca789] hover:text-[#0ca789] hover:bg-teal-50"
              >
                <Phone size={24} />
                <span className="text-sm font-medium">Call</span>
              </button>

              {/* Text Button */}
              <button
                onClick={() => handleCheckIn("Text")}
                className="flex flex-col items-center justify-center gap-2 py-6 text-gray-600 transition-colors border border-gray-200 rounded-lg hover:border-[#0ca789] hover:text-[#0ca789] hover:bg-teal-50"
              >
                <MessageSquare size={24} />
                <span className="text-sm font-medium">Text</span>
              </button>

              {/* Video Button */}
              <button
                onClick={() => handleCheckIn("Video")}
                className="flex flex-col items-center justify-center gap-2 py-6 text-gray-600 transition-colors border border-gray-200 rounded-lg hover:border-[#0ca789] hover:text-[#0ca789] hover:bg-teal-50"
              >
                <Video size={24} />
                <span className="text-sm font-medium">Video</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
