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
import { useDispatch, useSelector } from "react-redux";
import { usePrivy } from "@privy-io/react-auth";

import { setUser } from "@/redux/slice/userSlice";
import { useRouter } from "next/navigation";

const WalletCard = () => {
  const account = useAccount();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.user.isLoading);
  const user = useSelector((state) => state.user.user);
  const router = useRouter();

  const { disconnect } = useDisconnect();
  const { ready, connectWallet } = usePrivy();

  const walletAddress = ready ? account.address : "Loading...";

  if (isLoading) {
    return (
      <Button className="border border-gray-700 h-fit p-3 py-2 rounded-xl hover:border-gray-400">
        <p>Loading...</p>
      </Button>
    );
  }

  if (account.status === "connected" && !user) {
    return (
      <Button
        className="bg-white text-black"
        onPress={() => {
          router.push("/sign-in");
        }}
      >
        Register
      </Button>
    );
  }

  return account.status === "connected" && user ? (
    <Dropdown>
      <DropdownTrigger>
        <Button className="border border-gray-700 h-fit p-3 py-2 rounded-xl hover:border-gray-400">
          <div className="flex items-center space-x-2">
            <Avatar name={walletAddress} size={24} variant="beam" />

            <p>{ready && user.name}</p>
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
        {/* <DropdownItem key="Profile" className="" color="default">
          Your Profile
        </DropdownItem> */}
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
