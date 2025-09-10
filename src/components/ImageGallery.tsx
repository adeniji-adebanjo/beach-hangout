"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const IMAGES_PER_PAGE = 8;

const DragDropGallery = () => {
  const [images, setImages] = useState<{ url: string }[]>([]);
  const [page, setPage] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  // Fetch images from MongoDB
  useEffect(() => {
    const fetchImages = async () => {
      const res = await fetch("/api/images");
      let data;
      try {
        data = await res.json();
      } catch {
        data = [];
      }
      // If API returns an error object, fallback to empty array
      if (!Array.isArray(data)) {
        data = [];
      }
      setImages(data);
    };
    fetchImages();
  }, []);

  const uploadFile = useCallback(async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (data.url) {
      setImages((prev) => [{ url: data.url }, ...prev]);
    }
  }, []);

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files).filter((f) =>
      f.type.startsWith("image/")
    );
    files.forEach(uploadFile);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    Array.from(e.target.files)
      .filter((f) => f.type.startsWith("image/"))
      .forEach(uploadFile);
    e.target.value = "";
  };

  const startIndex = page * IMAGES_PER_PAGE;
  const endIndex = startIndex + IMAGES_PER_PAGE;
  const currentImages = images.slice(startIndex, endIndex);

  return (
    <section className="py-20 bg-gray-50">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-2 text-gray-900"
      >
        User Gallery
      </motion.h2>
      <p className="text-lg text-center text-gray-700 mb-8">
        Share your moments with other brethren!
      </p>
      {/* Drag & Drop */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex justify-center items-center border-4 border-dashed rounded-lg h-40 mb-8 mx-6 transition-colors ${
          isDragging
            ? "border-yellow-400 bg-yellow-50"
            : "border-gray-300 bg-white"
        }`}
      >
        <label className="cursor-pointer w-full h-full flex flex-col justify-center items-center text-gray-700 font-medium">
          Drag & Drop or Click to Upload
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </label>
      </div>

      {/* Gallery */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        <AnimatePresence>
          {currentImages.map((img, i) => (
            <motion.div
              key={img.url + i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              className="overflow-hidden rounded-2xl shadow-lg border border-gray-200 bg-white"
            >
              <Image
                src={img.url}
                alt={`uploaded-${i}`}
                width={400}
                height={400}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {images.length > IMAGES_PER_PAGE && (
        <div className="flex justify-center mt-8 gap-4">
          <button
            onClick={() => page > 0 && setPage(page - 1)}
            disabled={page === 0}
            className={`px-4 py-2 rounded-lg font-medium ${
              page === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-yellow-400 text-white hover:bg-yellow-500 transition"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() =>
              (page + 1) * IMAGES_PER_PAGE < images.length && setPage(page + 1)
            }
            disabled={(page + 1) * IMAGES_PER_PAGE >= images.length}
            className={`px-4 py-2 rounded-lg font-medium ${
              (page + 1) * IMAGES_PER_PAGE >= images.length
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-yellow-400 text-white hover:bg-yellow-500 transition"
            }`}
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default DragDropGallery;
