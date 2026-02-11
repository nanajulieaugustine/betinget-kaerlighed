"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";

const EndeligBekraeft = ({ onClose, redirectTo }) => {
  const [closing, setClosing] = useState(false);
  const router = useRouter();

  return (
    <>
      <div className="fixed inset-0 z-40">
        <div
          onClick={() => setClosing(true)}
          className="absolute inset-0 backdrop-blur-md"
          aria-hidden="true"
        />
        <div className="relative h-full w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={closing ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onAnimationComplete={() => {
              if (!closing) return;
              // naviger først, kald onClose bagefter
              router.push(redirectTo);
              if (typeof onClose === "function") onClose();
            }}
            className="absolute left-1/2 top-1/2 z-50 h-100 w-100 max-h-[90vh] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-4xl p-10 flex flex-col items-center justify-center backdrop-blur-md inset-shadow-sm inset-shadow-amber-50 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
        <IoIosClose
          onClick={(e) => {
            e.stopPropagation();
            setClosing(true);
          }}
          className="absolute top-5 hover:scale-120 transition-all duration-300 right-5 cursor-pointer text-2xl"
        />
        <h3>Tak!</h3>
        <p className="font-medium">Dit valg er hermed gemt!</p>
        <strong>Du logges nu ud</strong>
        <button
          onClick={() => setClosing(true)}
          className="mt-5 cursor-pointer px-5 py-2 bg-blue-400 hover:bg-blue-600 transition-all duration-300 text-(--background) backdrop-blur-3xl inset-shadow-sm inset-shadow-amber-50 rounded-full"
        >
          Ok
        </button>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default EndeligBekraeft;