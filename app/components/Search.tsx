"use client";

import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { Input } from "@heroui/react";
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
      <Input
        onChange={(e) => handleChange(e.target.value)}
        className="w-96 shadow "
        endContent={<MagnifyingGlassIcon className="w-4 text-slate-500" />}
        defaultValue={searchParams.get("query") ?? ""}
      />
    </div>
  );
};

export default Search;
