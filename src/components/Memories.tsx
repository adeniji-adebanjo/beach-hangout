"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const Memories = () => {
  const images = [
    "/memory1.png",
    "/memory2.png",
    "/memory3.png",
    "/memory4.png",
    "/memory5.png",
    "/memory6.png",
  ];

  return (
    <section className="py-20 bg-gray-100">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10"
      >
        Last Year Memories
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {images.map((src, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="overflow-hidden rounded-xl shadow-lg"
          >
            <Image
              src={src}
              alt={`memory-${i}`}
              width={400}
              height={300}
              className="object-cover w-full h-full"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Memories;
