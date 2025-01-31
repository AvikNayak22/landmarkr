"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { HiHomeModern } from "react-icons/hi2";

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
            className="flex items-center text-teal-600 hover:text-teal-700 transition-colors space-x-2"
          >
            <HiHomeModern className="w-14 h-14" />
            <h2 className="text-lg lg:text-xl font-semibold tracking-wide">
              LandMarkr
            </h2>
          </Link>

          {/* Right Side Content */}
          <div className="flex items-center space-x-4">{children}</div>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;
