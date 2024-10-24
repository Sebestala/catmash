"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
interface CatLikeBoxProps {
  imageUrl: string;
  catNumber: 1 | 2;
  onLike: () => void;
}

export function CatLikeBox({ imageUrl, catNumber, onLike }: CatLikeBoxProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleClick = () => {
    setIsLiked(true);
    const timeoutId = setTimeout(() => {
      onLike();
      setIsLiked(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  };

  return (
    <motion.div
      key={catNumber}
      initial={{
        opacity: 0,
        scale: 0.8,
        transform:
          catNumber === 1
            ? "translateX(-70px) translateY-(70px)"
            : "translateX(70px) translateY(-70px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        transform: "translateY(0) translateX(0)",
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
        transform:
          catNumber === 1
            ? "translateX(-70px) translateY(-70px)"
            : "translateX(70px) translateY(-70px)",
      }}
      transition={{ duration: 0.5 }}
    >
      <div
        onClick={handleClick}
        className={`flex aspect-[1.5] transform cursor-pointer flex-col items-center justify-between rounded-lg p-2 shadow-md transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl md:p-4 ${isLiked ? "bg-blue-100" : "bg-blue-50"} hover:bg-blue-50`}
      >
        <div className="relative h-full w-full overflow-hidden rounded-lg pt-[100%]">
          <Image
            src={imageUrl}
            alt={`Chat mignon ${catNumber}`}
            className={`transition-all duration-300 ease-in-out ${isLiked ? "scale-105" : ""}`}
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            priority
            unoptimized
          />
          <div
            className={`bg-navy-blue absolute inset-0 flex items-center justify-center bg-opacity-0 transition-all duration-300 ${isLiked ? "bg-opacity-20" : "hover:bg-opacity-10"}`}
          >
            <svg
              className={`h-1/4 w-1/4 transform transition-all duration-300 ${isLiked ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}
              fill="red"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <h2
          className={`mt-2 text-base font-semibold transition-all duration-300 md:mt-4 md:text-xl ${isLiked ? "text-blue-700" : "text-blue-800"}`}
        >
          Chat {catNumber}
        </h2>
      </div>
    </motion.div>
  );
}
