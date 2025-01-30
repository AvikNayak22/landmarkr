import Link from "next/link";
import React from "react";

interface Props {
  children: React.ReactNode;
  modalDelete: React.ReactNode;
}

const PropertiesLayout = ({ children, modalDelete }: Props) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <h2 className="text-white text-2xl font-bold tracking-tight">
                User Properties
              </h2>
            </div>

            <button className="w-full sm:w-auto inline-flex items-center justify-center px-4 py-2.5 bg-white text-teal-600 rounded-lg font-medium shadow-sm hover:bg-teal-50 transition-colors duration-200 space-x-2">
              <Link href="/user/properties/add">Add Property</Link>
            </button>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white p-4 sm:p-6">{children}</div>

        {/* Modal Section */}
        {modalDelete}
      </div>
    </div>
  );
};

export default PropertiesLayout;
