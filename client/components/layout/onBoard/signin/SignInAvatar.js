"use client";

import React from "react";
import Avatar from "boring-avatars";
import { useSelector } from "react-redux";

import CopyToClipboard from "@/components/ui/CopyToClipboard";

const SignInAvatar = ({ username }) => {
  const reduxUsername = useSelector((state) => state.user.username);
  const displayUsername = username || reduxUsername || "Minerva";
  console.log(displayUsername);

  return (
    <div>
      <Avatar
        size={50}
        name={displayUsername || "Minerva"}
        variant="beam"
        className="mx-auto"
      />

      <div className="text-sm">
        <p>{displayUsername === "" ? "Minerva" : displayUsername}</p>

        <div className="flex items-center justify-center text-zinc-400 space-x-1.5">
          <p>minervagov.eth</p>
          <CopyToClipboard text="minervagov.eth" iconSize={14} />
        </div>
      </div>
    </div>
  );
};

export default SignInAvatar;
