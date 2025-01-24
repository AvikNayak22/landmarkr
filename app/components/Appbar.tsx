"use client";

import { ReactNode, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
} from "@heroui/react";
import Link from "next/link";
import { HomeModernIcon } from "@heroicons/react/16/solid";

interface Props {
  children: ReactNode;
}

const Appbar = ({ children }: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen} isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link
            href="/"
            className="flex items-center text-primary-400 hover:text-primary-600 transition-colors"
          >
            <HomeModernIcon className="w-16" />
            <p className="font-bold text-inherit">LandMarkr</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex gap-4"
        justify="center"
      ></NavbarContent>
      <NavbarContent justify="end">{children}</NavbarContent>
      <NavbarMenu></NavbarMenu>
    </Navbar>
  );
};

export default Appbar;
