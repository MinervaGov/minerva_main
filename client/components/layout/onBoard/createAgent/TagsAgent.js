"use client";

import Link from "next/link";
import { toast } from "sonner";
import React, { useState } from "react";
import { Button, Select, SelectItem } from "@heroui/react";

import tagList from "../../../../utils/tagList";

import DAOSelect from "./DAOSelect";
import PrivateModeSwitch from "./PrivateModeSwitch";

const TagesAgent = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedDAO, setSelectedDAO] = useState(null);
  const [selectedTags, setSelectedTags] = useState(new Set([]));

  const handleSelectionChange = (newSelectedTags) => {
    if (newSelectedTags.size > 5) {
      toast.error("You cannot select more than 5 tags.");
      return;
    }

    if (newSelectedTags.size < 2) {
      setSelectedTags(newSelectedTags);
      toast.error("You must select at least 2 tags.");
      return;
    }

    setSelectedTags(newSelectedTags);
  };

  return (
    <div className="max-w-sm mx-auto space-y-5">
      <div className="space-y-3">
        <PrivateModeSwitch
          isSelected={isPrivate}
          setIsSelected={setIsPrivate}
        />

        <Select
          label="Bot Tags"
          placeholder="Select Tags for your Bot"
          selectionMode="multiple"
          selectedKeys={selectedTags}
          onSelectionChange={handleSelectionChange}
        >
          {tagList.map((tag, index) => (
            <SelectItem key={index} value={tag}>
              {tag}
            </SelectItem>
          ))}
        </Select>

        <DAOSelect selectedDAO={selectedDAO} setSelectedDAO={setSelectedDAO} />

        <Button fullWidth className="bg-gray-100 text-black">
          Create Agent
        </Button>
      </div>

      <Link href="/create-agent" className="block">
        <p className="underline text-sm text-zinc-400 text-center cursor-pointer hover:text-white transition-colors">
          Go Back
        </p>
      </Link>
    </div>
  );
};

export default TagesAgent;
