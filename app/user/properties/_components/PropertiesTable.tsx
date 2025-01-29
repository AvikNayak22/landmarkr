"use client";

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

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="w-full overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                NAME
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                PRICE
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                TYPE
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STATUS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACTIONS
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {properties.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{item.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.type.value}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {item.status.value}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <div className="group relative">
                      <Link href={`/property/${item.id}`}>
                        <EyeIcon className="w-5 text-slate-500 hover:text-slate-700" />
                      </Link>
                      <span className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                        Details
                      </span>
                    </div>
                    <div className="group relative">
                      <Link href={`/user/properties/${item.id}/edit`}>
                        <PencilIcon className="w-5 text-yellow-500 hover:text-yellow-700" />
                      </Link>
                      <span className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                        Edit Property
                      </span>
                    </div>
                    <div className="group relative">
                      <Link href={`/user/properties/${item.id}/delete`}>
                        <TrashIcon className="w-5 text-red-500 hover:text-red-700" />
                      </Link>
                      <span className="invisible group-hover:visible absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded">
                        Delete Property
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex gap-2 mt-4">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => router.push(`/user/properties?pagenum=${page}`)}
            className={`px-3 py-1 rounded ${
              currentPage === page
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
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
