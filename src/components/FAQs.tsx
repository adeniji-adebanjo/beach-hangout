"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "When is the Beach Hangout 2025 happening?",
    answer: "The event will take place on Saturday, November 22nd, 2025.",
  },
  {
    question: "Where is the venue?",
    answer: "The hangout will be at Barracuda Beach, Ajah, Lagos.",
  },
  {
    question: "What should I wear?",
    answer:
      "Beach-friendly outfits like shorts, sundresses, swimwear, and slippers are recommended. Don’t forget sunscreen and sunglasses!",
  },
  {
    question: "Who can attend?",
    answer:
      "Everyone is welcome! It’s a family-friendly event, so bring friends, colleagues, and loved ones.",
  },
  {
    question: "What time should I arrive?",
    answer: "Arrival starts at 6:45 AM. The departure will be at 7: 00 AM.",
  },
  {
    question: "Is there a drop-off point or parking?",
    answer:
      "Yes, there will be designated parking areas at the EGFM office in Kosofe which also doubles as the drop-off point.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50" id="faqs">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10"
      >
        Frequently Asked Questions
      </motion.h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border rounded-xl bg-white shadow-sm"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-800"
            >
              {faq.question}
              <span className="text-xl">{openIndex === index ? "−" : "+"}</span>
            </button>

            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  key="content"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-6 pb-4 text-gray-600"
                >
                  {faq.answer}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQs;
