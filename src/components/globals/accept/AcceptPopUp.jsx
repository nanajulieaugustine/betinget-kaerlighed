"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import useVersionStore from "../../../../useVersionStore";

const AcceptPopUp = ({ onClose }) => {
    const user = useVersionStore((s) => s.user);

    const addVersion = useVersionStore((s) => s.addVersion);
  const versioner = useVersionStore((s) => s.versioner);

  const [closing, setClosing] = useState(false);

  const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [shake, setShake] = useState({});

    const timerRef = useRef(null);
      const router = useRouter();
  
    const handleChange = (name, value) => {
      setValues((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSubmit = async () => {
    const newErrors = {};
    const newShake = {};
  
    const value = (values["terms"] || "").trim();
    if (!value) {
      newErrors["terms"] = "Dette felt er påkrævet";
      newShake["terms"] = true;
    } else if (value.length < 10) {
      newErrors["terms"] = "Indtast mindst 10 tegn";
      newShake["terms"] = true;
    }
  
    setErrors(newErrors);
    setShake(newShake);
  
    if (Object.keys(newErrors).length > 0) return;
  
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2, 9);
  
  const version = {
    id,
    beskrivelse: value,
    navn: user?.navn ?? "Anonym",
    email: user?.email ?? null,
    createdAt: Date.now(),
  };
  addVersion(version);
  
    if (timerRef.current) clearTimeout(timerRef.current);
  
    timerRef.current = setTimeout(async () => {
      setClosing(true);
      await new Promise((res) => setTimeout(res, 350));
      await router.push("/tidligere-versioner");
    });
  
    setValues({});
  };
  
  
    useEffect(() => {
      return () => {
        // clear timeout ved unmount for at undgå memory leaks eller uønsket onClose
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, []);

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
      <h3>Registrer bekræftelse</h3>
      <p className="font-medium">For at acceptere Betinget Kærlighed, bedes du indsætte dine egne vilkår.</p>
      
        <form
          key={"terms"}
          className={`relative ${shake["terms"] ? "animate-shake" : ""} flex items-center flex-col`}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <input
            name="terms"
            type="text"
            placeholder="Dine vilkår"
            onChange={(e) => handleChange("terms", e.target.value)}
            minLength={10}
            aria-invalid={errors["terms"] ? "true" : "false"}
            aria-describedby={errors["terms"] ? "terms-error" : undefined}
            className={`p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-md ${
              errors["terms"] ? "border-(--roed-600)" : ""
            }`}
          />
          {errors["terms"] && (
            <p id="terms-error" className="text-red-500 font-medium pb-2 text-sm absolute top-13 ml-2 left-0">
              {errors["terms"]}
            </p>
          )}
          <button
            type="submit"
            className="mt-10 cursor-pointer px-5 py-2 bg-blue-400 hover:bg-blue-600 transition-all duration-300 text-(--background) backdrop-blur-3xl inset-shadow-sm inset-shadow-amber-50 rounded-full"
          >
            Bekræft
          </button>
        </form>

        <style jsx>{`
          @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            50% { transform: translateX(5px); }
            75% { transform: translateX(-5px); }
            100% { transform: translateX(0); }
          }
          .animate-shake { animation: shake 0.3s; }
        `}</style>

        {/* copy link */}

    </motion.div>
            </>
  );
}

export default AcceptPopUp;