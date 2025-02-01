import React from "react";

const FormHeading = ({ heading, subHeading, paragraph }) => {
  return (
    <div className="space-y-5 mb-10">
      <p className="bg-zinc-800 text-sm text-zinc-400 py-2 rounded-full px-4 w-fit mx-auto">
        {paragraph}
      </p>

      <div className="space-y-3">
        <h1 className="text-4xl">{heading}</h1>

        <h2 className="text-zinc-400 text-sm max-w-xs mx-auto">{subHeading}</h2>
      </div>
    </div>
  );
};

export default FormHeading;
