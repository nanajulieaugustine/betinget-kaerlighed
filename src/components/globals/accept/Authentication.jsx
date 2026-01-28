"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Robot from "./Robot";
import { IoIosClose } from "react-icons/io";
import useVersionStore from "../../../../useVersionStore";

const Authentication = ({ onClose, fields, onSuccess, buttonText = "Tilmeld", intent = "accept" }) => {
  const [closing, setClosing] = useState(false);
  const [closeInitial, setCloseInitial] = useState(false);
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState({});

  const setUser = useVersionStore((s) => s.setUser);

  const isAccepted = intent === "accept";

  // form ref bruges til Credential Management API (kun i understøttede browsere)
  const formRef = useRef(null);
  const handleChange = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Gør handleSubmit async så vi kan forsøge at gemme credentials
  const handleSubmit = async () => {
    let newErrors = {};
    let newShake = {};

    fields.forEach((field) => {
      const value = (values[field.name] || "").trim();


      // krævede felter
const isRequired = field.required !== false;

if (isRequired && !value) {
  newErrors[field.name] = "Dette felt er påkrævet";
  newShake[field.name] = true;
  return;
}

      // email
      if ((field.type === "email" || field.name === "email") && value) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrors[field.name] = "Indtast en gyldig e-mail!";
          newShake[field.name] = true;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShake(newShake);
      return;
    }

    // Gem login-oplysninger i zustand så andre components kan læse dem
    setUser({
      navn: values?.navn ?? values?.name ?? null,
      email: values?.email ?? null,
    });

    setCloseInitial(true);
    onSuccess?.(values, intent);

    setValues({});
    setErrors({});
  };

  return (
    <>
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
    {isAccepted ?
    <IoIosClose
        onClick={(e) => {
          e.stopPropagation();
          setClosing(true);
        }}
        className="absolute top-5 hover:scale-120 transition-all duration-300 right-5 cursor-pointer text-2xl"
      /> : null }
      <h3>Log ind</h3>
      <p className="font-medium">Du bedes logge ind og bekræfte din beslutning.</p>
      {isAccepted ? 

      null :

      <a href="/tidligere-versioner" className="text-xs a">Vil du hellere acceptere?</a>
    }


      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-full flex flex-col items-center"
      >
        {fields.map((field) => {
          return (
            <div
              key={field.name}
              className={`relative ${shake[field.name] ? "animate-shake" : ""} p-2 mb-2 w-full max-w-md`}
            >
              <input
                name={field.name}
                type={field.type === "cpr" ? "text" : field.type || "text"}
                placeholder={field.placeholder}
                value={values[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className={`p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors[field.name] ? "border-(--roed-600)" : ""
                }`}
              />
              {errors[field.name] && (
                <p className="text-red-500 font-medium pb-2 text-sm absolute top-13 ml-2 left-0">
                  {errors[field.name]}
                </p>
              )}
            </div>
          );
        })}

        <button type="submit" className=" mt-5 cursor-pointer px-5 py-2 bg-blue-400 hover:bg-blue-600 transition-all duration-300 text-(--background) backdrop-blur-3xl inset-shadow-sm inset-shadow-amber-50 rounded-full">
          {buttonText}
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

          {/* Robot håndteres af parent via onSuccess */}
          </>
  );
}


export default Authentication;