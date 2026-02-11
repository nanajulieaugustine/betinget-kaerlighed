"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import useVersionStore from "../../../useVersionStore";

const ValgteRelationer = ({ onClose, selectedIdsSet, uniqueSelectedByName }) => {
  const [closing, setClosing] = useState(false);
  const setSearchQuery = useVersionStore((s) => s.setSearchQuery);

  return (
    <div className="fixed inset-0 z-40">
      <div className="relative h-full w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={closing ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          onAnimationComplete={() => {
            if (closing) onClose();
          }}
          className="absolute left-1/2 top-1/2 z-50 h-100 w-100 max-h-[90vh] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-4xl p-10 flex flex-col items-center justify-center backdrop-blur-md inset-shadow-sm inset-shadow-amber-50 shadow-xs"
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
      </div>
    </div>
  );
}

export default ValgteRelationer;