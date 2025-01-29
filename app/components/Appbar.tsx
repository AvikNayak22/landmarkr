"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { HomeModernIcon } from "@heroicons/react/16/solid";

interface Props {
  children: ReactNode;
}

const Appbar = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="sm:hidden p-2"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
            <Link
              href="/"
              className="flex items-center text-primary-400 hover:text-primary-600 transition-colors"
            >
              <HomeModernIcon className="w-16" />
              <p className="font-bold">LandMarkr</p>
            </Link>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            {/* Center content goes here */}
          </div>

          <div className="flex items-center">{children}</div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile menu content goes here */}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Appbar;
