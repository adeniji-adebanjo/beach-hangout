"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const GOOGLE_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSdezynmmIEB17emCLCoPLi0gSzLZbkuj4_uPUGXIwjGpVMMrQ/viewform";

const Registration = () => {
  const [open, setOpen] = useState(false);

  return (
    <section id="register" className="py-20 bg-white text-center">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-8"
      >
        Register for Beach Hangout
      </motion.h2>
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="bg-blue-500 text-white py-3 px-8 rounded-lg font-semibold"
        onClick={() => setOpen(true)}
      >
        Open Registration Form
      </motion.button>
      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full relative p-4">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              &times;
            </button>
            <iframe
              src={GOOGLE_FORM_URL}
              title="Beach Hangout Registration"
              width="100%"
              height="600"
              className="border-0 rounded-lg"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default Registration;
