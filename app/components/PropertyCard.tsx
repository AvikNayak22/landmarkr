import Image from "next/image";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import React from "react";

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
    <div className="w-72 flex flex-col hover:scale-105 shadow-md rounded-lg overflow-hidden">
      <div className="relative w-96 h-48">
        <Image
          fill
          src={property.images[0].url}
          alt={property.name}
          className="object-fill"
        />
      </div>

      <div className="flex flex-col mt-auto">
        <div className="p-4">
          <p className="text-primary-600 text-xl font-bold">{property.name}</p>
          <p className="text-slate-600 ">
            {property.location?.city}, {property.location?.state}{" "}
          </p>
        </div>
        <div className="bg-gradiant-to-br from-slate-500 to-slate-200 p-4 flex justify-between">
          <p>${property.price.toLocaleString()}</p>
          <Link
            className="hover:text-primary-500 transition-colors"
            href={`/property/${property.id}`}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
