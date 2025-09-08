"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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
      <form className="max-w-lg mx-auto flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-3 border rounded-lg"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 border rounded-lg"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="bg-blue-500 text-white py-3 rounded-lg font-semibold"
        >
          Submit
        </motion.button>
      </form>
    </section>
  );
};

export default Registration;
