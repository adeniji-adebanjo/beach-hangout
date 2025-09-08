"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "Register", href: "#register" },
    { name: "Memories", href: "#memories" },
    { name: "What to Expect", href: "#expect" },
    { name: "FAQs", href: "#faqs" },
  ];

  return (
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
        <Link href="#hero" className="text-2xl font-bold tracking-wide">
          Beach<span className="text-yellow-400">Hangout</span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex space-x-8 font-medium">
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                className="hover:text-yellow-400 transition-colors"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Placeholder (Optional) */}
        <div className="md:hidden">
          <button className="px-3 py-2 rounded-lg border border-current">
            ☰
          </button>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
