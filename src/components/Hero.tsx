"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PaymentProofUpload from "./PaymentProofUpload";

const Hero = () => {
  const [showPaymentProof, setShowPaymentProof] = useState(false);

  return (
    <section
      className="relative min-h-screen flex flex-col justify-center items-center backdrop-blur-lg backdrop-filter opacity-80 text-center bg-[url('/memories/memory1.png')] bg-cover bg-center text-white"
      id="hero"
    >
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl md:text-7xl font-bold drop-shadow-lg text-[#b72318] font-headline"
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
      <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
        <motion.a
          href="#register"
          whileHover={{ scale: 1.1 }}
          className="px-6 py-3 bg-[#d23915] text-white font-semibold rounded-2xl shadow-lg hover:bg-[#b72318] text-center"
        >
          Register Now
        </motion.a>
        <motion.button
          type="button"
          whileHover={{ scale: 1.1 }}
          className="px-6 py-3 bg-[#ed7814] cursor-pointer text-white font-semibold rounded-2xl shadow-lg hover:bg-[#b72318] text-center"
          onClick={() => setShowPaymentProof(true)}
        >
          Upload Proof of Payment
        </motion.button>
      </div>
      {showPaymentProof && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4">
          <div className="relative w-full max-w-lg mt-15">
            <button
              className="absolute top-2 right-2 text-2xl text-gray-700 cursor-pointer hover:text-red-600 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow"
              onClick={() => setShowPaymentProof(false)}
              aria-label="Close"
              type="button"
            >
              &times;
            </button>
            <PaymentProofUpload />
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;
