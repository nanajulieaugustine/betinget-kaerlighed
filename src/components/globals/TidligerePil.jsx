"use client"
import { RiArrowLeftWideFill } from "react-icons/ri";
import { motion } from "framer-motion";

const TidligerePil = () => {
    return (
        <div className="flex gap-2 items-center pl-5 cursor-pointer z-50">
            <motion.div
            initial={{ x: -5 }}
            animate={{ x: -0}}
            transition={{ duration: 1, ease: "easeInOut", repeat: Infinity, repeatType: "mirror" }}
            >
            <RiArrowLeftWideFill className="hover:scale-105 transition-all duration-300 ease-in-out" size={20} />
            </motion.div>
            <a href="/">
            <p className="hover:underline text-md font-md mt-3 transition-all duration-300 ease-in-out">Indsæt dine betingelser</p>
            </a>
        </div>
    );
}
 
export default TidligerePil;