"use client";

import useSelectAgent from "@/hooks/useSelectAgent";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function AgentProvider({ children }) {
  const { loadAgent, loadDelegates } = useSelectAgent();
  const user = useSelector((state) => state.user.user);
  const agent = useSelector((state) => state.agent.agent);

  useEffect(() => {
    loadAgent();
  }, []);

  useEffect(() => {
    if (agent && user) {
      loadDelegates(agent.daoId, user.walletAddress);
    }
  }, [agent, user]);

  return <div>{children}</div>;
}
