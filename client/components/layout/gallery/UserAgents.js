"use client";

import React from "react";
import { useSelector } from "react-redux";
import AgentGroup from "./AgentGroup";

const UserAgents = () => {
  const myAgents = useSelector((state) => state.gallery.myAgents);
  const allAgents = useSelector((state) => state.gallery.allAgents);
  const user = useSelector((state) => state.user.user);

  return (
    <div className="bg-zinc-800 rounded-lg border border-zinc-700 overflow-hidden">
      {user && myAgents.length > 0 && (
        <AgentGroup title="Your Agents" agents={myAgents} />
      )}
      <AgentGroup title="All Agents" agents={allAgents} />
    </div>
  );
};

export default UserAgents;
