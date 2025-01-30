import Image from "next/image";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import React from "react";
import { formatPrice } from "@/lib/constants";

interface Props {
  property: Prisma.PropertyGetPayload<{
    select: {
      id: true;
      name: true;
      price: true;
      images: {
        select: {
          url: true;
        };
      };
      location: {
        select: {
          city: true;
          state: true;
        };
      };
    };
  }>;
}

const PropertyCard = ({ property }: Props) => {
  return (
    <div className="w-80 flex flex-col rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative w-full h-52">
        <Image
          fill
          src={property.images[0]?.url}
          alt={property.name}
          className="object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-col flex-grow p-4 bg-white">
        <p className="text-primary-600 text-lg font-semibold">
          {property.name}
        </p>
        <p className="text-gray-500 text-sm">
          {property.location?.city}, {property.location?.state}
        </p>
      </div>

      {/* Footer Section */}
      <div className="bg-teal-600 p-4 flex justify-between items-center">
        <p className="text-white font-semibold">
          {formatPrice(property.price)}
        </p>
        <Link
          className="text-white text-sm font-medium hover:underline "
          href={`/property/${property.id}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
