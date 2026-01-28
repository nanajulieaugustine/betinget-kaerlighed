"use client";
import { useState, useRef, useEffect, useMemo } from "react";
import useVersionStore from "../../../useVersionStore";
import SearchUser from "./SearchUser";
import { GoPlus } from "react-icons/go";
import ErrorVaelgEn from "../globals/accept/ErrorVaelgEn";
import EndeligBekraeft from "../globals/accept/EndeligBekraeft";
import ErDuSikker from "../globals/accept/ErDuSikker";
import ValgteRelationer from "./ValgteRelationer";

const Uploads = () => {
  const [beskrivelse, setBeskrivelse] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [addedId, setAddedId] = useState(null);
  const [selectError, setSelectError] = useState(false);
  const [selectConfirmed, setSelectConfirmed] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [deleteCandidateId, setDeleteCandidateId] = useState(null);
  const [openValgteRelationer, closeValgteRelationer] = useState(false);
  const [showMineOnly, setShowMineOnly] = useState(false);
  
  const timeoutRef = useRef(null);
  const addedTimeout = useRef(null);

  const addVersion = useVersionStore((s) => s.addVersion);
  const clearUser = useVersionStore((s) => s.clearUser);
  const user = useVersionStore((s) => s.user);
  const versioner = useVersionStore((s) => s.versioner);
  const searchQuery = useVersionStore((s) => s.searchQuery);
  const normalizedQuery = (searchQuery || "").trim().toLowerCase();
  const count = useVersionStore((s) => s.versioner.length);

  // Persisted selected ids fra zustand (array) + setter
  const persistedSelectedIds = useVersionStore((s) => s.selectedIds);
  const setPersistedSelectedIds = useVersionStore((s) => s.setSelectedIds);

  // sorter kopien af versioner så de nyeste kommer først
  const visibleVersions = (versioner || [])
    .slice()
    .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
    .filter((v) => {
      // hvis "Vis mine betingelser" er aktiv -> kun versions oprettet af current user
      if (showMineOnly) {
        if (user?.email) return v.email === user.email;
        // fallback: match på navn hvis email ikke er tilgængelig
        if (user?.navn) return (v.navn || "").trim() === (user.navn || "").trim();
        return false;
      }
      if (!normalizedQuery) return true;
      const navn = (v.navn || "").toString().toLowerCase();
      return navn.includes(normalizedQuery);
    });

  // Deriver et Set fra persisted array (ingen lokal state -> ingen sync loop)
  const selectedIdsSet = useMemo(() => new Set(Array.isArray(persistedSelectedIds) ? persistedSelectedIds : []), [persistedSelectedIds]);

  // toggle valg for én version — vælg/framvælg alle versioner med samme bruger (navn)
  const toggleSelected = (id) => {
    const v = versioner.find((x) => x.id === id);
    if (!v) return;
    const navnKey = (v.navn || "").trim().toLowerCase();

    // group: alle ids med samme normalized navn
    const groupIds = versioner
      .filter((x) => (x.navn || "").trim().toLowerCase() === navnKey)
      .map((x) => x.id);

    // beregn næste sæt
    const next = new Set(selectedIdsSet);
    const anySelected = groupIds.some((gid) => next.has(gid));
    if (anySelected) groupIds.forEach((gid) => next.delete(gid));
    else groupIds.forEach((gid) => next.add(gid));

    // sync persisted store direkte (køres i event handler -> OK)
    setPersistedSelectedIds(Array.from(next));
  };

  // vælg alle synlige versioner (filtreret view)
  const selectAllVisible = () => {
    const ids = visibleVersions.map((v) => v.id);
    setPersistedSelectedIds(ids);
  };

  // ryd alle valg
  const clearSelection = () => {
    setPersistedSelectedIds([]);
  };
  
  // hent valgte version-objekter (brug persisted set)
  const selectedVersions = versioner.filter((v) => selectedIdsSet.has(v.id));

  // Unik liste pr. bruger-navn (case-insensitive) — viser kun én entry per person
  const uniqueSelectedByName = useMemo(() => {
    const map = new Map();
    selectedVersions.forEach((v) => {
      const key = (v.navn || "Anonym").trim().toLowerCase();
      if (!map.has(key)) map.set(key, v);
    });
    return Array.from(map.values());
  }, [selectedVersions]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = (beskrivelse || "").trim();
    if (!text) return;

    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2, 9);

    const version = {
      id,
      beskrivelse: text,
      // gem navnet på den bruger der indsender
      navn: user?.navn ?? "Anonym",
      email: user?.email ?? null,
      createdAt: Date.now(),
    };

    addVersion(version);
    setBeskrivelse("");

    // behold brugeren logget ind så flere betingelser kan tilføjes i samme session
    // vis kort feedback at version er tilføjet
    setAddedId(id);
    if (addedTimeout.current) clearTimeout(addedTimeout.current);
    addedTimeout.current = setTimeout(() => setAddedId(null), 2000);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (addedTimeout.current) clearTimeout(addedTimeout.current);
    };
  }, []);

  const copyToClipboard = (version) => {
    if (!version?.email) return;
    navigator.clipboard.writeText(version.email);
    setCopiedId(version.id);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const handleConfirm = () => {
    if (selectedIdsSet.size === 0) {
      setSelectError(true);
      // ryd fejlmeddelelse efter 3 sekunder
      setTimeout(() => setSelectError(null), 5000);
      return;
    }
    setSelectConfirmed(true);
    // ryd valg efter bekræftelse
    clearSelection();
    // ryd user (log ud)
    clearUser();
  }

  const removeVersion = useVersionStore((s) => s.removeVersion);
  const updateVersion = useVersionStore((s) => s.updateVersion);

  // start edit
  const startEdit = (v) => {
    setEditingId(v.id);
    setEditingText(v.beskrivelse || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const saveEdit = () => {
    if (!editingId) return;
    updateVersion(editingId, { beskrivelse: editingText, updatedAt: Date.now() });
    setEditingId(null);
    setEditingText("");
  };

  // åbn slet-confirm modal (gør ikke sletningen endnu)
  const handleDelete = (id) => {
    setDeleteCandidateId(id);
    setConfirmDelete(true);
  };

  // kaldet når brugeren bekræfter slet (Ja)
  const handleDeleteConfirmed = () => {
    if (!deleteCandidateId) return;
    // fjern version fra store
    removeVersion(deleteCandidateId);
    // fjern id fra persisted selection hvis nødvendigt
    const persisted = Array.isArray(persistedSelectedIds) ? persistedSelectedIds : [];
    const next = persisted.filter((x) => x !== deleteCandidateId);
    setPersistedSelectedIds(next);
    // ryd modal state
    setDeleteCandidateId(null);
    setConfirmDelete(false);
  };

  // kaldet når brugeren afbryder (Nej)
  const handleDeleteCancel = () => {
    setDeleteCandidateId(null);
    setConfirmDelete(false);
  };

  return (
    <>    <div className="min-h-[200vh]">
      <div className="flex gap-10 items-start">
        {/* VENSTRE KOLONNE */}
        <div className="w-1/2 p-10">
        <h2 className="pb-6">Tidligere versioner ({count})</h2>
        <form onSubmit={handleSubmit} className="flex gap-4 items-center relative">
          <input
            placeholder="Tilføj flere betingelser..."
            value={beskrivelse}
            onChange={(e) => setBeskrivelse(e.target.value)}
            className="w-full p-3 rounded-full mb-5  focus:ring-2 focus:ring-blue-400 transition-all duration-300"
          />
          <button type="submit" aria-label="Tilføj betingelse" className="p-2 rounded-full">
            <GoPlus size={30} className="text-gray-500 hover:text-gray-800 cursor-pointer transition-colors duration-300 mb-2" />
          </button>
          {addedId && 
            <span className="absolute -top-6 left-2 text-green-800 bg-green-300 rounded p-2 text-sm">Din nye betingelse er blevet tilføjet!</span>}
          {/* {selectError && (
             <span className="absolute -top-6 left-40 text-red-500 text-sm">{selectError}</span>
           )} */}
         </form>
         <button
          type="button"
          onClick={() => setShowMineOnly((s) => !s)}
          className={`font-bold text-sm pb-2 px-3 py-1 rounded transition-all duration-200 ${showMineOnly ? "underline" : "underline text-gray-700 hover:scale-102"}`}
        >
          {showMineOnly ? "Vis alle betingelser" : "Mine betingelser"}
        </button>
          <ul>
            {visibleVersions.map((v) => {
              const isSelected = selectedIdsSet.has(v.id);
              const isOwner = !!(user?.email && v.email && user.email === v.email);
                return (
                <li
                  key={v.id}
                  className="relative mb-6 backdrop-blur-md inset-shadow-sm inset-shadow-amber-50 p-5 pt-15 rounded-2xl shadow-sm"
                >
                  {/* hvis ejeren: vis Rediger / Slet, ellers Tilvælg/Fravælg */}
                  {isOwner ? (
                    <div className="absolute top-3 right-3 z-10 flex gap-2">
                      {editingId === v.id ? (
                        <div className="flex gap-2">
                          <button onClick={saveEdit} className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm cursor-pointer">Gem</button>
                          <button onClick={cancelEdit} className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-sm cursor-pointer">Fortryd</button>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button onClick={() => startEdit(v)} className="px-3 py-1 bg-yellow-100 text-yellow-800 cursor-pointer rounded text-sm">Rediger</button>
                          <button onClick={() => handleDelete(v.id)} className="px-3 py-1 bg-red-100 text-red-700 cursor-pointer rounded text-sm">Slet</button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => toggleSelected(v.id)}
                      className={`absolute cursor-pointer top-3 right-3 z-10 px-3 py-1 rounded-full text-sm font-semibold ${isSelected ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-700"} hover:scale-105 transition-transform`}
                      aria-pressed={isSelected}
                    >
                      {isSelected ? `Fravælg ${v.navn}` : `Tilvælg ${v.navn}`}
                    </button>
                  )}
                   <div className="flex items-start justify-between gap-3">
                     <div className="flex flex-col gap-3">
                       <div className="flex flex-col gap-1">
                       <span className="text-xs text-gray-500">{`version ${v.id}`}</span>
                       <strong className="text-md">{v.navn ?? "Anonym"}</strong>
                       {/* vis inline editor */}
                       {editingId === v.id ? (
                         <textarea value={editingText} onChange={(e) => setEditingText(e.target.value)} className="mt-2 p-2 border rounded w-full" rows={4} />
                       ) : null}
                       <div className="flex justify-between items-center">
                       <span className="text-sm">{v.email ?? "Anonym"}</span>
                       <div className="flex flex-col relative ">
                       <button type="button"
                           onClick={() => copyToClipboard(v)}
                         className="text-sm cursor-pointer text-gray-500">Kopier e-mail</button>
                         {copiedId === v.id && (<span className="text-xs top-5 left-5 absolute text-green-500">Kopieret!</span>)}
                       </div>
                       </div>
                       </div>
                       <p className="whitespace-pre-wrap">{v.beskrivelse}</p>
                     </div>
                   </div>
                 </li>
               )})}
          </ul>
        </div>
 
        {/* STICKY FORM */}
        <div
          className="
      w-1/2
      sticky top-20
      self-start
      p-10
    "
        >
          <SearchUser />
              <div className="flex flex-col items-center mt-10">
              <h2>{`Hej ${user?.navn ?? "Anonym"}`}</h2>
          <p className="text-center mt-5">Tak fordi du har delt dine betingelser for din kærlighed. Du kan nu sende Betinget Kærlighed videre til dine relationer ved at klikke på knappen nedenfor.</p>
          <strong className="text-xs mb-5">Husk at de også skal acceptere dine betingelser for at modtage din kærlighed.</strong>
          <a
            href={`mailto:?subject=Betinget Kærlighed&body=Hej [modtager],%0D%0A%0D%0AJeg vil hermed tilbyde min kærlighed til dig, læs og accepter mine betingelser her: www.betinget-kaerlighed.vercel.app %0D%0A%0D%0AMed venlig hilsen,%0D%0A${user?.navn ?? "Anonym"}`}
            className="text-center cursor-pointer hover:scale-102 transition-all duration-300 block"
          >
             <button className=" mt-5 cursor-pointer px-5 py-2 border-2 border-(--foreground) hover:bg-(--foreground) hover:text-(--background) transition-all duration-300 backdrop-blur-3xl rounded-full">Send Betinget Kærlighed til dine relationer</button>
          </a>
              </div>
      <div className="mt-10 flex flex-col items-end p-10 right-0 top-60">
        <div className="flex gap-10 mb-2">
          {selectedIdsSet.size > 0 ? (
            <button onClick={clearSelection} className="underline cursor-pointer text-xs font-bold">Fravælg alle</button>
          ) : (
            <button onClick={selectAllVisible} className="underline cursor-pointer text-xs font-bold">Vælg alle</button>
          )}
        </div>
        <span className="text-xs">Bemærk, du skal acceptere alle din valgte relations betingelser!</span>
        <button onClick={() => closeValgteRelationer(true)} className="cursor-pointer rounded-full inset-shadow-sm backdrop-blur-sm inset-shadow-amber-50 shadow-sm hover:scale-102 transition-all duration-300 p-2 mt-5">Se valgte relationer ({uniqueSelectedByName.length})</button>


        </div>
           <button onClick={handleConfirm} className="fixed bottom-10 right-10 mt-5 cursor-pointer px-5 py-2 bg-blue-400 hover:bg-blue-600 transition-all duration-300 text-(--background) backdrop-blur-3xl inset-shadow-sm inset-shadow-amber-50 rounded-full">Bekræft</button>

        </div>
      </div>
    </div>
      {selectError && <ErrorVaelgEn onClose={() => setSelectError(false)} />}
        {confirmDelete && (
          <ErDuSikker
          onConfirm={handleDeleteConfirmed}
          onCancel={handleDeleteCancel}
          />
        )}
      {selectConfirmed && <EndeligBekraeft onClose={() => setSelectConfirmed(false)} />}
        {openValgteRelationer && 
        <ValgteRelationer selectedIdsSet={selectedIdsSet} uniqueSelectedByName={uniqueSelectedByName} onClose={()=>closeValgteRelationer(false)} />
        }
    </>
  );
};
 
export default Uploads;