import React from "react";

import Logo from "../../components/ui/Logo";
import WalletCard from "../../components/ui/WalletCard";

import UserAgents from "../../components/layout/gallery/UserAgents";
import CreateAgentButton from "../../components/ui/CreateAgentButton";
const AgentGalleyPage = () => {
  return (
    <div className="min-h-screen px-6 py-7">
      <nav className="flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-2">
          <CreateAgentButton />
          <WalletCard />
        </div>
      </nav>

      <div className="mt-7">
        <UserAgents />
      </div>
    </div>
  );
};

export default AgentGalleyPage;
