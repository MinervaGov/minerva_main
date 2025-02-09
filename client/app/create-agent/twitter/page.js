import React from "react";

import PageContainer from "@/components/layout/onBoard/PageContainer";
import TwitterAgent from "@/components/layout/onBoard/createAgent/TwitterAgent";
import Image from "next/image";

const CreateAgentPage = () => {
  return (
    <PageContainer
      heading="Power Up with Twitter"
      subHeading="Connect your Twitter to train your bot based on your profile activity."
      paragraph="Tweets Shape Your Governance"
      right={
        <Image
          src="/minerva/avatar.jpeg"
          width={500}
          height={500}
          className=" object-cover w-full h-full"
          alt="twitter-agent"
        />
      }
    >
      <TwitterAgent />
    </PageContainer>
  );
};

export default CreateAgentPage;
