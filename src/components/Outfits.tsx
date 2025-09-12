"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

type WearCategory = {
  title: string;
  images: string[];
};

const wearCategories: WearCategory[] = [
  {
    title: "Brothers",
    images: [
      "/wear/brothers1.jpg",
      "/wear/brothers2.jpg",
      "/wear/brothers3.jpg",
      "/wear/brothers4.webp",
    ],
  },
  {
    title: "Sisters",
    images: [
      "/wear/sisters1.webp",
      "/wear/sisters2.jpg",
      "/wear/sisters3.jpg",
      "/wear/sisters2.jpg",
    ],
  },
  {
    title: "Couples",
    images: [
      "/wear/couple1.jpg",
      "/wear/couple2.jpg",
      "/wear/couple1.jpg",
      "/wear/couple2.jpg",
    ],
  },
  {
    title: "Children",
    images: [
      "/wear/child1.webp",
      "/wear/child1.webp",
      "/wear/child1.webp",
      "/wear/child1.webp",
    ],
  },
];

const BeachWearTabs = () => {
  const [activeTab, setActiveTab] = useState<string>("Brothers");

  const activeCategory = wearCategories.find((c) => c.title === activeTab);

  return (
    <section
      className="py-20 bg-gradient-to-b from-yellow-50 to-white"
      id="outfits"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900"
      >
        Beach Wear Suggestions
      </motion.h2>

      {/* Tabs */}
      <div className="flex justify-center flex-wrap gap-4 mb-10">
        {wearCategories.map((category) => (
          <button
            key={category.title}
            onClick={() => setActiveTab(category.title)}
            className={`px-6 py-2 rounded-2xl font-medium transition-colors ${
              activeTab === category.title
                ? "bg-yellow-400 text-white shadow-md"
                : "bg-white text-gray-800 border border-gray-300 hover:bg-yellow-100"
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory?.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto px-6"
        >
          {activeCategory?.images.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white"
            >
              <Image
                src={src}
                alt={`${activeCategory.title} wear ${i + 1}`}
                width={400}
                height={400}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default BeachWearTabs;
