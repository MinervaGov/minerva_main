import React from "react";
import Link from "next/link";

import SignInAvatar from "../signin/SignInAvatar";

const CreateAgent = () => {
  return (
    <div className="max-w-sm mx-auto space-y-5">
      <SignInAvatar />

      <div className="space-y-3">
        <Link
          href="/create-agent/twitter"
          className="block w-full bg-gray-100 text-black py-2.5 rounded-xl text-sm hover:bg-gray-300 transition-colors"
        >
          Twitter
        </Link>

        <Link
          href="/create-agent/tags"
          className="block w-full bg-gray-100 text-black py-2.5 rounded-xl text-sm hover:bg-gray-300 transition-colors"
        >
          Type
        </Link>

        <Link
          href="/create-agent/import"
          className="block w-full bg-gray-100 text-black py-2.5 rounded-xl text-sm hover:bg-gray-300 transition-colors"
        >
          Import
        </Link>
      </div>

      <Link href="/select-agent-type" className="block">
        <p className="underline text-sm text-zinc-400 text-center cursor-pointer hover:text-white transition-colors">
          Go Back
        </p>
      </Link>
    </div>
  );
};

export default CreateAgent;
