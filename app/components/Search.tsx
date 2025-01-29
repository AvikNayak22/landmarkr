"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
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
    <div
      className="p-4 flex items-center justify-center 
    bg-gradient-to-br from-sky-400 to-indigo-500"
    >
      <div className="relative w-96">
        <input
          type="text"
          onChange={(e) => handleChange(e.target.value)}
          className="w-full px-4 py-2 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-indigo-500"
          defaultValue={searchParams.get("query") ?? ""}
        />
        <MagnifyingGlassIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 text-slate-500" />
      </div>
    </div>
  );
};

export default Search;
