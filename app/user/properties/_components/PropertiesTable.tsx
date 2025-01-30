"use client";

import { formatPrice } from "@/lib/constants";
import { EyeIcon, PencilIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Props = {
  properties: Prisma.PropertyGetPayload<{
    include: {
      type: true;
      status: true;
    };
  }>[];
  totalPages: number;
  currentPage: number;
};

const PropertiesTable = ({ properties, totalPages, currentPage }: Props) => {
  const router = useRouter();

  const getStatusColor = (status: string) => {
    const statusColors: { [key: string]: string } = {
      Available: "bg-green-100 text-green-800",
      Sold: "bg-red-100 text-red-800",
      Rented: "bg-yellow-100 text-yellow-800",
    };
    return statusColors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
        <table className="min-w-full table-auto divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              {["Name", "Price", "Type", "Status", "Actions"].map((header) => (
                <th
                  key={header}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((item) => (
              <tr key={item.id} className="bg-gray-50 hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-900">{item.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900 font-medium">
                    {formatPrice(item.price)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-gray-900">{item.type.value}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      item.status.value
                    )}`}
                  >
                    {item.status.value}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-6">
                    <Link
                      href={`/property/${item.id}`}
                      className="group relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors"
                    >
                      <EyeIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                      <span className="invisible group-hover:visible absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                        View Details
                      </span>
                    </Link>
                    <Link
                      href={`/user/properties/${item.id}/edit`}
                      className="group relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-yellow-50 transition-colors"
                    >
                      <PencilIcon className="w-5 h-5 text-yellow-600 group-hover:text-yellow-700" />
                      <span className="invisible group-hover:visible absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                        Edit Property
                      </span>
                    </Link>
                    <Link
                      href={`/user/properties/${item.id}/delete`}
                      className="group relative flex items-center justify-center w-8 h-8 rounded-full hover:bg-red-50 transition-colors"
                    >
                      <TrashIcon className="w-5 h-5 text-red-600 group-hover:text-red-700" />
                      <span className="invisible group-hover:visible absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap">
                        Delete Property
                      </span>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => router.push(`/user/properties?pagenum=${page}`)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${
                currentPage === page
                  ? "bg-teal-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
              }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PropertiesTable;
