import React from "react";

import Logo from "../../components/ui/Logo";
import WalletCard from "../../components/ui/WalletCard";

import AgentCardList from "../../components/layout/gallery/AgentCardList";

const AgentGalleyPage = () => {
  return (
    <div className="p-6 min-h-screen">
      <nav className="flex justify-between items-center">
        <Logo />
        <WalletCard />
      </nav>

      <AgentCardList />
    </div>
  );
};

export default AgentGalleyPage;
