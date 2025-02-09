"use client";

import { motion, useTransform } from "framer-motion";
import Image from "next/image";

export default function ScrollItem({ items, item, index, scrollYProgress }) {
  const padding = -0.3; // Padding to delay the start
  const itemStart = padding + index / items.length;
  const itemEnd = padding + (index + 1) / items.length;
  const opacity = useTransform(scrollYProgress, [itemStart, itemEnd], [0, 1]);
  return (
    <motion.div
      key={index}
      style={{ opacity }}
      className="rounded-lg py-8 lg:pl-16"
    >
      <div className="flex flex-col gap-y-4 bg-white shadow-sm p-7 rounded-3xl">
        <div className="my-2 h-32 w-32 bg-black rounded-xl flex items-center justify-center">
          <Image
            src={"/landing/" + item.image}
            width={50}
            height={50}
            alt={item.title}
            className={`${item.image === "gaia.png" ? "invert" : ""}`}
          />
        </div>
        <h3 className="text-3xl text-black font-semibold">{item.title}</h3>
        <p className="text-gray-600 text-xl">{item.description}</p>
      </div>
    </motion.div>
  );
}
