"use client";

import { createConfig } from "@privy-io/wagmi";
import { mainnet, sepolia, arbitrum } from "viem/chains";
import { http } from "wagmi";

export const config = createConfig({
  chains: [mainnet, sepolia, arbitrum],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [arbitrum.id]: http(),
  },
});
