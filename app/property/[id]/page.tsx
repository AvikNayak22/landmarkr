import { ImagesSlider } from "@/app/components/imageSlider";
import PageTitle from "@/app/components/PageTitle";
import { formatPrice } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const PropertyPage = async ({ params }: Props) => {
  const property = await prisma.property.findUnique({
    where: {
      id: +params.id,
    },
    include: {
      status: true,
      feature: true,
      location: true,
      contact: true,
      images: true,
    },
  });

  if (!property) return notFound();

  return (
    <div>
      <PageTitle
        title="Property Details"
        href="/"
        linkCaption="Back to Properties"
      />

      <div className="mx-4">
        <h2 className="text-3xl font-bold text-primary my-5">
          {property.name}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2">
            <ImagesSlider images={property.images.map((img) => img.url)} />
            <h2 className="text-2xl font-bold text-gray-700 mt-7">
              {formatPrice(property.price)} / {property.status.value}
            </h2>
            <p className="text-base text-gray-600 mt-4 leading-relaxed">
              {property.description}
            </p>
          </div>
          <div className="p-6 flex flex-col gap-4 border rounded-lg shadow-md bg-white">
            <Title title="Features" />
            <Attribute label="Bedrooms" value={property.feature?.bedrooms} />
            <Attribute label="Bathrooms" value={property.feature?.bathrooms} />
            <Attribute
              label="Parking Spots"
              value={property.feature?.parkingSpots}
            />
            <Attribute label="Area" value={property.feature?.area} />

            <Title title="Address" className="mt-6" />
            <Attribute label="City" value={property.location?.city} />
            <Attribute label="Landmarks" value={property.location?.landmark} />
            <Attribute label="Zip Code" value={property.location?.zip} />
            <Attribute
              label="Address"
              value={property.location?.streetAddress}
            />

            <Title title="Owner Details" className="mt-6" />
            <Attribute label="Owner name" value={property.contact?.name} />
            <Attribute label="Email" value={property.contact?.email} />
            <Attribute label="Phone" value={property.contact?.phone} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPage;

const Title = ({ title, className }: { title: string; className?: string }) => {
  return (
    <div className={className}>
      <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
      <hr className="border-t border-gray-300 mt-1" />
    </div>
  );
};

const Attribute = ({
  label,
  value,
}: {
  label: string;
  value?: string | number;
}) => (
  <div className="flex justify-between text-sm text-gray-600">
    <span className="font-medium">{label}:</span>
    <span>{value}</span>
  </div>
);
