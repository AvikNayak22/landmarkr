"use client";

import { User as PrismaUser } from "@prisma/client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@heroui/react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs";
import Link from "next/link";

interface Props {
  user: PrismaUser;
}

const UserProfilePanel = ({ user }: Props) => {
  return (
    <Dropdown placement="bottom-start">
      <DropdownTrigger>
        <User
          as="button"
          avatarProps={{
            isBordered: true,
            src: user.avatarUrl ?? "",
          }}
          className="transition-transform"
          name={`${user.firstName} ${user.lastName}`}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile">
          <Link href="/user/profile">Profile</Link>
        </DropdownItem>

        <DropdownItem key="logout" color="danger">
          <LogoutLink>Log Out</LogoutLink>
        </DropdownItem>
      </DropdownMenu>{" "}
    </Dropdown>
  );
};

export default UserProfilePanel;
