import React, { useContext } from "react";
import { MagnifyingGlass } from '@phosphor-icons/react';
import { ActionContext } from "@/context/SearchContext";

const Search = () => {
  const context = useContext(ActionContext)
  if (!context) return null
  const { setIsSearchOpen } = context
  return (
    <div onClick={() => setIsSearchOpen(true)} className="flex items-center text-white dark:text-black bg-neutral-800 dark:bg-neutral-200 rounded-xl px-3 py-1 shadow-sm gap-2">
      <MagnifyingGlass className="text-lg" />
      <span className="bg-transparent outline-none text-base w-12 py-1">Search</span>
      <span className="bg-neutral-700 dark:bg-neutral-300 rounded-md px-2 py-0.5 text-xs ml-1 font-mono shadow-sm select-none">
        Ctrl K
      </span>
    </div>
  );
};

export default Search; 