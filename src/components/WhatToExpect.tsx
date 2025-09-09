"use client";

import { motion } from "framer-motion";
import {
  FaVolleyballBall,
  FaMusic,
  FaGlassCheers,
  FaHandshake,
} from "react-icons/fa";

const WhatToExpect = () => {
  const activities = [
    {
      title: "Beach Games",
      icon: <FaVolleyballBall className="text-yellow-600" />,
    },
    { title: "Music", icon: <FaMusic className="text-blue-500" /> },
    {
      title: "Food & Drinks",
      icon: <FaGlassCheers className="text-pink-500" />,
    },
    { title: "Fellowship", icon: <FaHandshake className="text-green-600" /> },
  ];

  return (
    <section className="py-20 bg-white" id="what-to-expect">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10"
      >
        What to Expect This Year
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
        {activities.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-6 bg-yellow-100 rounded-2xl shadow-md"
          >
            <div className="flex justify-center mb-4 text-4xl">{a.icon}</div>
            <h3 className="text-xl font-semibold">{a.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhatToExpect;
