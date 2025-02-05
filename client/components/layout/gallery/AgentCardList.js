import React from "react";

const AgentCardList = ({ children }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 max-w-7xl mx-auto">
      {children}
    </section>
  );
};

export default AgentCardList;
