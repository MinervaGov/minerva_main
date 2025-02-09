"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

const StickyScrollSection = () => {
  const containerRef = useRef(null);
  const confettiTriggeredRef = useRef(false);
  const previousScrollRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"], // Changed offset to trigger at center
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (value) => {
      // Check if we're scrolling down
      const isScrollingDown = value > previousScrollRef.current;
      previousScrollRef.current = value;

      // Trigger confetti when reaching the end (value close to 1) while scrolling down
      if (value > 0.95 && !confettiTriggeredRef.current && isScrollingDown) {
        confettiTriggeredRef.current = true;
      } else if (value < 0.9) {
        // Reset the trigger when scrolling away from the end
        confettiTriggeredRef.current = false;
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const items = [
    {
      title: "Gaia",
      description:
        "Powered by a Gaia Node with a custom knowledge base having information about Arbitrum, Lido and AAVE DAOs.",
      image: "gaia.png",
    },
    {
      title: "CDP Agent Kit",
      description:
        "CDP Agent kit helps in creating custom tools and wallets tied to your Minerva Agents. Streamline your DAO's operations with tailored solutions.",
      image: "cdp.png",
    },
    {
      title: "Privy Server Wallets",
      description:
        "Managing private key via agents can be hectic, Privy's Server wallets seamlessly integrates with Agent Kit and helps in voting in Snapshot.",
      image: "privy.png",
    },
  ];

  return (
    <div className="">
      <div ref={containerRef} className="relative ">
        <div className="2xl:px-52 xl:px-20 px-5 sm:px-10 mx-auto">
          <div className="flex lg:flex-row flex-col 2xl:gap-20 relative">
            {/* Sticky section */}
            <div className="lg:sticky top-[250px] lg:h-[520px]">
              <div className="rounded-lg p-8 pl-0 h-full flex flex-col">
                <h2 className="text-4xl font-bold mb-6">How it works</h2>
                <p className="text-white text-lg">
                  Minerva leverages cutting-edge technology to streamline
                  decision-making, enhance proposal analysis, and automate
                  governance processes for DAOs.
                </p>
              </div>
            </div>
            {/* Scrolling section */}
            <div className="py-32 pt-0">
              {items.map((item, index) => {
                const padding = -0.3; // Padding to delay the start
                const itemStart = padding + index / items.length;
                const itemEnd = padding + (index + 1) / items.length;
                const opacity = useTransform(
                  scrollYProgress,
                  [itemStart, itemEnd],
                  [0, 1]
                );
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
                          className={`${
                            item.image === "gaia.png" ? "invert" : ""
                          }`}
                        />
                      </div>
                      <h3 className="text-3xl text-black font-semibold">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-xl">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyScrollSection;
