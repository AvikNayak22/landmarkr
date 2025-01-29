import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  modalDelete: React.ReactNode;
}

const PropertiesLayout = ({ children, modalDelete }: Props) => {
  return (
    <div>
      <div className="bg-primary-400 flex justify-between items-center p-2 ">
        <h2 className="text-white text-xl font-semibold px-2 ">
          User Properties
        </h2>
        <button className="bg-secondary-500 text-white px-4 py-2 rounded hover:bg-secondary-600">
          <Link href="/user/properties/add">Add Property</Link>
        </button>
      </div>
      {children}
      {modalDelete}
    </div>
  );
};

export default PropertiesLayout;
