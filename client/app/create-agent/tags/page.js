import React from "react";

import PageContainer from "@/components/layout/onBoard/PageContainer";
import TagsAgent from "@/components/layout/onBoard/createAgent/TagsAgent";
import Image from "next/image";

const CreateAgentPage = () => {
  return (
    <PageContainer
      heading="Tag based Agent"
      subHeading="Give Minerva a list of tags and she will vote on proposals based on the tags."
      paragraph="Build Your AI Ally"
      right={
        <Image
          src="/minerva/avatar.jpeg"
          width={500}
          height={500}
          className=" object-cover w-full h-full"
          alt="signin-image"
        />
      }
    >
      <TagsAgent />
    </PageContainer>
  );
};

export default CreateAgentPage;
