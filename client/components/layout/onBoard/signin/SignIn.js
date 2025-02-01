"use client";

import { Input } from "@heroui/react";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";

import SignInAvatar from "./SignInAvatar";
import ConnectWallet from "./ConnectWallet";

import { setUserUsername } from "@/redux/slice/userSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(setUserUsername(username));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [username]);

  return (
    <div className="max-w-sm mx-auto space-y-5">
      <SignInAvatar username={username} />

      <div className="space-y-3 text-left">
        <Input
          label="Username"
          placeholder="Enter your username"
          type="text"
          variant="flat"
          description="Optional: Your unique identifier"
          value={username}
          onValueChange={setUsername}
        />

        <ConnectWallet />
      </div>
    </div>
  );
};

export default SignIn;
