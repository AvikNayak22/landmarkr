"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { FaRegBuilding } from "react-icons/fa";

interface Props {
  children: ReactNode;
}

const Appbar = ({ children }: Props) => {
  return (
    <nav className="w-full border-b bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors space-x-2"
            aria-label="LandMarkr Home"
          >
            <FaRegBuilding className="w-10 h-10 lg:w-12 lg:h-12" />
            <h2 className="text-lg lg:text-xl font-semibold tracking-wide">
              LandMarkr
            </h2>
          </Link>

          {/* Right Side Content */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {children}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Appbar;
