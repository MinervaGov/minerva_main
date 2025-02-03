"use client";

import { useEthersSigner } from "@/lib/ethersSigner";
import tagList from "@/utils/tagList";
import axios from "axios";
import { toast } from "sonner";
import { useAccount } from "wagmi";

export default function useAgent() {
  const { address, chainId } = useAccount();
  const signer = useEthersSigner();

  const checkTwitterProfile = async (username) => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/agents/check-twitter-profile?twitterId=${username}`
    );

    return response.data.success;
  };

  const isValidAgentName = async (agentName) => {
    if (agentName.length < 3) {
      return false;
    }

    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/agents/get/${agentName}`
    );

    return response.data.success;
  };

  const createAgentWithTwitter = async (
    agentName,
    daoId,
    visibility,
    delayPeriod,
    twitterId,
    setIsSuccess
  ) => {
    try {
      const domains = {
        name: "minervagov.eth",
        version: "1",
        chainId: chainId,
        verifyingContract: process.env.NEXT_PUBLIC_MINERVA_GOV_ADDRESS,
      };

      const types = {
        NewAgent: [
          { name: "name", type: "string" },
          { name: "daoId", type: "string" },
          { name: "profileType", type: "string" },
          { name: "visibility", type: "bool" },
          { name: "delayPeriod", type: "uint256" },
          { name: "walletAddress", type: "address" },
        ],
      };

      const message = {
        name: agentName,
        daoId: daoId,
        profileType: "twitter",
        visibility: visibility,
        delayPeriod: delayPeriod,
        walletAddress: address,
      };

      const signature = await signer._signTypedData(domains, types, message);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/agents/create`,
        {
          name: agentName,
          daoId: daoId,
          profileType: "twitter",
          visibility: visibility,
          delayPeriod: delayPeriod,
          twitterId: twitterId,
          walletAddress: address,
          chainId: chainId,
          signature: signature,
        }
      );

      if (response.data.success) {
        setIsSuccess(true);
        toast.success("Agent created successfully");
      } else {
        setIsSuccess(false);
        console.log(response.data);
        toast.error("Failed to create agent");
      }
    } catch (error) {
      console.log(error);
      setIsSuccess(false);
    }
  };

  const createAgentWithTags = async (
    agentName,
    daoId,
    visibility,
    delayPeriod,
    tags,
    setIsSuccess
  ) => {
    try {
      const domains = {
        name: "minervagov.eth",
        version: "1",
        chainId: chainId,
        verifyingContract: process.env.NEXT_PUBLIC_MINERVA_GOV_ADDRESS,
      };

      const types = {
        NewAgent: [
          { name: "name", type: "string" },
          { name: "daoId", type: "string" },
          { name: "profileType", type: "string" },
          { name: "visibility", type: "bool" },
          { name: "delayPeriod", type: "uint256" },
          { name: "walletAddress", type: "address" },
        ],
      };

      const message = {
        name: agentName,
        daoId: daoId,
        profileType: "tags",
        visibility: visibility,
        delayPeriod: delayPeriod,
        walletAddress: address,
      };

      const signature = await signer._signTypedData(domains, types, message);

      let tagsArray = [];

      tags.forEach((tag) => {
        tagsArray.push(tagList[tag]);
      });

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/agents/create`,
        {
          name: agentName,
          daoId: daoId,
          profileType: "tags",
          visibility: visibility,
          delayPeriod: delayPeriod,
          tags: tagsArray,
          walletAddress: address,
          chainId: chainId,
          signature: signature,
        }
      );

      if (response.data.success) {
        setIsSuccess(true);
        toast.success("Agent created successfully");
      } else {
        setIsSuccess(false);
        console.log(response.data);
        toast.error("Failed to create agent");
      }
    } catch (error) {
      console.log(error);
      setIsSuccess(false);
    }
  };

  return {
    checkTwitterProfile,
    isValidAgentName,
    createAgentWithTwitter,
    createAgentWithTags,
  };
}
