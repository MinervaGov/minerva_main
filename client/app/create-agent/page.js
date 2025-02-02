import React from "react";

import PageContainer from "@/components/layout/onBoard/PageContainer";
import CreateAgent from "@/components/layout/onBoard/createAgent/CreateAgent";

const CreateAgentPage = () => {
  return (
    <PageContainer
      heading="Set Up Your Agent"
      subHeading="Choose between Twitter or Tag based agent or import an existing agent."
      paragraph="Build Your AI Ally"
    >
      <CreateAgent />
    </PageContainer>
  );
};

export default CreateAgentPage;
