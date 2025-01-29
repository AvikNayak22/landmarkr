"use client";

import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import { User as PrismaUser } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

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
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Image
          src={user.avatarUrl ?? "/profile.png"}
          alt="Profile"
          width={40}
          height={40}
          className="rounded-full border-2 border-gray-200"
        />
        <span>{`${user.firstName} ${user.lastName}`}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white border-1 rounded-md shadow-lg py-1">
          <Link
            href="/user/profile"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Profile
          </Link>
          <Link
            href="/user/properties"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            Properties
          </Link>
          <LogoutLink className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
            Log Out
          </LogoutLink>
        </div>
      )}
    </div>
  );
};

export default UserProfilePanel;
