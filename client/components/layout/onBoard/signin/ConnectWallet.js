"use client";

import React from "react";
import Image from "next/image";
import { usePrivy } from "@privy-io/react-auth";

const ConnectWallet = () => {
  const { ready, connectWallet } = usePrivy();

  return (
    <div
      className="bg-white hover:bg-gray-50 rounded-xl flex items-center p-4 gap-4 transition-all duration-200 cursor-pointer border-3 hover:border-blue-600"
      onClick={() => {
        if (ready) {
          connectWallet();
        }
      }}
      style={{
        opacity: ready ? 1 : 0.5,
      }}
    >
      <div className="bg-gray-200 rounded-lg flex items-center justify-center p-2">
        <Image src="/icons3d/wallet.png" alt="avatar" width={40} height={40} />
      </div>

      <div className="flex flex-col text-left">
        <p className="text-black text-md font-bold">Connect Wallet</p>
        <p className="text-black/50 text-xs">
          Choose your preferred wallet to continue. <br /> Powered by Privy
        </p>
      </div>
    </div>
  );
};

export default ConnectWallet;
