"use client";

import Link from "next/link";
import { toast } from "sonner";
import React, { useState } from "react";
import { Button, Select, SelectItem } from "@heroui/react";

import tagList from "../../../../utils/tagList";

import DAOSelect from "./DAOSelect";
import PrivateModeSwitch from "./PrivateModeSwitch";
import DelaySelect from "./DelaySelect";
import { useDispatch, useSelector } from "react-redux";
import { useAccount } from "wagmi";
import MinervaText from "../signin/MinervaText";
import { Loader2 } from "lucide-react";
import useAgent from "@/hooks/useAgent";
import { setIsLoading } from "@/redux/slice/userSlice";

const TagesAgent = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const [selectedDAO, setSelectedDAO] = useState(null);
  const [selectedTags, setSelectedTags] = useState(new Set([]));
  const [delayPeriod, setDelayPeriod] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [message, setMessage] = useState("Fetching your account details");

  const dispatch = useDispatch();

  const agentName = useSelector((state) => state.setup.agentName);

  const user = useSelector((state) => state.user.user);
  const { isConnected, isConnecting } = useAccount();
  const isLoading = useSelector((state) => state.user.isLoading);
  const { createAgentWithTags } = useAgent();

  const handleCreateAgent = async () => {
    dispatch(setIsLoading(true));
    setMessage("Creating your agent...");

    await createAgentWithTags(
      agentName,
      selectedDAO,
      isPrivate,
      delayPeriod,
      selectedTags,
      setIsSuccess
    );

    dispatch(setIsLoading(false));
    setMessage("Fetching your account details");
  };

  const handleSelectionChange = (newSelectedTags) => {
    if (newSelectedTags.size > 5) {
      toast.error("You cannot select more than 5 tags.");
      return;
    }

    if (newSelectedTags.size < 2) {
      setSelectedTags(newSelectedTags);
      toast.error("You must select at least 2 tags.");
      return;
    }

    setSelectedTags(newSelectedTags);
  };

  return (
    <div className="max-w-sm mx-auto space-y-5">
      <div className=" flex flex-col gap-3">
        {agentName && isConnected && user && !isSuccess && !isLoading && (
          <>
            <PrivateModeSwitch
              isSelected={isPrivate}
              setIsSelected={setIsPrivate}
            />

            <Select
              label="Bot Tags"
              placeholder="Select Tags for your Bot"
              selectionMode="multiple"
              selectedKeys={selectedTags}
              onSelectionChange={handleSelectionChange}
            >
              {tagList.map((tag, index) => (
                <SelectItem key={index} value={tag}>
                  {tag}
                </SelectItem>
              ))}
            </Select>

            <DAOSelect
              selectedDAO={selectedDAO}
              setSelectedDAO={setSelectedDAO}
            />

            <DelaySelect
              delayPeriod={delayPeriod}
              setDelayPeriod={setDelayPeriod}
            />

            <Button
              fullWidth
              className="bg-gray-100 text-black"
              isDisabled={
                !selectedDAO ||
                selectedTags.size < 2 ||
                selectedDAO.size > 5 ||
                delayPeriod === 0
              }
              onPress={handleCreateAgent}
            >
              Create Agent
            </Button>
          </>
        )}

        {isSuccess && !isLoading && (
          <div className="text-center flex flex-col text-sm gap-5 items-center justify-center">
            <MinervaText
              text="Congratulations! You have deployed me based on your chosen tags. Time to start delegating votes to me and watch me govern on your behalf."
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

export default TagesAgent;
