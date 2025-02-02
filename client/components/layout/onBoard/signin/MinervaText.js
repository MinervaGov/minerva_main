"use client";

import React from "react";
import Avatar from "boring-avatars";
import { useSelector } from "react-redux";
import { textToArray } from "@/lib/textToArray";
import CopyToClipboard from "@/components/ui/CopyToClipboard";
import Image from "next/image";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";

const MinervaText = ({ text, height }) => {
  return (
    <div className="flex gap-3" style={{ height: height }}>
      <Image
        src="/minerva/avatar.jpeg"
        alt="avatar"
        width={60}
        height={60}
        className="rounded-full h-[60px] w-[60px]"
      />

      <div className="bg-gray-800 w-full rounded-xl text-sm text-left p-3 px-4">
        <TypewriterEffect
          words={textToArray(text)}
          className="text-white text-sm sm:text-sm md:text-sm lg:text-sm font-normal text-left"
          cursorClassName="hidden"
        />
      </div>
    </div>
  );
};

export default MinervaText;
