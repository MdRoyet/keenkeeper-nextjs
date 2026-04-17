import React from "react";
import Link from "next/link";
import { Search, MapPinOff } from "lucide-react";

export default function NotFound() {
  return (
    // We remove some top padding to account for the navbar and use items-center to center content
    <div className="flex flex-col items-center justify-center w-full max-w-5xl min-h-[70vh] px-4 py-12 mx-auto text-center">
      {/* 1. The Visual Animated Element */}
      <div className="relative mb-8 text-slate-200">
        {/* The main background 404 text */}
        <h1 className="font-extrabold tracking-tighter text-[160px] md:text-[200px] leading-none select-none">
          404
        </h1>

        {/* The Animated "Lost Connection" Icon floating over the center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 p-5 bg-[#d1fae5] rounded-full text-[#0ca789] border-4 border-white shadow-xl animate-float">
          <MapPinOff size={50} strokeWidth={1.5} />
        </div>
      </div>

      {/* 2. Error Message Area */}
      <div className="flex items-center gap-3 px-4 py-2 mb-4 bg-white border border-gray-100 shadow-sm rounded-full text-[#274c3b]">
        <Search size={18} className="text-[#0ca789]" />
        <span className="font-medium">Connection Status: 404 Lost</span>
      </div>

      <h2 className="mb-3 text-4xl font-bold tracking-tight text-[#0f293e]">
        Looks like you're untracked.
      </h2>

      <p className="max-w-md mb-12 text-gray-500 leading-relaxed">
        Oops! The page you are looking for seems to have drifted away. Don't
        worry, your meaningful connections are safe back on the dashboard.
      </p>

      {/* 3. Call to Action Button - FIXED: Styles applied directly to the Link tag */}
      <Link
        href="/"
        className="flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold text-white transition-all rounded-lg bg-[#274c3b] hover:bg-[#1e3b2e] shadow hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
      >
        Return to Dashboard
      </Link>
    </div>
  );
}
