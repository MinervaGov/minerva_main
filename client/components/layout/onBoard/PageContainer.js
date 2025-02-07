import React from "react";

import FormContainer from "./FormContainer";

const PageContainer = ({
  children,
  right,
  heading,
  subHeading,
  paragraph,
  rightColor = "black",
}) => {
  return (
    <main className="flex items-center justify-center h-screen">
      <FormContainer
        heading={heading}
        subHeading={subHeading}
        paragraph={paragraph}
      >
        {children}
      </FormContainer>

      <section
        className="flex-1 h-full relative overflow-hidden flex rounded-l-2xl items-center justify-center"
        style={{
          backgroundColor: rightColor,
        }}
      >
        {right}
      </section>
    </main>
  );
};

export default PageContainer;
