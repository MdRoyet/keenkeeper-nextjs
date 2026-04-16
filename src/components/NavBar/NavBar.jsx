"use client"; // This is required when using usePathname!

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation"; // Import the hook
import { Home, Clock, LineChart } from "lucide-react";

const NavBar = () => {
  // Get the current URL path (e.g., "/", "/timeline", "/stats")
  const pathname = usePathname();

  // Store our navigation links in an array to keep the code clean
  const navLinks = [
    { name: "Home", href: "/", icon: Home },
    { name: "Timeline", href: "/timeline", icon: Clock },
    { name: "Stats", href: "/stats", icon: LineChart },
  ];

  return (
    <nav className="flex items-center justify-between w-full px-8 py-4 bg-white border-b border-gray-100 border-t-2 border-t-[#0ca789]">
      {/* Left Side: Logo */}
      <Link href="/" className="flex items-center block">
        <Image
          src="/assets/logo.png"
          alt="KeenKeeper Logo"
          width={160}
          height={40}
          className="object-contain"
          priority
        />
      </Link>

      {/* Right Side: Dynamic Navigation Links */}
      <div className="flex items-center gap-2">
        {navLinks.map((link) => {
          // Check if the current URL matches the link's destination
          const isActive = pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors rounded ${
                isActive
                  ? "font-semibold text-white bg-[#274c3b]" // Active styling (Dark Green)
                  : "font-medium text-[#64748b] hover:text-[#0f293e] hover:bg-slate-50" // Inactive styling
              }`}
            >
              <Icon
                size={18}
                // Make the icon slightly thicker if it's active
                strokeWidth={isActive ? 2.5 : 2}
              />
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default NavBar;
