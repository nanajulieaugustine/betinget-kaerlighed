"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";

const AcceptSome = ({ onClose }) => {
  const [closing, setClosing] = useState(false);

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
      <h3>Vælg de vilkår, du ønsker at acceptere.</h3>
      <p>For at acceptere nogle vilkår, bedes du vælge eller fravælge relationer.</p>
    </motion.div>
  );
}

export default AcceptSome;