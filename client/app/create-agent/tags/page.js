import React from "react";

import PageContainer from "@/components/layout/onBoard/PageContainer";
import TagsAgent from "@/components/layout/onBoard/createAgent/TagsAgent";

const CreateAgentPage = () => {
  return (
    <PageContainer
      heading="Tag based Agent"
      subHeading="Give Minerva a list of tags and she will vote on proposals based on the tags."
      paragraph="Build Your AI Ally"
    >
      <TagsAgent />
    </PageContainer>
  );
};

export default CreateAgentPage;
