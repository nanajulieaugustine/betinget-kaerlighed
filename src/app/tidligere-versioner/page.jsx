import React, { Suspense } from "react";
import SearchParams from "@/components/tidligere-versioner/SearchParams";

export default function TidligereVersioner() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Indlæser…</div>}>
      <SearchParams />
    </Suspense>
  );
}