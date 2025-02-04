"use client";

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownItem,
  DropdownMenu,
} from "@heroui/react";
import React from "react";
import Avatar from "boring-avatars";
import { useAccount, useDisconnect } from "wagmi";
import { useDispatch } from "react-redux";
import { usePrivy } from "@privy-io/react-auth";

import shortenAddress from "../../utils/shortenAddress";
import { setUser } from "@/redux/slice/userSlice";

const WalletCard = () => {
  const account = useAccount();
  const dispatch = useDispatch();

  const { disconnect } = useDisconnect();
  const { ready, connectWallet } = usePrivy();

  const walletAddress = ready ? account.address : "Loading...";

  return account.status === "connected" ? (
    <Dropdown>
      <DropdownTrigger>
        <Button className="border border-gray-700 h-fit p-1.5 rounded-full hover:border-gray-400">
          <div className="flex items-center space-x-2">
            <Avatar name={walletAddress} size={30} variant="beam" />

            <p>{ready ? shortenAddress(walletAddress) : walletAddress}</p>
          </div>
        </Button>
      </DropdownTrigger>

      <DropdownMenu
        aria-label="Static Actions"
        onAction={(key) => {
          if (key === "disconnect") {
            disconnect();
            dispatch(setUser(null));
          }
        }}
      >
        <DropdownItem key="disconnect" className="text-danger" color="danger">
          Disconnect
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ) : (
    <Button
      className="bg-white text-black"
      onPress={() => {
        if (ready) {
          connectWallet();
        }
      }}
    >
      Connect Wallet
    </Button>
  );
};

export default WalletCard;
