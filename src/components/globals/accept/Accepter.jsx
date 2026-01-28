"use client";
import { useState } from "react";
import Authentication from "./Authentication";
import AcceptPopUp from "./AcceptPopUp";
import AfvisPopUp from "./AfvisPopUp";
import useVersionStore from "../../../../useVersionStore";
import { useRouter } from "next/navigation";

const Accepter = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [authOpenSome, setAuthOpenSome] = useState(false);
  const [acceptPopOpen, setAcceptPopOpen] = useState(false);
  const [declined, setDeclined] = useState(false);

  // læs user, alle versioner og persisted setter for valgte ids
  const user = useVersionStore((s) => s.user);
  const versioner = useVersionStore((s) => s.versioner);
  const setPersistedSelectedIds = useVersionStore((s) => s.setSelectedIds);
  const router = useRouter();

  const handleAcceptClick = () => {
    // hvis allerede logget ind: vælg alle ids og åbn AcceptPopUp direkte
    const allIds = (versioner || []).map((v) => v.id);
    if (user?.email || user?.navn) {
      setPersistedSelectedIds(allIds);
      setAcceptPopOpen(true);
      return;
    }
    // ellers åbn Authentication — onSuccess vil vælge alle og åbne popup
    setAuthOpen(true);
  };

  const handleAcceptSomeClick = async () => {
    const target = "/tidligere-versioner?accept=1";
    // hvis allerede logget ind, naviger direkte
    if (user?.email || user?.navn) {
      await router.push(target);
      return;
    }
    // ellers åbn authentication; onSuccess vil navigere
    setAuthOpenSome(true);
  };

  return (
    <>
      <div className="fixed inset-x-0 bottom-4 z-50 flex justify-center">
        <div className="w-full max-w-3xl h-16 shadow-xs backdrop-blur-sm inset-shadow-sm inset-shadow-amber-50 rounded-full mx-4 pb-[env(safe-area-inset-bottom)]">
          <div className="flex items-center justify-center gap-8 p-2">
            <button
              onClick={handleAcceptClick}
              className="cursor-pointer px-5 py-2 bg-blue-400 hover:bg-blue-600 transition-all duration-300 text-(--background) backdrop-blur-3xl inset-shadow-sm inset-shadow-amber-50 rounded-full"
            >
              Accepter alle
            </button>
            <button
              onClick={handleAcceptSomeClick}
              className="cursor-pointer border-2 border-(--foreground) px-5 py-2 hover:bg-(--foreground) hover:text-(--background) transition-all duration-300 text(--background) rounded-full"
            >
              Accepter valgte
            </button>
            <button onClick={() => setDeclined(true)} className="text-xs underline cursor-pointer">
              Afvis
            </button>
          </div>
        </div>
      </div>

      {/* Authentication for "accept all" */}
      {authOpen && (
        <Authentication
          intent="accept"
          fields={[
            { name: "navn", type: "text", required: true, placeholder: "Dit fulde navn" },
            { name: "email", type: "email", required: true, placeholder: "Din e-mail" },
          ]}
          buttonText="Log ind og bekræft"
          onClose={() => setAuthOpen(false)}
          onSuccess={(values, intent) => {
            setAuthOpen(false);
            if (intent === "accept") {
              // vælg alle version-ids ved succesfuld auth og åbn accept-popup
              const allIds = (versioner || []).map((v) => v.id);
              setPersistedSelectedIds(allIds);
              setAcceptPopOpen(true);
            }
          }}
        />
      )}

      {/* Authentication for "accept selected" (navigerer videre når succes) */}
      {authOpenSome && (
        <Authentication
          intent="accept"
          fields={[
            { name: "navn", type: "text", required: true, placeholder: "Dit fulde navn" },
            { name: "email", type: "email", required: true, placeholder: "Din e-mail" },
          ]}
          buttonText="Log ind og fortsæt"
          onClose={() => setAuthOpenSome(false)}
          onSuccess={async (values, intent) => {
            // gemmer user i Authentication -> vælg alle ids og naviger
            setAuthOpenSome(false);
            const allIds = (versioner || []).map((v) => v.id);
            setPersistedSelectedIds(allIds);
            // lille delay så exit-animation kan køre (valgfrit)
            await new Promise((res) => setTimeout(res, 200));
            await router.push("/tidligere-versioner?accept=1");
          }}
        />
      )}

      {/* Afvis popup */}
      {declined && <AfvisPopUp onClose={() => setDeclined(false)} />}

      {/* accepter popup (lokal) */}
      {acceptPopOpen && <AcceptPopUp onClose={() => setAcceptPopOpen(false)} />}
    </>
  );
};

export default Accepter;