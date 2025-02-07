import React from "react";

import PageContainer from "@/components/layout/onBoard/PageContainer";
import SelectBotType from "@/components/layout/onBoard/signin/SelectBotType";
import Image from "next/image";

const CreateAgentPage = () => {
  return (
    <PageContainer
      heading="Lead or Delegate?"
      subHeading="Create a new personalized agent or delegate to an existing one"
      paragraph="Choose Your Path"
      right={
        <Image
          src="/minerva/avatar.jpeg"
          width={500}
          height={500}
          className=" object-cover w-full h-full"
          alt="signin-image"
        />
      }
      rightColor="#f3f3f3"
    >
      <SelectBotType />
    </PageContainer>
  );
};

export default CreateAgentPage;
