import React from "react";

import AgentCard from "./AgentCard";

const AgentCardList = () => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
      <AgentCard />
      <AgentCard />
      <AgentCard />
      <AgentCard />
      <AgentCard />
      <AgentCard />
      <AgentCard />
    </section>
  );
};

export default AgentCardList;
