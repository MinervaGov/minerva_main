import React from "react";

import FormContainer from "./FormContainer";

const PageContainer = ({ children, right, heading, subHeading, paragraph }) => {
  return (
    <main className="flex items-center justify-center h-screen">
      <FormContainer
        heading={heading}
        subHeading={subHeading}
        paragraph={paragraph}
      >
        {children}
      </FormContainer>

      <section className="flex-[3] h-full">{right}</section>
    </main>
  );
};

export default PageContainer;
