"use client";

import { motion } from "framer-motion";

const WhatToExpect = () => {
  const activities = [
    { title: "Beach Games", icon: "🏐" },
    { title: "Live Music", icon: "🎶" },
    { title: "Food & Drinks", icon: "🍹" },
    { title: "Networking", icon: "🤝" },
  ];

  return (
    <section className="py-20 bg-white">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10"
      >
        What to Expect This Year
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto text-center">
        {activities.map((a, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-6 bg-yellow-100 rounded-2xl shadow-md"
          >
            <div className="text-5xl mb-4">{a.icon}</div>
            <h3 className="text-xl font-semibold">{a.title}</h3>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhatToExpect;
