import React from "react";

import Logo from "../../components/ui/Logo";
import WalletCard from "../../components/ui/WalletCard";

import UserAgents from "../../components/layout/gallery/UserAgents";

const AgentGalleyPage = () => {
  return (
    <div className="p-6 min-h-screen">
      <nav className="flex justify-between items-center">
        <Logo />
        <WalletCard />
      </nav>

      <div className="space-y-8 mt-8">
        <UserAgents />

        {/* <section className="bg-white/5 p-4 rounded-xl space-y-5">
          <h1 className="text-3xl font-bold text-gray-100 ml-4 mt-4">
            Public Agents
          </h1>

          <AgentCardList />
        </section> */}
      </div>
    </div>
  );
};

export default AgentGalleyPage;
