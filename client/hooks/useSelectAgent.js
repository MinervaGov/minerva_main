"use client";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  setAgent,
  setDecisions,
  setDelegates,
  setFollowers,
  setIsDelegating,
  setIsLoading,
  setSelectedDecision,
  setVotingPower,
} from "@/redux/slice/agentSlice";
import { useEthersSigner } from "@/lib/ethersSigner";
import daos from "@/utils/daoConfig";
import chains from "@/utils/chainConfig";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import useUser from "./useUser";

export default function useSelectAgent() {
  const dispatch = useDispatch();
  const params = useParams();
  const signer = useEthersSigner();
  const { address, isConnected, chainId } = useAccount();
  const agent = useSelector((state) => state.agent.agent);
  const user = useSelector((state) => state.user.user);
  const { getFollowedAgents } = useUser();

  const loadAgent = async () => {
    try {
      dispatch(setSelectedDecision(null));
      dispatch(setAgent(null));
      dispatch(setDecisions([]));

      dispatch(setIsLoading(true));

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/agents/get/${params.id}`
      );

      if (response.data.success) {
        dispatch(setAgent(response.data.agent));
        await loadDecisions(response.data.agent._id);
        await loadVotingPower(response.data.agent);
        await loadFollowers(response.data.agent._id);
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setIsLoading(false));
    }
  };

  const loadFollowers = async (agentId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/follow/followers/${agentId}`
      );

      if (response.data.success) {
        dispatch(setFollowers(response.data.followers));
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loadDecisions = async (agentId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/agents/decisions/${agentId}`
      );

      if (response.data.success) {
        const decisions = response.data.decisions;

        const decisionsWithProposals = await Promise.all(
          decisions.map(async (decision) => {
            const proposal = await loadProposal(decision.proposalId);
            return { ...decision, proposal };
          })
        );

        dispatch(setDecisions(decisionsWithProposals));
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loadProposal = async (proposalId) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/proposals/get/${proposalId}`
      );

      return response.data.proposal;
    } catch (e) {
      console.log(e);
    }
  };

  const loadVotingPower = async (agent) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dao/vp/${agent.daoId}/${agent.walletAddress}`
      );

      if (response.data.success) {
        dispatch(setVotingPower(response.data.votingPower));
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const loadDelegates = async (daoId, walletAddress) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dao/delegates/${daoId}/${walletAddress}`
      );

      if (response.data.success) {
        dispatch(setDelegates(response.data.delegates));
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const delegate = async (delegate, daoId, onClose) => {
    try {
      dispatch(setIsDelegating(true));

      if (!isConnected) {
        toast.error("Please connect your wallet");
        return;
      }

      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/dao/delegateData/${daoId}/${delegate}`
      );

      if (response.data.success) {
        const delegateData = response.data;

        const dao = daos.find((dao) => dao.id === daoId);

        if (!dao) {
          throw new Error("DAO not found");
        }

        const chain = chains.find((chain) => chain.id === dao.chainId);

        if (!chain) {
          throw new Error("Chain not found");
        }

        const tx = {
          to: delegateData.contractAddress,
          from: address,
          data: delegateData.delegatePayload,
          gasLimit: chain.gasLimit,
        };

        const txResponse = await signer.sendTransaction(tx);

        await txResponse.wait();

        toast.success("Delegated successfully");
        dispatch(setDelegates(agent?.walletAddress));
        onClose();
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setIsDelegating(false));
    }
  };

  const followAgent = async () => {
    try {
      if (!isConnected) {
        toast.error("Please connect your wallet");
        return;
      }

      if (!user) {
        toast.error("Please register to follow an agent");
        return;
      }

      const domain = {
        name: "minervagov.eth",
        version: "1",
        chainId: chainId,
        verifyingContract: process.env.NEXT_PUBLIC_MINERVA_GOV_ADDRESS,
      };

      const types = {
        FollowAgent: [
          { name: "walletAddress", type: "address" },
          { name: "agentName", type: "string" },
        ],
      };

      const message = {
        walletAddress: address,
        agentName: params.id,
      };

      const signature = await signer._signTypedData(domain, types, message);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/follow/follow`,
        { walletAddress: address, agentName: params.id, signature, chainId }
      );

      if (response.data.success) {
        await getFollowedAgents();
        await loadFollowers(agent._id);
        toast.success("Agent followed successfully");
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      toast.error("Error following the Agent");
      console.log(e);
    }
  };

  const unfollowAgent = async () => {
    try {
      if (!isConnected) {
        toast.error("Please connect your wallet");
        return;
      }

      if (!user) {
        toast.error("Please register to unfollow an agent");
        return;
      }

      const domain = {
        name: "minervagov.eth",
        version: "1",
        chainId: chainId,
        verifyingContract: process.env.NEXT_PUBLIC_MINERVA_GOV_ADDRESS,
      };

      const types = {
        UnfollowAgent: [
          { name: "walletAddress", type: "address" },
          { name: "agentName", type: "string" },
        ],
      };

      const message = {
        walletAddress: address,
        agentName: params.id,
      };

      const signature = await signer._signTypedData(domain, types, message);

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/follow/unfollow`,
        { walletAddress: address, agentName: params.id, signature, chainId }
      );

      if (response.data.success) {
        await getFollowedAgents();
        await loadFollowers(agent._id);
        toast.success("Agent unfollowed successfully");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.error("Error unfollowing the Agent");
      console.log(error);
    }
  };

  return {
    loadAgent,
    loadDelegates,
    delegate,
    loadFollowers,
    followAgent,
    unfollowAgent,
  };
}
