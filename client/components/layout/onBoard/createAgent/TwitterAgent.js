"use client";

import React from "react";
import Link from "next/link";
import { LockIcon, UnlockIcon } from "lucide-react";
import { Button, Select, SelectItem, Switch, cn } from "@heroui/react";

const DAOList = [
  {
    id: 1,
    name: "Lido",
  },
  {
    id: 2,
    name: "Arbitrum",
  },
  {
    id: 3,
    name: "Aave",
  },
];

const TwitterAgent = () => {
  return (
    <div className="max-w-sm mx-auto space-y-5">
      <div className="space-y-3">
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
          classNames={{
            base: cn(
              "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
              "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
              "data-[selected=true]:border-purple-500/50"
            ),
            thumb: cn(
              "w-6 h-6 border-2 shadow-lg",
              "group-data-[selected=true]:ms-6",
              "group-data-[pressed=true]:w-7",
              "group-data-[selected]:group-data-[pressed]:ms-4"
            ),
          }}
        >
          <div className="flex flex-col gap-1 text-left">
            <p className="text-medium">Private Mode</p>
            <p className="text-tiny text-default-400">
              This will make your agent private and only accessible by you.
            </p>
          </div>
        </Switch>

        <Select className="" label="DAO" placeholder="Select a DAO">
          {DAOList.map((dao) => (
            <SelectItem key={dao.id}>{dao.name}</SelectItem>
          ))}
        </Select>

        <Button fullWidth className="bg-gray-100 text-black font-bold">
          Connect To Twitter
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

export default TwitterAgent;
