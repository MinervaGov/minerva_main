import React from "react";

import PageContainer from "@/components/layout/onBoard/PageContainer";
import SelectBotType from "@/components/layout/onBoard/signin/SelectBotType";

const CreateAgentPage = () => {
  return (
    <PageContainer
      heading="Lead or Delegate?"
      subHeading="Create a new personalized agent or delegate to an existing one"
      paragraph="Choose Your Path"
    >
      <SelectBotType />
    </PageContainer>
  );
};

export default CreateAgentPage;
