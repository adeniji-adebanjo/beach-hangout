"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Register", href: "/#register" },
    { name: "Memories", href: "/#memories" },
    { name: "What to Expect", href: "/#what-to-expect" },
    { name: "Beach Outfits", href: "/#outfits" },
    { name: "FAQs", href: "/#faqs" },
  ];

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-colors ${
          scrolled
            ? "bg-white shadow-md text-gray-800"
            : "bg-transparent text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/NLWC_IKD-logo-colored.png"
              alt="NLWC_logo"
              width={60}
              height={60}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex space-x-8 font-medium">
            {navItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="hover:text-primary-color transition-colors"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="p-2 rounded-lg border border-current text-2xl"
              aria-label="Open Menu"
            >
              <HiMenu />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col items-center justify-center space-y-8 text-white text-2xl font-semibold"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-3xl"
              aria-label="Close Menu"
            >
              <HiX />
            </button>

            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                whileHover={{ scale: 1.1 }}
                className="hover:text-primary-color transition-colors"
              >
                {item.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
