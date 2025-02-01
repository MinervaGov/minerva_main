"use client";

import React from "react";
import Avatar from "boring-avatars";

import shortenAddress from "@/utils/shortenAddress";

const FullWalletAddress = ({ size = "text-base", walletAddress }) => {
  return <p className={`text-gray-100 pr-2 ${size}`}>{walletAddress}</p>;
};

const ShortWalletAddress = ({ size = "text-base", walletAddress }) => {
  if (!walletAddress) return null;

  return (
    <p className={`text-gray-100 pr-2 ${size}`}>
      {shortenAddress(walletAddress)}
    </p>
  );
};

const WalletAddressWithProfile = ({
  avatarSize = 28,
  size = "text-base",
  walletAddress,
}) => {
  return (
    <div className="flex items-center space-x-2">
      <Avatar name={walletAddress} size={avatarSize} variant="beam" />
      <ShortWalletAddress walletAddress={walletAddress} size={size} />
    </div>
  );
};

export { FullWalletAddress, ShortWalletAddress, WalletAddressWithProfile };
