"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { User as PrismaUser } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

interface Props {
  user: PrismaUser;
}
const UserProfilePanel = ({ user }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition"
        aria-expanded={isOpen}
      >
        <div className="w-[50px] h-[50px] relative">
          <Image
            src={user.avatarUrl ?? "/profile.png"}
            alt="Profile"
            fill
            className="rounded-full border-2 border-gray-300 object-cover"
          />
        </div>
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50"
        >
          <Link
            href="/user/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-t-md"
          >
            Profile
          </Link>
          <Link
            href="/user/properties"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Properties
          </Link>
          <LogoutLink className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-md">
            Log Out
          </LogoutLink>
        </motion.div>
      )}
    </div>
  );
};

export default UserProfilePanel;
