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
    <div className="w-80 flex flex-col rounded-2xl border border-gray-200 shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300">
      {/* Image Container */}
      <div className="relative w-full h-56">
        <Image
          fill
          src={property.images[0]?.url}
          alt={property.name}
          className="object-cover filter brightness-90"
        />
      </div>

      {/* Details Section */}
      <div className="flex flex-col flex-grow p-5 bg-gray-50">
        <p className="text-gray-800 text-xl font-bold mb-1">{property.name}</p>
        <p className="text-gray-600 text-sm">
          {property.location?.city}, {property.location?.state}
        </p>
      </div>

      {/* Footer Section */}
      <div className="bg-emerald-600 p-4 flex justify-between items-center">
        <p className="text-white font-bold text-lg">
          {formatPrice(property.price)}
        </p>
        <Link
          className="text-white text-sm font-semibold hover:bg-white hover:text-emerald-600 px-3 py-2 rounded-lg transition-colors "
          href={`/property/${property.id}`}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;
