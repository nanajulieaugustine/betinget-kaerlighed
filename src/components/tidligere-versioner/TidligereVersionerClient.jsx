"use client";
import React, { useEffect, useState, Suspense } from "react";
import useVersionStore from "../../../useVersionStore";
import LogInd from "./LogInd";
import SearchParams from "./SearchParams";

export default function TidligereVersionerClient() {
  const user = useVersionStore((s) => s.user);
  const [showLogInd, setShowLogInd] = useState(false);

  useEffect(() => {
    // vis LogInd hvis ingen bruger er logget ind
    const loggedIn = !!(user?.email || user?.navn);
    setShowLogInd(!loggedIn);
  }, [user]);

  return (
    <>
      {/* LogInd som modal/overlay hvis ikke logget ind */}
      {showLogInd && <LogInd onClose={() => setShowLogInd(false)} />}

      {/* resten af siden — SearchParams kan bruge Suspense hvis nødvendigt */}
      <Suspense fallback={<div className="p-8 text-center">Indlæser…</div>}>
        <SearchParams />
      </Suspense>

    </>
  );
}