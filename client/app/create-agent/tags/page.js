import React from "react";

import PageContainer from "@/components/layout/onBoard/PageContainer";
import TagsAgent from "@/components/layout/onBoard/createAgent/TagsAgent";

const CreateAgentPage = () => {
  return (
    <PageContainer
      heading="Set Up Your Agent"
      subHeading="Choose your bot’s decision-making and how your bot should gather insights and vote in DAOs."
      paragraph="Build Your AI Ally"
    >
      <TagsAgent />
    </PageContainer>
  );
};

export default CreateAgentPage;
