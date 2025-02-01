import React from "react";

import PageContainer from "@/components/layout/onBoard/PageContainer";
import TwitterAgent from "@/components/layout/onBoard/createAgent/TwitterAgent";

const CreateAgentPage = () => {
  return (
    <PageContainer
      heading="Power Up with Twitter"
      subHeading="Connect your Twitter to train your bot based on your profile activity."
      paragraph="Tweets Shape Your Governance."
    >
      <TwitterAgent />
    </PageContainer>
  );
};

export default CreateAgentPage;
