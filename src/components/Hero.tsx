"use client";

import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center backdrop-blur-lg backdrop-filter opacity-80 text-center bg-[url('/memory1.png')] bg-cover bg-center text-white"
      id="hero"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold drop-shadow-lg text-[#b72318]"
      >
        Beach Hangout 2025
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="mt-4 text-xl md:text-2xl text-white"
      >
        Join us for fun, games & unforgettable vibes!
      </motion.p>
      <motion.a
        href="#register"
        whileHover={{ scale: 1.1 }}
        className="mt-8 px-6 py-3 bg-[#d23915] text-white font-semibold rounded-2xl shadow-lg hover:bg-[#b72318]"
      >
        Register Now
      </motion.a>
    </section>
  );
};

export default Hero;
