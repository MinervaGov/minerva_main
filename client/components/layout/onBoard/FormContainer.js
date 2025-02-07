import React from "react";
import Image from "next/image";

import FormHeading from "./FormHeading";

const FormContainer = ({ heading, subHeading, paragraph, children }) => {
  return (
    <section className="w-[600px] h-full text-center p-10">
      <Image
        src="/minerva.svg"
        width={30}
        height={30}
        alt="Minerva Logo"
        className="mx-auto mb-20"
      />

      <FormHeading
        heading={heading}
        subHeading={subHeading}
        paragraph={paragraph}
      />

      {children}
    </section>
  );
};

export default FormContainer;
