"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const texts = ["הפרת זכויות יוצרים?", "לשון הרע?", "הוצאת דיבה?"];

export function ChangingHeroText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % texts.length);
    }, 3000); // Change text every 2 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 flex flex-wrap justify-center items-center gap-x-2 rtl">
        <AnimatePresence mode="wait">
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            {texts[index]}
          </motion.span>
        </AnimatePresence>
        <span className="inline-block text-primary whitespace-nowrap">
          תגידו די!
        </span>
      </h1>
    </div>
  );
}
