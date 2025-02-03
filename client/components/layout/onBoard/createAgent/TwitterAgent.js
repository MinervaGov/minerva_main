"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Button, Input, Select, SelectItem } from "@heroui/react";

import DAOSelect from "./DAOSelect";
import PrivateModeSwitch from "./PrivateModeSwitch";

import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";
import { Loader2 } from "lucide-react";
import MinervaText from "../signin/MinervaText";
import useAgent from "@/hooks/useAgent";
import { toast } from "sonner";
import DelaySelect from "./DelaySelect";
import { setIsLoading } from "@/redux/slice/userSlice";

const TwitterAgent = () => {
  const [username, setUsername] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedDAO, setSelectedDAO] = useState(null);
  const [isValid, setIsValid] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const [delayPeriod, setDelayPeriod] = useState(0);
  const [message, setMessage] = useState("Fetching your account details");
  const [isSuccess, setIsSuccess] = useState(false);
  const dispatch = useDispatch();

  const agentName = useSelector((state) => state.setup.agentName);

  const user = useSelector((state) => state.user.user);
  const { isConnected, isConnecting } = useAccount();
  const isLoading = useSelector((state) => state.user.isLoading);
  const inputRef = useRef(null);
  const { createAgentWithTwitter } = useAgent();
  let timeout = null;

  const handleCreateAgent = async () => {
    dispatch(setIsLoading(true));
    setMessage("Creating your agent...");

    await createAgentWithTwitter(
      agentName,
      selectedDAO,
      isPrivate,
      delayPeriod,
      username,
      setIsSuccess
    );

    dispatch(setIsLoading(false));
    setMessage("Fetching your account details");
  };

  const { checkTwitterProfile } = useAgent();
  const handleUsername = (e) => {
    setUsername(e.replace(/[^a-zA-Z0-9]/g, ""));
  };

  const checkTwitter = async () => {
    const isValid = await checkTwitterProfile(username);

    if (isValid) {
      setIsValid(true);
      setIsValidating(false);
      return;
    }

    setIsValid(false);
    setIsValidating(false);
    if (username) {
      toast.error("Invalid Twitter Profile");
    }
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.addEventListener("keydown", function () {
      clearTimeout(timeout);

      timeout = setTimeout(function () {
        setIsTyping(false);
      }, 1000);

      setIsTyping(true);
    });
  }, [isConnected, user]);

  useEffect(() => {
    if (isTyping) {
      setIsValidating(true);
    } else {
      checkTwitter();
    }
  }, [isTyping, username]);

  return (
    <div className="max-w-sm mx-auto space-y-5">
      <div className="flex flex-col gap-3">
        {agentName && isConnected && user && !isSuccess && !isLoading && (
          <>
            <PrivateModeSwitch
              isSelected={isPrivate}
              setIsSelected={setIsPrivate}
            />
            <Input
              label="X Profile"
              placeholder="Enter your Username"
              type="text"
              value={username}
              onValueChange={handleUsername}
              ref={inputRef}
            />
            <DAOSelect
              selectedDAO={selectedDAO}
              setSelectedDAO={setSelectedDAO}
            />
            <DelaySelect
              delayPeriod={delayPeriod}
              setDelayPeriod={setDelayPeriod}
            />

            <Button
              className="w-full text-black bg-gray-100"
              block
              isDisabled={!selectedDAO || !isValid || isTyping || isValidating}
              onPress={handleCreateAgent}
            >
              {isTyping || isValidating ? "Checking..." : "Create Agent"}
            </Button>
          </>
        )}

        {isSuccess && !isLoading && (
          <div className="text-center flex flex-col text-sm gap-5 items-center justify-center">
            <MinervaText
              text="Congratulations! You have deployed me based on your twitter profile. Time to start delegating votes to me and watch me govern on your behalf."
              height={100}
            />

            <p className="bg-zinc-800 text-sm text-zinc-400 py-2 rounded-full px-4 w-fit mx-auto">
              Agent created successfully
            </p>

            <Link
              href={`/agents/${agentName}`}
              className="block w-full bg-gray-100 text-black py-2.5 rounded-xl text-sm hover:bg-gray-300 transition-colors"
            >
              View Agent
            </Link>
          </div>
        )}

        {(isLoading || isConnecting) && (
          <div className="text-center flex flex-col text-sm gap-10 items-center justify-center">
            <Loader2 className="animate-spin text-zinc-400" size={100} />
            <p className="bg-zinc-800 text-sm text-zinc-400 py-2 rounded-full px-4 w-fit mx-auto">
              {message}
            </p>
          </div>
        )}

        {!agentName && user && isConnected && (
          <>
            <MinervaText text="Hey, Looks like you have not assigned a name to your agent, Go back to Setup Your Agent." />

            <Link
              href="/create-agent"
              className="block w-full bg-gray-100 mt-2 text-black py-2.5 rounded-xl text-sm hover:bg-gray-300 transition-colors"
            >
              Go Back
            </Link>
          </>
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

      {agentName && isConnected && user && !isSuccess && !isLoading && (
        <Link href="/create-agent" className="block">
          <p className="underline text-sm text-zinc-400 text-center cursor-pointer hover:text-white transition-colors">
            Go Back
          </p>
        </Link>
      )}
    </div>
  );
};

export default TwitterAgent;
