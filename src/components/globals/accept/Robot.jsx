"use client";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useRouter } from "next/navigation";
import GikGaltPopUp from "./GikGaltPopUp";
import useVersionStore from "../../../../useVersionStore";

const Robot = ({ onClose }) => {
  const user = useVersionStore((s) => s.user);
  const addVersion = useVersionStore((s) => s.addVersion);
  const versioner = useVersionStore((s) => s.versioner);

  const [closing, setClosing] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState({});
  const [animation, setAnimation] = useState(false);
    const [failed, setFailed] = useState(false);

  const formRef = useRef(null);
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

  // hvis Robot opretter/sender noget, inkludér user:
  const version = {
    id,
    beskrivelse: value,
    navn: user?.navn ?? "Anonym",
    email: user?.email ?? null,
    createdAt: Date.now(),
  };
  addVersion(version);

  // animation flow
  setAnimation(true);
  if (timerRef.current) clearTimeout(timerRef.current);

  timerRef.current = setTimeout(async () => {
    setAnimation(false);
    setClosing(true);
    await new Promise((res) => setTimeout(res, 350));
    await router.push("/tidligere-versioner?gik=1");
  }, 10000);

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

    <div className="relative">
      <motion.div ref={formRef}
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
        <h3>Bekræft du ikke er en robot</h3>
        <p className="font-medium">Du bedes definere dine egne terms and conditions for at bekræfte din identitet</p>
        <a href="/tidligere-versioner" className="text-xs a">Se tidligere versioner</a>

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
      </motion.div>

      {/* centered animation overlay */}
      {animation && (
        <div className="fixed inset-0 z-1000 flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

          <div className="relative w-64 h-64 md:w-96 md:h-96 pointer-events-auto">
            <DotLottieReact
              className="w-full h-full"
              src="https://lottie.host/8fc87cab-504c-48f1-a187-0db3ee3543d6/lE8KVCWN5I.lottie"
              loop
              autoplay
            />
          </div>
        </div>
      )}
    </div>
        {failed && <GikGaltPopUp onClose={() => setFailed(false)} />}
    </>
  );
}

export default Robot;