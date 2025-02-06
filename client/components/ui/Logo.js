import React from "react";
import Image from "next/image";

const Logo = ({}) => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src="/minerva.svg"
        alt="logo"
        width={28}
        height={28}
        className="rounded-full"
      />
      <h1 className="text-2xl font-bold">Minerva</h1>
    </div>
  );
};

export default Logo;
