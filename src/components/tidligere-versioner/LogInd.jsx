"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";

const LogInd = ({ onClose }) => {
  const [closing, setClosing] = useState(false);
  const router = useRouter();

  const handleClose = () => setClosing(true);

  return (
    <>
      {/* Statisk overlay – ingen framer-motion animation her */}
      <div
        onClick={handleClose}
        className="fixed inset-0 backdrop-blur-md z-40"
        aria-hidden="true"
      />

      {/* Modal – kun dette element animeres af framer-motion */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={closing ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        onAnimationComplete={() => {
          if (!closing) return;
          // efter close-animation: naviger til root og kald onClose hvis angivet
          router.push("/");
          if (typeof onClose === "function") onClose();
        }}
         className="fixed top-50 left-130 z-100 rounded-4xl h-100 w-100 flex flex-col p-10 items-center justify-center backdrop-blur-md inset-shadow-sm inset-shadow-amber-50 shadow-lg"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >

          <IoIosClose
            onClick={() => setClosing(true)}
            className="absolute top-4 right-4 cursor-pointer text-2xl"
          />

          <h3 className="mb-4 text-lg font-semibold">Du skal tage stilling</h3>
          <p className="mb-6">Du skal tage stilling til om du accepterer betinget kærlighed for at se denne side.</p>

          <div className="flex justify-center">
            <button
              onClick={() => setClosing(true)}
              className="px-5 cursor-pointer py-2 bg-blue-400 hover:bg-blue-600 text-(--background) transition-all duration-300 inset-shadow-amber-50 inset-shadow-sm shadow-sm rounded-full"
            >
              Ok, før mig til vilkår og betingelser
            </button>

        </div>
      </motion.div>
    </>
  );
};

export default LogInd;