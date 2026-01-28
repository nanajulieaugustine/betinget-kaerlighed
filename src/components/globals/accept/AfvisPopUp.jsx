"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";
import Authentication from "./Authentication";
import Robot from "./Robot";
import useVersionStore from "../../../../useVersionStore";

const AfvisPopUp = ({ onClose }) => {
  const [closing, setClosing] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authRequested, setAuthRequested] = useState(false);
  const [robotOpen, setRobotOpen] = useState(false);
  const [robotData, setRobotData] = useState(null);

  // læs user, versioner og persisted setter for valgte ids
  const user = useVersionStore((s) => s.user);
  const versioner = useVersionStore((s) => s.versioner);
  const setPersistedSelectedIds = useVersionStore((s) => s.setSelectedIds);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={closing ? { opacity: 0, scale: 0.5 } : { opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onAnimationComplete={() => {
          if (!closing) return;

          // hvis authRequested => åbn Authentication (brugeren var ikke logget ind)
          if (authRequested) {
            setAuthRequested(false);
            setAuthOpen(true);
            return; // behold AfvisPopUp mounted indtil auth er lukket
          }

          // hvis robotData er sat (brugeren allerede logget ind) => åbn Robot
          if (robotData) {
            setRobotOpen(true);
            return;
          }

          // ellers luk popup normalt
          onClose();
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
        <h3>Er du sikker på du vil afvise?</h3>
        <p className="font-medium">Afviser du vilkår for Betinget kærlighed, mister du retten til dine relationers kærlighed.</p>
        <div className="flex gap-10">
          <button
            onClick={() => setClosing(true)}
            className="cursor-pointer px-5 py-2 bg-blue-400 hover:bg-blue-600 transition-all duration-300 text-(--background) backdrop-blur-3xl inset-shadow-sm inset-shadow-amber-50 rounded-full"
          >
            Nej
          </button>

          <button
            onClick={() => {
              // hvis allerede logget ind: åbn Robot (senere, efter luk-animation) med user som data
              if (user?.email || user?.navn) {
                setRobotData(user);
                setClosing(true);
                return;
              }
              // ellers bed om authentication efter luk-animation
              setAuthRequested(true);
              setClosing(true);
            }}
            className="cursor-pointer px-5 py-2 border-2 border-blue-400 hover:bg-blue-600 transition-all duration-300 text-(--background) backdrop-blur-3xl inset-shadow-sm inset-shadow-amber-50 rounded-full"
          >
            Ja
          </button>
        </div>
      </motion.div>

      {/* Authentication: kun vist hvis brugeren ikke er logget ind */}
      {authOpen && (
        <Authentication
          intent="decline"
          fields={[
            { name: "navn", type: "text", required: true, placeholder: "Dit fulde navn" },
            { name: "email", type: "email", required: true, placeholder: "Din e-mail" },
          ]}
          buttonText="Log ind og bekræft"
          onClose={() => setAuthOpen(false)}
          onSuccess={(values, intent) => {
            setAuthOpen(false);
            if (intent === "decline") {
              // vælg evt. alle ids (hvis ønsket) og åbn Robot med de indtastede data
              const allIds = (versioner || []).map((v) => v.id);
              setPersistedSelectedIds(allIds);
              setRobotData(values);
              setRobotOpen(true);
            }
          }}
        />
      )}

      {/* Robot: åbnes enten hvis brugeren var logget ind (robotData= user) eller efter auth-success */}
      {robotOpen && <Robot data={robotData} onClose={() => setRobotOpen(false)} />}
    </>
  );
};

export default AfvisPopUp;