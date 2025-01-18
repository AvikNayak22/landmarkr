"use client"

import { Button } from "@heroui/react";
import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const PropertiesLayout = ({ children }: Props) => {
  return (
    <div>
      <div className="bg-primary-400 flex justify-between items-center p-2 ">
        <h2 className="text-white text-xl font-semibold px-2 ">
          User Properties
        </h2>
        <Button color="secondary">
          <Link href="/user/properties/add">Add Property</Link>
        </Button>
      </div>
      {children}
    </div>
  );
};

export default PropertiesLayout;
