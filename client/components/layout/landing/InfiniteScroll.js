"use client";

import React from "react";
import InfiniteMovingWords from "./InfiniteMovingWords";

const InfiniteScroll = () => {
  return (
    <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingWords
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
};

export default InfiniteScroll;

const testimonials = [
  "MAKE YOUR VOICE HEARD",
  "MAKE YOUR VOICE HEARD",
  "MAKE YOUR VOICE HEARD",
  "MAKE YOUR VOICE HEARD",
  "MAKE YOUR VOICE HEARD",
  "MAKE YOUR VOICE HEARD",
  "MAKE YOUR VOICE HEARD",
  "MAKE YOUR VOICE HEARD",
  "MAKE YOUR VOICE HEARD",
  "MAKE YOUR VOICE HEARD",
  "MAKE YOUR VOICE HEARD",
  "MAKE YOUR VOICE HEARD",
  "MAKE YOUR VOICE HEARD",
  "MAKE YOUR VOICE HEARD",
  "MAKE YOUR VOICE HEARD",
  "MAKE YOUR VOICE HEARD",
];
