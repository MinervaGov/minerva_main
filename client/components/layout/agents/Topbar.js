"use client";

import WalletCard from "@/components/ui/WalletCard";
import { Check, Loader2, Users, Vote, X } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import daos from "@/utils/daoConfig";
import DelegateButton from "./DelegateButton";
import useSelectAgent from "@/hooks/useSelectAgent";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const agent = useSelector((state) => state.agent.agent);
  const isLoading = useSelector((state) => state.agent.isLoading);
  const dao = agent ? daos.find((dao) => dao.id === agent.daoId) : null;
  const votingPower = useSelector((state) => state.agent.votingPower);
  const router = useRouter();
  const followers = useSelector((state) => state.agent.followers);
  const { followAgent, unfollowAgent } = useSelectAgent();

  const followedAgents = useSelector((state) => state.user.followedAgents);
  const isFollowing =
    followedAgents &&
    agent &&
    followedAgents.some((followedAgent) => followedAgent._id === agent._id);

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
            className="flex relative hover:cursor-pointer hover:text-blue-300 grayscale hover:grayscale-0"
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
                <p className="text-xs text-gray-400 absolute -bottom-4 left-0">
                  .minervagov.eth
                </p>
                <Image
                  src="/dao/ens-logo.png"
                  alt="logo"
                  width={20}
                  height={20}
                  className="rounded-full absolute -right-7 top-2"
                />
              </>
            )}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <WalletCard />
          <Button
            onPress={() => {
              router.push("/agent-gallery");
            }}
            className="bg-transparent text-white border border-white/50 hover:bg-white/10"
          >
            <div className="flex items-center gap-2">
              <p>Agent Gallery</p>
            </div>
          </Button>
        </div>
      </div>

      <div className="flex items-center justify-between w-full">
        <div className="flex gap-5 items-center ml-1 text-sm text-gray-300">
          <div className="flex gap-2 items-center ">
            <Vote className="w-5 h-5" />
            <p className="font-bold">
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {!isLoading && (votingPower ? votingPower.toString() : "0")}
            </p>
            <p className="">Voting Power</p>
          </div>

          <div className="flex gap-2 items-center">
            <Users className="w-5 h-5" />
            <p className="font-bold">{followers ? followers : 0}</p>
            <p className="">Followers</p>
          </div>

          {/* <div className="flex gap-2 items-center">
            <Smile className="w-5 h-5" />
            <p className="font-bold">5</p>
            <p className="">Followers</p>
          </div> */}
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
            <div
              className="flex gap-2 items-center border border-gray-700 rounded-lg cursor-pointer px-3 py-1 hover:border-gray-600"
              onClick={() => {
                followAgent();
              }}
            >
              <p>Follow</p>
            </div>
          )}

          {isFollowing && (
            <div
              className="flex gap-2 items-center opacity-70 border group w-28 hover:border-red-600 border-gray-700 rounded-lg cursor-pointer px-3 py-1"
              onClick={() => {
                unfollowAgent();
              }}
            >
              <Check className="w-5 h-5 group-hover:hidden" />
              <X className="w-4 h-4 group-hover:block hidden text-red-400" />
              <p className="group-hover:hidden">Following</p>
              <p className="hidden group-hover:block text-red-400">Unfollow</p>
            </div>
          )}

          <DelegateButton />
        </div>
      </div>
    </div>
  );
}
