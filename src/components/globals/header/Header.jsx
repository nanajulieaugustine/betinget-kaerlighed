"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MobileHeader from "./MobileHeader";
import { HiOutlineMenuAlt4 } from "react-icons/hi";


const navItems = [
  { href: "/", label: "Terms & Conditions" },
  { href: "/proeveperiode", label: "Prøveperiode" },
  { href: "/fortrydelsesret", label: "Fortrydelsesret" },
  { href: "/tidligere-versioner", label: "Tidligere versioner" },
];

const Header = () => {
  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState(pathname || "/");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname) setActiveNav(pathname);
  }, [pathname]);

  return (
    <>
    {/* desktop */}
    <nav className="hidden lg:flex justify-between px-10 items-center fixed top-0 left-0 right-0 py-5 z-50">
      <h4 className="max-w-25 uppercase">Betinget Kærlighed</h4>

        <ul className="relative flex justify-end gap-15 shadow-xs items-center backdrop-blur-sm inset-shadow-sm inset-shadow-amber-50 rounded-full">
          {navItems.map((item) => (
            <li key={item.href} className="relative">
              {activeNav === item.href && (
                <motion.span
                  layoutId="activeNavBg"
                  initial={false}
                  transition={{ type: "easeInOut", stiffness: 500, damping: 35 }}
                  className="absolute inset-0 shadow-sm rounded-full "
                />
              )}

              <Link
                href={item.href}
                onClick={() => setActiveNav(item.href)}
                className="relative z-10 px-5 py-3 block hover:scale-103 easeInOut duration-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
          <li className="flex  lg:hidden">
          {open ?  <HiOutlineMenuAlt4 /> :  <MobileHeader navItems={navItems} activeNav={activeNav} setActiveNav={setActiveNav} />}
          </li>
        </ul>
    </nav>
    </>
  );
};

export default Header;