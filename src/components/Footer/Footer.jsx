import React from "react";
import Link from "next/link";
// Importing the brand icons from react-icons (FontAwesome 6)
import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center w-full px-8 py-12 bg-[#274c3b] text-white">
      {/* Top Section: Logo & Subtitle */}
      <div className="flex flex-col items-center w-full max-w-5xl text-center">
        <h2 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          KeenKeeper
        </h2>
        <p className="max-w-2xl mb-10 text-sm text-gray-200 md:text-base">
          Your personal shelf of meaningful connections. Browse, tend, and
          nurture the relationships that matter most.
        </p>

        {/* Middle Section: Social Links */}
        <h3 className="mb-4 text-lg font-semibold">Social Links</h3>
        <div className="flex gap-4 mb-10">
          {/* Instagram */}
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-[#274c3b] hover:bg-gray-100 transition-colors"
          >
            <FaInstagram size={20} />
          </a>

          {/* Facebook */}
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-[#274c3b] hover:bg-gray-100 transition-colors"
          >
            <FaFacebookF size={18} />
          </a>

          {/* X (Twitter) - Now using the official react-icon! */}
          <a
            href="#"
            className="flex items-center justify-center w-10 h-10 bg-white rounded-full text-[#274c3b] hover:bg-gray-100 transition-colors"
          >
            <FaXTwitter size={18} />
          </a>
        </div>
      </div>

      {/* Divider Line */}
      <hr className="w-full max-w-6xl mb-6 border-[#38614c]" />

      {/* Bottom Bar: Copyright & Legal Links */}
      <div className="flex flex-col items-center w-full max-w-6xl text-sm md:flex-row justify-between text-[#a3b8ad]">
        <p>© 2026 KeenKeeper. All rights reserved.</p>

        <div className="flex gap-6 mt-4 md:mt-0">
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white">
            Terms of Service
          </Link>
          <Link href="/cookies" className="transition-colors hover:text-white">
            Cookies
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
