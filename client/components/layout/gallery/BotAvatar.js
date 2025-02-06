import React from "react";
import Image from "next/image";
import { createAvatar } from "@dicebear/core";
import { loreleiNeutral } from "@dicebear/collection";

const BotAvatar = ({ name = "hi.minerva.eth", className }) => {
  const avatar = createAvatar(loreleiNeutral, {
    seed: name,
  });

  const dataUri = avatar.toDataUri();

  return (
    <Image
      src={dataUri}
      className={`object-cover rounded-full ${className}`}
      height={48}
      width={48}
      alt="Bot avatar"
    />
  );
};

export default BotAvatar;
