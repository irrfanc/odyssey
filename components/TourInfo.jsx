"use client";

import { motion } from "framer-motion";

const TourInfo = ({ tour }) => {
  const { title, description, stops } = tour;

  return (
    <div className="relative mx-auto max-w-4xl p-8 sm:p-12 bg-base-100 text-base-content rounded-lg shadow-lg border border-base-200">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-3xl sm:text-4xl font-medium text-primary mb-4">
          {title}
        </h1>
        <p className="text-base sm:text-lg leading-relaxed mb-8">
          {description}
        </p>
      </motion.div>

      {/* Stops List */}
      <ul className="space-y-4">
        {stops.map((stop, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="p-5 bg-base-200 rounded-lg hover:bg-base-300 transition-colors cursor-pointer border border-base-300"
          >
            <p className="text-sm sm:text-base">{stop}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  );
};

export default TourInfo;