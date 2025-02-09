"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";

export default function SmallFeatures({ text }) {
  const features = Array(12).fill(text);

  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollWidth = scrollRef.current.scrollWidth;
    const animationDuration = 30000;

    const animation = anime({
      targets: scrollRef.current,
      translateX: [-scrollWidth / 2, 0],
      duration: animationDuration,
      easing: "linear",
      loop: true,
    });

    return () => animation.pause();
  }, []);

  return (
    <div className="w-full bg-white overflow-hidden mt-36">
      <div ref={scrollRef} className="flex whitespace-nowrap">
        {[...features, ...features].map((feature, index) => (
          <div
            key={index}
            className="text-black text-2xl font-bold flex gap-5 items-center mr-5"
          >
            {feature}
            <span>-</span>
          </div>
        ))}
      </div>
    </div>
  );
}
