"use client";
import { useState, useEffect } from "react";
import { useSearchParam } from "react-use";
import useVersionStore from "../../../useVersionStore";

const SearchUser = () => {
  const storeQuery = useVersionStore((s) => s.searchQuery);
  const setSearchQuery = useVersionStore((s) => s.setSearchQuery);
  const [q, setQ] = useState(storeQuery || "");

  useEffect(() => {
    setQ(storeQuery || "");
  }, [storeQuery]);

  // opdater store direkte ved ændring (kan debounces senere)
  const onChange = (e) => {
    const v = e.target.value;
    setQ(v);
    setSearchQuery(v);
  };

  return (
    <div>
      <input
        value={q}
        onChange={onChange}
        placeholder="Søg efter dine relationers betingelser (navn)"
        className="p-3 rounded-full w-full mb-10 backdrop-blur-sm inset-shadow-sm inset-shadow-amber-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300 shadow-md"
        aria-label="Søg efter bruger"
      />
    </div>
  );
};

export default SearchUser;