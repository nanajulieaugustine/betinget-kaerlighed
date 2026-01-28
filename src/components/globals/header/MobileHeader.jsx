"use client";
import { useState } from "react";
import Link from "next/link";

const MobileHeader = ({ navItems = [], activeNav, setActiveNav }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative h-screen bg-(--background)">
      <button
        aria-expanded={open}
        aria-label="Menu"
        onClick={() => setOpen((s) => !s)}
        className="flex items-center gap-2 p-2 rounded-md focus:outline-none"
      >
        {/* Two-line burger */}
        <span className="block w-6 h-0.5 bg-current" />
        <span className="block w-4 h-0.5 bg-current" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                onClick={() => {
                  setActiveNav(item.href);
                  setOpen(false);
                }}
                className={`block px-4 py-2 text-sm ${activeNav === item.href ? "font-semibold" : ""}`}
              >
                {item.label}
              </a>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileHeader;