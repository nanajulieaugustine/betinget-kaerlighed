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
      <div className="fixed inset-0 z-40">
        {/* Statisk overlay – ingen framer-motion animation her */}
        <div
          onClick={handleClose}
          className="absolute inset-0 backdrop-blur-md"
          aria-hidden="true"
        />

        {/* Modal – kun dette element animeres af framer-motion */}
        <div className="relative h-full w-full">
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
            className="absolute left-1/2 top-1/2 z-50 h-100 w-100 max-h-[90vh] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-4xl p-10 flex flex-col items-center justify-center backdrop-blur-md inset-shadow-sm inset-shadow-amber-50 shadow-lg"
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
        </div>
      </div>
    </>
  );
};

export default LogInd;