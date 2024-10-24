"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function ResponsiveCatImage() {
  const bounceVariants = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.2, 0.9, 1.1, 1],
      transition: {
        duration: 0.6,
        times: [0, 0.2, 0.4, 0.6, 1],
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 lg:h-16 lg:w-16"
      variants={bounceVariants}
      initial="initial"
      animate="animate"
    >
      <Image
        src="/cat_topBar.webp"
        alt="Happy Cat"
        style={{ objectFit: "cover" }}
        fill
        priority
      />
    </motion.div>
  );
}
