"use client";

import React, { useEffect, useState } from "react";
import AgentCardList from "./AgentCardList";

import useAgent from "@/hooks/useAgent";

const UserAgents = () => {
  const [agents, setAgents] = useState([]);

  const { fetchUserAllAgents } = useAgent();

  const getAgents = async () => {
    const agents = await fetchUserAllAgents();
    setAgents(agents);
    console.log(agents);
  };

  useEffect(() => {
    getAgents();
  }, []);

  return (
    <section className="bg-white/5 p-4 rounded-xl space-y-5">
      <h1 className="text-3xl font-bold text-gray-100 ml-4 mt-4">
        Your Agents
      </h1>

      {agents && agents.length > 0 ? (
        <AgentCardList>Hi</AgentCardList>
      ) : (
        <p className="text-gray-400 text-lg ml-4 mt-4">No agents found.</p>
      )}
    </section>
  );
};

export default UserAgents;
