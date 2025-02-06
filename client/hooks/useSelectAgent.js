"use client";

import { useDispatch } from "react-redux";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  setAgent,
  setDecisions,
  setIsLoading,
  setSelectedDecision,
} from "@/redux/slice/agentSlice";

export default function useSelectAgent() {
  const dispatch = useDispatch();
  const params = useParams();

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

  return {
    loadAgent,
  };
}
