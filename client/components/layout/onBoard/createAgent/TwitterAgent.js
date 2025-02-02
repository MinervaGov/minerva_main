"use client";

import React from "react";
import Link from "next/link";
import { LockIcon, UnlockIcon } from "lucide-react";
import { Button, Select, SelectItem, Switch } from "@heroui/react";

import SignInAvatar from "../signin/MinervaText";

const DAOList = [
  {
    id: 1,
    name: "Lido",
  },
];

const TwitterAgent = () => {
  return (
    <div className="max-w-sm mx-auto space-y-5">
      <SignInAvatar />

      <div className="space-y-3">
        <Select className="" label="DAO" placeholder="Select a DAO">
          {DAOList.map((dao) => (
            <SelectItem key={dao.id}>{dao.name}</SelectItem>
          ))}
        </Select>

        <Button fullWidth className="bg-gray-100 text-black">
          Connect To Twitter
        </Button>

        <Switch
          defaultSelected
          color="secondary"
          size="lg"
          thumbIcon={({ isSelected, className }) =>
            isSelected ? (
              <LockIcon size={14} className={className} />
            ) : (
              <UnlockIcon size={14} className={className} />
            )
          }
        >
          Private Mode
        </Switch>
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
