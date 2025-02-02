"use client";

import { Input } from "@heroui/react";
import { useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import ConnectWallet from "./ConnectWallet";
import { setUser, setUserUsername } from "@/redux/slice/userSlice";
import MinervaText from "./MinervaText";
import { useAccount, useDisconnect } from "wagmi";
import { usePrivy } from "@privy-io/react-auth";
import useUser from "@/hooks/useUser";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";

const SignIn = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { ready } = usePrivy();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Fetching user profile...");
  const { fetchUserProfile, initializeUser } = useUser();
  const { user } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const fetchProfile = async () => {
    setIsLoading(true);
    setMessage("Fetching user profile...");
    await fetchUserProfile();
    setIsLoading(false);
    setMessage("User profile fetched successfully");
  };

  const createUser = async () => {
    setIsLoading(true);
    setMessage("Creating user...");
    await initializeUser(username);
    setIsLoading(false);
    setMessage("User created successfully");
  };

  useEffect(() => {
    if (isConnected && ready) {
      fetchProfile();
    }
  }, [isConnected, ready]);

  return (
    <div className="max-w-sm mx-auto space-y-5">
      {(!isConnected || !ready) && (
        <>
          <MinervaText
            text={
              "Hi! I'm Minerva. I'm here to help you voice your opinion and make a difference. Connect your wallet to continue."
            }
            height={105}
          />
          <ConnectWallet />
        </>
      )}

      {isLoading && (
        <div className="text-center flex flex-col text-sm gap-10 items-center justify-center">
          <Loader2 className="animate-spin text-zinc-400" size={100} />
          <p className="bg-zinc-800 text-sm text-zinc-400 py-2 rounded-full px-4 w-fit mx-auto">
            {message}
          </p>
        </div>
      )}

      {!user && !isLoading && isConnected && (
        <div className="flex flex-col text-left gap-5">
          <MinervaText
            text={
              "Now that you're connected, let's get you a username. This will be used to identify you in the community."
            }
            height={85}
          />
          <Input
            label="Username"
            placeholder="Enter your username"
            type="text"
            variant="flat"
            description="Optional: Your unique identifier"
            value={username}
            onValueChange={setUsername}
          />

          <Button
            className="w-full text-black bg-gray-100"
            block
            onPress={createUser}
          >
            Initialize
          </Button>
          <p
            className="text-center -mt-3 text-xs text-zinc-400 underline cursor-pointer"
            onClick={() => {
              disconnect();
              dispatch(setUser(null));
            }}
          >
            Disconnect
          </p>
        </div>
      )}

      {isConnected && user && !isLoading && (
        <div className="flex flex-col text-left gap-5">
          <MinervaText
            text={`Welcome back! You can now start delegating your votes to agents or create your own. So, what should we do today?`}
            height={105}
          />

          <Button
            className="w-full text-black bg-gray-100"
            block
            onPress={() => router.push("/select-agent-type")}
          >
            Go to Dashboard
          </Button>

          <p
            className="text-center -mt-3 text-xs text-zinc-400 underline cursor-pointer"
            onClick={() => {
              disconnect();
              dispatch(setUser(null));
            }}
          >
            Disconnect
          </p>
        </div>
      )}
    </div>
  );
};

export default SignIn;
