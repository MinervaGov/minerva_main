"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@heroui/react";

import DAOSelect from "./DAOSelect";
import PrivateModeSwitch from "./PrivateModeSwitch";

const TwitterAgent = () => {
  const [username, setUsername] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedDAO, setSelectedDAO] = useState(null);

  return (
    <div className="max-w-sm mx-auto space-y-5">
      <div className="space-y-3">
        <PrivateModeSwitch
          isSelected={isPrivate}
          setIsSelected={setIsPrivate}
        />
        <Input
          label="X Profile"
          placeholder="Enter your Username"
          type="text"
          value={username}
          onValueChange={setUsername}
        />
        <DAOSelect selectedDAO={selectedDAO} setSelectedDAO={setSelectedDAO} />
      </div>

      <Link href="/create-agent" className="block">
        <p className="underline text-sm text-zinc-400 text-center cursor-pointer hover:text-white transition-colors">
          Go Back
        </p>
      </Link>
    </div>
  );
};

export default TwitterAgent;
