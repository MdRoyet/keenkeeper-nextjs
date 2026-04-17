"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Home, Clock, BarChart3 } from "lucide-react";

const NavBar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Helper to check if a link is active
  const isActive = (path) => pathname === path;

  const navLinks = [
    { name: "Home", path: "/", icon: <Home size={18} /> },
    { name: "Timeline", path: "/timeline", icon: <Clock size={18} /> },
    { name: "Stats", path: "/stats", icon: <BarChart3 size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* LOGO */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tight text-[#0f293e]">
              Keen<span className="text-[#0ca789]">Keeper</span>
            </span>
          </Link>

          {/* DESKTOP MENU (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(link.path)
                    ? "bg-[#274c3b] text-white shadow-md"
                    : "text-gray-500 hover:bg-slate-50 hover:text-[#0ca789]"
                }`}
              >
                {link.icon}
                {link.name}
              </Link>
            ))}
          </div>

          {/* MOBILE HAMBURGER BUTTON (Visible only on Mobile) */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-600 transition-colors rounded-md hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {/* This div only shows when isOpen is true and on small screens */}
      {isOpen && (
        <div className="absolute left-4 right-4 top-16 md:hidden">
          <div className="p-2 mt-2 bg-white border border-gray-100 shadow-xl rounded-2xl animate-in fade-in zoom-in duration-200">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                onClick={() => setIsOpen(false)} // Close menu when link is clicked
                className={`flex items-center gap-3 px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                  isActive(link.path)
                    ? "bg-[#f0fdf4] text-[#0ca789]"
                    : "text-gray-600 hover:bg-slate-50"
                }`}
              >
                <span
                  className={
                    isActive(link.path) ? "text-[#0ca789]" : "text-gray-400"
                  }
                >
                  {link.icon}
                </span>
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
