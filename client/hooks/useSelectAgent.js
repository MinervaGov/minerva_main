"use client";

import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  setAgent,
  setDecisions,
  setDelegates,
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

export default function useSelectAgent() {
  const dispatch = useDispatch();
  const params = useParams();
  const signer = useEthersSigner();
  const { address, isConnected } = useAccount();
  const agent = useSelector((state) => state.agent.agent);

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
      } else {
        throw new Error(response.data.message);
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setIsLoading(false));
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

  return {
    loadAgent,
    loadDelegates,
    delegate,
  };
}
