"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";

const GikGaltPopUp = ({ onClose }) => {
  const [closing, setClosing] = useState(false);

  return (
    <>
      <div
        onClick={setClosing}
        className="fixed inset-0 backdrop-blur-md z-40"
        aria-hidden="true"
      />
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={closing ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      onAnimationComplete={() => {
        if (closing) onClose();
      }}
      className="fixed top-50 left-130 z-100 rounded-4xl h-100 w-100 flex flex-col p-10 items-center justify-center backdrop-blur-md inset-shadow-sm inset-shadow-amber-50 shadow-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <IoIosClose
        onClick={(e) => {
          e.stopPropagation();
          setClosing(true);
        }}
        className="absolute top-5 hover:scale-120 transition-all duration-300 right-5 cursor-pointer text-2xl"
      />
      <h3>Noget gik galt...</h3>
      <p className="font-medium text-red-500">Det var ikke muligt at afvise vilkår for Betinget Kærlighed.</p>
      <strong>Dine betingelser er nu tilføjet til tidligere versioner.</strong>
      <p>Prøv igen senere.</p>
    </motion.div>
        </>
  );
}

export default GikGaltPopUp;