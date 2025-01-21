import React from "react";
import AddPropertyForm from "./_components/AddPropertyForm";
import prisma from "@/lib/prisma";

const AddPropertyPage = async () => {
  const [PropertyTypes, propertyStatuses] = await Promise.all([
    prisma.propertyType.findMany(),
    prisma.propertyStatus.findMany(),
  ]);

  return <AddPropertyForm types={PropertyTypes} statuses={propertyStatuses} />;
};

export default AddPropertyPage;
