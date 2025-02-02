"use client";

import React from "react";
import Link from "next/link";
import MinervaText from "../signin/MinervaText";
import { useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { Loader2 } from "lucide-react";

const CreateAgent = () => {
  const user = useSelector((state) => state.user.user);
  const { isConnected, isConnecting } = useAccount();
  const isLoading = useSelector((state) => state.user.isLoading);

  const user = useSelector((state) => state.user.user);
  const { isConnected, isConnecting } = useAccount();
  const isLoading = useSelector((state) => state.user.isLoading);

  return (
    <div className="max-w-sm mx-auto space-y-5">
      <div className="flex flex-col gap-3">
        {isConnected && user && (
          <>
            <MinervaText
              text="Choose your agent’s decision-making and how your agent should gather insights and vote in DAOs."
              height={85}
            />

            <Link
              href="/create-agent/twitter"
              className="block w-full bg-gray-100 mt-2 text-black py-2.5 rounded-xl text-sm hover:bg-gray-300 transition-colors"
            >
              Twitter
            </Link>
      <div className="flex flex-col gap-3">
        {isConnected && user && (
          <>
            <MinervaText
              text="Choose your agent’s decision-making and how your agent should gather insights and vote in DAOs."
              height={85}
            />

            <Link
              href="/create-agent/twitter"
              className="block w-full bg-gray-100 mt-2 text-black py-2.5 rounded-xl text-sm hover:bg-gray-300 transition-colors"
            >
              Twitter
            </Link>

            <Link
              href="/create-agent/tags"
              className="block w-full bg-gray-100 text-black py-2.5 rounded-xl text-sm hover:bg-gray-300 transition-colors"
            >
              Tags
            </Link>

            <Link
              href="/create-agent/import"
              className="block w-full bg-gray-100 text-black py-2.5 rounded-xl text-sm hover:bg-gray-300 transition-colors"
            >
              Import
            </Link>
          </>
        )}

        {(isLoading || isConnecting) && (
          <div className="text-center flex flex-col text-sm gap-10 items-center justify-center">
            <Loader2 className="animate-spin text-zinc-400" size={100} />
            <p className="bg-zinc-800 text-sm text-zinc-400 py-2 rounded-full px-4 w-fit mx-auto">
              Fetching your account details
            </p>
          </div>
        )}

        {(!isConnected || !user) && !isLoading && (
          <>
            <MinervaText
              text={
                "Hey, Looks like you have not initialized your account, Go back to Setup Profile."
              }
              height={85}
            />

            <Link
              href="/sign-in"
              className="block w-full bg-gray-100 mt-2 text-black py-2.5 rounded-xl text-sm hover:bg-gray-300 transition-colors"
            >
              Go Back
            </Link>
          </>
        )}
      </div>

      {isConnected && user && (
        <Link href="/select-agent-type" className="block">
          <p className="underline text-sm text-zinc-400 text-center cursor-pointer hover:text-white transition-colors">
            Go Back
          </p>
        </Link>
      )}
    </div>
  );
};

export default CreateAgent;
