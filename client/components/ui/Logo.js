import React from "react";
import Image from "next/image";

const Logo = ({ logoSize = 36, size = "text-lg" }) => {
  return (
    <div className="flex items-center space-x-2">
      <Image
        src="/minerva.svg"
        alt="Minerva logo"
        width={logoSize}
        height={logoSize}
      />
      <p className={size}>Minerva</p>
    </div>
  );
};

export default Logo;
