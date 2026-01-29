"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import GikGaltPopUp from "@/components/globals/accept/GikGaltPopUp";
import Uploads from "@/components/tidligere-versioner/Uploads";
import AcceptSome from "@/components/globals/accept/AcceptSome";

const SearchParams = () => {
  const searchParams = useSearchParams();
  const [showGik, setShowGik] = useState(false);
  const [showAccept, setShowAccept] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // tryk kun på window i effect (kører kun i browser)
    const onResize = () => setWidth(window.innerWidth);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (searchParams.get("gik") === "1") {
      setShowGik(true);
      // fjern param fra URL så popup ikke dukker op ved reload / back
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.delete("gik");
        window.history.replaceState(null, "", url.toString());
      }
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchParams.get("accept") === "1") {
      setShowAccept(true);
      // fjern param fra URL så popup ikke dukker op ved reload / back
      if (typeof window !== "undefined") {
        const url = new URL(window.location.href);
        url.searchParams.delete("accept");
        window.history.replaceState(null, "", url.toString());
      }
    }
  }, [searchParams]);

  return (
    <>
      <div className="px-40">
        <Uploads />
      </div>
      {showGik && <GikGaltPopUp onClose={() => setShowGik(false)} />}
      {showAccept && <AcceptSome onClose={() => setShowAccept(false)} />}
      <div>Width: {width}</div>
    </>
  );
};

export default SearchParams;