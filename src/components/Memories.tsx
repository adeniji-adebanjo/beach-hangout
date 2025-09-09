// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// const Memories = () => {
//   const images = [
//     "/memory1.png",
//     "/memory2.png",
//     "/memory3.png",
//     "/memory4.png",
//     "/memory5.png",
//     "/memory6.png",
//   ];

//   return (
//     <section className="py-20 bg-gray-100">
//       <motion.h2
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-4xl font-bold text-center mb-10"
//       >
//         Last Year Memories
//       </motion.h2>
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
//         {images.map((src, i) => (
//           <motion.div
//             key={i}
//             whileHover={{ scale: 1.05 }}
//             className="overflow-hidden rounded-xl shadow-lg"
//           >
//             <Image
//               src={src}
//               alt={`memory-${i}`}
//               width={400}
//               height={300}
//               className="object-cover w-full h-full"
//             />
//           </motion.div>
//         ))}
//       </div>
//     </section>
//   );
// };

// export default Memories;

"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const images = [
  "/memory1.png",
  "/memory2.png",
  "/memory3.png",
  "/memory4.png",
  "/memory5.png",
  "/memory6.png",
];

const Memories = () => {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    mode: "snap",
    slides: {
      perView: 1.2,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: {
          perView: 1,
          spacing: 20,
        },
      },
      "(min-width: 768px)": {
        slides: {
          perView: 2,
          spacing: 24,
        },
      },
      "(min-width: 1024px)": {
        slides: {
          perView: 4.5,
          spacing: 30,
        },
      },
    },
  });

  // Auto-scroll
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (slider.current) {
      interval = setInterval(() => {
        slider.current?.next();
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [slider]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full py-20 bg-gray-100 text-center"
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-12">
        Last Year Memories
      </h2>

      <div className="relative mt-10">
        {/* Top line: Curved for mobile */}
        <div className="pointer-events-none absolute -top-8 left-0 z-0 block h-12 w-full md:hidden">
          <svg
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            className="h-full w-full"
          >
            <path
              d="M0,0 Q50,20 100,0"
              stroke="#000"
              strokeWidth="0.2"
              fill="transparent"
            />
          </svg>
        </div>

        {/* Top line: Straight for desktop */}
        <div className="pointer-events-none absolute left-0 z-0 hidden w-full md:block">
          <svg
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            className="h-20 w-full"
          >
            <path
              d="M0,0 L100,0"
              stroke="#000"
              strokeWidth="0.4"
              fill="transparent"
            />
          </svg>
        </div>

        {/* Carousel container */}
        <div
          ref={sliderRef}
          className="keen-slider relative -top-4 z-10 overflow-hidden md:-top-8"
        >
          {images.map((src, i) => (
            <motion.div
              key={i}
              className="keen-slider__slide relative flex flex-col items-center overflow-visible"
              transition={{ duration: 0.5 }}
            >
              {/* Clip between line and card */}
              <div className="relative z-20 -mb-6 flex h-[100px] w-12 justify-center">
                <Image
                  src="/clip.svg"
                  alt="Clip"
                  width={100}
                  height={100}
                  className="h-full object-contain"
                />
              </div>

              {/* Card with only image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative z-10 w-[90%] rounded-3xl border border-gray-200 bg-white p-2 shadow-xl"
              >
                <Image
                  src={src}
                  alt={`memory-${i}`}
                  width={400}
                  height={250}
                  className="mx-auto w-full rounded-2xl object-cover"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Memories;
