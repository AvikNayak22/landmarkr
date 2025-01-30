"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { HomeModernIcon } from "@heroicons/react/16/solid";

interface Props {
  children: ReactNode;
}

const Appbar = ({ children }: Props) => {
  return (
    <nav className="w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center text-teal-500 hover:text-teal-600 transition-colors space-x-2"
          >
            <HomeModernIcon className="w-16 h-16" />
            <p className="text-lg font-semibold tracking-wide">LandMarkr</p>
          </Link>

          {/* Right Side Content */}
          <div className="flex items-center space-x-4">{children}</div>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;
