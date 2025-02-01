"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import Link from "next/link";

const ConnectWallet = () => {
  const [connected, setConnected] = useState(false);

  const handleConnect = () => {
    setConnected(true);
  };

  return (
    <div>
      {connected ? (
        <Link href="/select-agent-type" className="link-btn">
          Continue
        </Link>
      ) : (
        <>
          <Button
            className="w-full text-black bg-gray-100"
            block
            onPress={handleConnect}
          >
            Connect Wallet
          </Button>
        </>
      )}
    </div>
  );
};

export default ConnectWallet;
