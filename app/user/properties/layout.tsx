import PageTitle from "@/app/components/PageTitle";
import React from "react";

interface Props {
  children: React.ReactNode;
  modalDelete: React.ReactNode;
}

const PropertiesLayout = ({ children, modalDelete }: Props) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="shadow-sm overflow-hidden">
        <PageTitle
          title="User Properties"
          href="/user/properties/add"
          linkCaption="Add Property"
        />

        {/* Content Section */}
        <div className="bg-white p-4 sm:p-6">{children}</div>

        {/* Modal Section */}
        {modalDelete}
      </div>
    </div>
  );
};

export default PropertiesLayout;
