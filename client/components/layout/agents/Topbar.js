"use client";

import WalletCard from "@/components/ui/WalletCard";
import { Check, Loader2, Smile, UserPlus, Users, Vote } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import daos from "@/utils/daoConfig";

export default function TopBar() {
  const agent = useSelector((state) => state.agent.agent);
  const isLoading = useSelector((state) => state.agent.isLoading);
  const dao = agent ? daos.find((dao) => dao.id === agent.daoId) : null;
  const isFollowing = false;
  return (
    <div className="w-full border-b gap-7 border-gray-700 flex flex-col px-6 py-8 pb-7">
      <div className="flex justify-between items-start">
        <div className="flex gap-2 items-center">
          <Image
            src="/minerva.svg"
            alt="logo"
            width={28}
            height={28}
            className="rounded-full"
          />
          <h1 className="text-2xl font-bold">Minerva</h1>

          <div className="mx-2 border-l h-8 border-gray-700"></div>

          <div
            className="flex relative hover:cursor-pointer hover:text-blue-300"
            onClick={() => {
              if (agent) {
                window.open(
                  `https://app.ens.domains/${agent.name}.minervagov.eth`,
                  "_blank"
                );
              }
            }}
          >
            {isLoading && !agent && (
              <Loader2 className="w-5 h-5 animate-spin" />
            )}
            {agent && (
              <>
                {" "}
                <p className="font-bold text-2xl">{agent.name}</p>
                <p className="text-xs text-gray-400 absolute -bottom-4 right-0">
                  .minervagov.eth
                </p>
                <Image
                  src="/dao/ens-logo.png"
                  alt="logo"
                  width={20}
                  height={20}
                  className="rounded-full absolute -right-7 top-2 grayscale"
                />
              </>
            )}
          </div>
        </div>
        <WalletCard />
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex gap-5 items-center ml-1 text-sm text-gray-300">
          <div className="flex gap-2 items-center ">
            <Vote className="w-5 h-5" />
            <p className="font-bold">100000</p>
            <p className="">Voting Power</p>
          </div>

          <div className="flex gap-2 items-center">
            <Users className="w-5 h-5" />
            <p className="font-bold">3</p>
            <p className="">members</p>
          </div>

          <div className="flex gap-2 items-center">
            <Smile className="w-5 h-5" />
            <p className="font-bold">5</p>
            <p className="">Followers</p>
          </div>
        </div>
        <div className="flex gap-4 items-center text-sm">
          <div className="flex gap-2 items-center">
            <p>DAO:</p>
            {isLoading && !dao && <Loader2 className="w-5 h-5 animate-spin" />}
            {dao && (
              <div className="flex items-center gap-2 px-3 p-1 bg-zinc-700 rounded-full">
                <Image
                  src={dao.logo}
                  alt="logo"
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <p>{dao.name}</p>
              </div>
            )}
          </div>

          {!isFollowing && (
            <div className="flex gap-2 items-center border border-gray-700 rounded-lg cursor-pointer px-3 py-1 hover:border-gray-600">
              <p>Follow</p>
            </div>
          )}

          {isFollowing && (
            <div className="flex gap-2 items-center opacity-70 border border-gray-700 rounded-lg cursor-pointer px-3 py-1 hover:border-gray-600">
              <Check className="w-5 h-5" />
              <p>Following</p>
            </div>
          )}

          <div className="flex gap-2 items-center text-blue-300 cursor-pointer hover:text-blue-400">
            <UserPlus className="w-5 h-5" />
            <p>Delegate</p>
          </div>
        </div>
      </div>
    </div>
  );
}
