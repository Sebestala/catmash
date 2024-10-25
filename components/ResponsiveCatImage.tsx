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
      className="relative h-8 w-8 md:h-10 md:w-10 xl:h-14 xl:w-14"
      variants={bounceVariants}
      initial="initial"
      animate="animate"
    >
      <Image
        src="/cat_topBar.webp"
        alt="Happy Cat"
        style={{ objectFit: "cover" }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        fill
      />
    </motion.div>
  );
}
