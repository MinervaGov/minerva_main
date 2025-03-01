import React from "react";

import PageContainer from "@/components/layout/onBoard/PageContainer";
import CreateAgent from "@/components/layout/onBoard/createAgent/CreateAgent";
import Image from "next/image";

const CreateAgentPage = () => {
  return (
    <PageContainer
      heading="Set Up Your Agent"
      subHeading="Choose between Twitter or Tag based agent or import an existing agent."
      paragraph="Build Your AI Ally"
      right={
        <Image
          src="/minerva/avatar.jpeg"
          width={2000}
          height={2000}
          className=" object-cover w-full h-full"
          alt="signin-image"
        />
      }
      rightColor="#f3f3f3"
    >
      <CreateAgent />
    </PageContainer>
  );
};

export default CreateAgentPage;
