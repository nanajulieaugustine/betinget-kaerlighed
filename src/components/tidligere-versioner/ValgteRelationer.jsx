"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import useVersionStore from "../../../useVersionStore";

const ValgteRelationer = ({ onClose, selectedIdsSet, uniqueSelectedByName }) => {
  const [closing, setClosing] = useState(false);
  const setSearchQuery = useVersionStore((s) => s.setSearchQuery);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={closing ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (closing) onClose();
      }}
      className="fixed top-50 left-130 rounded-4xl h-100 w-100 flex flex-col p-10 items-center justify-center backdrop-blur-md inset-shadow-sm inset-shadow-amber-50 shadow-xs"
      onClick={(e) => e.stopPropagation()}
    >
      <IoIosClose
        onClick={(e) => {
          e.stopPropagation();
          setClosing(true);
        }}
        className="absolute top-5 hover:scale-120 transition-all duration-300 right-5 cursor-pointer text-2xl"
      />    
      <strong>Du har valgt at acceptere betingelserne fra følgende relationer:</strong>
      <ul className="flex flex-wrap gap-5 mt-5 p-2 max-h-60 overflow-y-auto">
        {selectedIdsSet.size > 0 ? (
          uniqueSelectedByName.map((sv) => (
            <li
              className="hover:scale-102 transition-all duration-300 inset-shadow-amber-50 inset-shadow-sm rounded-full p-2"
              key={sv.id}
            >
              <button
                onClick={() => {
                  // sæt søgefilter til denne brugers navn og luk modal
                  setSearchQuery(sv.navn ?? "");
                  setClosing(true);
                }}
                className="px-3 py-1 cursor-pointer"
              >
                {sv.navn ?? "Anonym"}
              </button>
            </li>
          ))
        ) : (
          <li>Ingen relationer valgt</li>
        )}
      </ul>
    </motion.div>
  );
}

export default ValgteRelationer;