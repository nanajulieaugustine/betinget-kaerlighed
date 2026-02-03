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
      <div
        onClick={() => setClosing(true)}
        className="fixed inset-0 backdrop-blur-md z-40"
        aria-hidden="true"
      />
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
    </>
  );
};

export default EndeligBekraeft;