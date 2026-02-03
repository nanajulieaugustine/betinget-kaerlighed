"use client";
import { useState } from "react";
import useVersionStore from "../../../useVersionStore";
import EndeligBekraeft from "../globals/accept/EndeligBekraeft";

const FortrydForm = ({ intent, fields, buttonText, onSuccess }) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [shake, setShake] = useState({});
  const [openAccept, setOpenAccept] = useState(false);

  const setUser = useVersionStore((s) => s.setUser);

  const handleChange = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => ({ ...e, [name]: undefined }));
    setShake((s) => ({ ...s, [name]: false }));
  };

  const handleSubmit = async () => {
    let newErrors = {};
    let newShake = {};

    fields.forEach((field) => {
      const value = (values[field.name] || "").trim();
      const isRequired = field.required !== false;

      if (isRequired && !value) {
        newErrors[field.name] = "Dette felt er påkrævet";
        newShake[field.name] = true;
        return;
      }

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

    setUser({
      navn: values?.navn ?? values?.name ?? null,
      email: values?.email ?? null,
    });

    if (typeof setCloseInitial !== "undefined") {
      setCloseInitial(true);
    }
    onSuccess?.(values, intent);

    setValues({});
    setErrors({});
    setOpenAccept(true);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="p-6 rounded-2xl shadow-sm flex flex-col items-stretch w-full max-w-xl mx-auto"
      >
        {fields.map((field) => {
          return (
            <div
              key={field.name}
              className={`relative ${shake[field.name] ? "animate-shake" : ""} mb-4 w-full`}
            >
              <input
                name={field.name}
                type={field.type === "cpr" ? "text" : field.type || "text"}
                placeholder={field.placeholder}
                value={values[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
                className={`w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                  errors[field.name] ? "border-red-600" : ""
                }`}
              />
              {errors[field.name] && (
                <p className="text-red-500 font-medium mt-2 text-sm">
                  {errors[field.name]}
                </p>
              )}
            </div>
          );
        })}

        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-2 cursor-pointer px-5 py-2 bg-blue-400 hover:bg-blue-600 text-white rounded-full"
          >
            {buttonText}
          </button>
        </div>
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
       
      {openAccept && <EndeligBekraeft redirectTo = "/404"/>}
    </>
  );
};

export default FortrydForm;