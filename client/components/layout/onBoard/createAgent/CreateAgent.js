"use client";

import React from "react";
import Link from "next/link";
import MinervaText from "../signin/MinervaText";
import { useSelector, useDispatch } from "react-redux";
import { useAccount } from "wagmi";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button, Input } from "@heroui/react";
import { setAgentName } from "@/redux/slice/setupSlice";
import useAgent from "@/hooks/useAgent";
import { useRef, useEffect } from "react";
import { toast } from "sonner";

const CreateAgent = () => {
  const user = useSelector((state) => state.user.user);
  const { isConnected, isConnecting } = useAccount();
  const isLoading = useSelector((state) => state.user.isLoading);
  const [step, setStep] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const [isValidating, setIsValidating] = useState(false);
  const { isValidAgentName } = useAgent();
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef(null);
  let timeout = null;

  const agentName = useSelector((state) => state.setup.agentName);
  const dispatch = useDispatch();

  const handleAgentName = (e) => {
    dispatch(setAgentName(e.replace(/[^a-zA-Z0-9]/g, "")));
  };

  const checkAgentName = async () => {
    const isValid = await isValidAgentName(agentName);

    if (isValid) {
      setIsValid(true);
      setIsValidating(false);
      toast.error("Agent name is taken, please try another name.");
      return;
    }

    setIsValid(false);
    setIsValidating(false);
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
      checkAgentName();
    }
  }, [isTyping, agentName]);

  return (
    <div className="max-w-sm mx-auto space-y-5">
      <div className="flex flex-col gap-3">
        {isConnected && user && step === 0 && (
          <>
            <MinervaText
              text="Assign me a name of your choice. This will be used to identify me in the community."
              height={85}
            />

            <div className="flex flex-col gap-1">
              <Input
                label="Agent Name"
                placeholder="Enter your Agent Name"
                type="text"
                value={agentName}
                onValueChange={handleAgentName}
                ref={inputRef}
              />
              <p className="text-sm text-zinc-400 text-right font-bold">
                .minervagov.eth
              </p>
            </div>

            <Button
              className="w-full text-black bg-gray-100"
              block
              isDisabled={!agentName || isValid || isValidating || isTyping}
              onPress={() => setStep(1)}
            >
              {isTyping || isValidating ? "Checking..." : "Next"}
            </Button>
          </>
        )}
        {isConnected && user && step === 1 && (
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
              href="/agent-gallery"
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
