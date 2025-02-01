import React from "react";
import Link from "next/link";

import SignInAvatar from "./SignInAvatar";

const SelectBotType = () => {
  return (
    <div className="max-w-sm mx-auto space-y-5">
      <SignInAvatar />

      <div className="space-y-3">
        <Link
          href="/create-agent"
          className="block w-full bg-gray-100 text-black py-2.5 rounded-xl text-sm hover:bg-gray-300 transition-colors"
        >
          Create Agent
        </Link>

        <Link
          href="/agent-gallery"
          className="block w-full bg-gray-100 text-black py-2.5 rounded-xl text-sm hover:bg-gray-300 transition-colors"
        >
          Delegate To Agent
        </Link>
      </div>

      <Link href="/sign-in" className="block">
        <p className="underline text-sm text-zinc-400 text-center cursor-pointer hover:text-white transition-colors">
          Go Back
        </p>
      </Link>
    </div>
  );
};

export default SelectBotType;
