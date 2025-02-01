import React from "react";

import PageContainer from "@/components/layout/onBoard/PageContainer";
import CreateAgent from "@/components/layout/onBoard/createAgent/CreateAgent";

const CreateAgentPage = () => {
  return (
    <PageContainer
      heading="Set Up Your Agent"
      subHeading="Choose your bot’s decision-making and how your bot should gather insights and vote in DAOs."
      paragraph="Build Your AI Ally"
    >
      <CreateAgent />
    </PageContainer>
  );
};

export default CreateAgentPage;
