"use client";

import { useRouter } from "next/navigation";

interface Props {
  totalPages: number;
  currentPage: number;
  route?: string;
}

const PaginationContainer = ({
  totalPages,
  currentPage,
  route = "/",
}: Props) => {
  const router = useRouter();

  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex justify-center gap-2 my-4">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => router.push(`${route}?pagenum=${page}`)}
          className={`px-3 py-1 rounded ${
            currentPage === page
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default PaginationContainer;
