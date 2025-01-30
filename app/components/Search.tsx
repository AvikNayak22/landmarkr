"use client";

import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChange = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 1000);

  return (
    <div className="p-6 flex items-center justify-center bg-gradient-to-br from-cyan-500 to-teal-600 min-h-[15vh]">
      <div className="relative w-full max-w-md">
        <input
          type="text"
          onChange={(e) => handleChange(e.target.value)}
          className="w-full px-5 py-3 rounded-xl shadow-md text-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-400 transition-all duration-200 ease-in-out"
          placeholder="Search..."
          defaultValue={searchParams.get("query") ?? ""}
        />
        <HiOutlineMagnifyingGlass className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
      </div>
    </div>
  );
};

export default Search;
