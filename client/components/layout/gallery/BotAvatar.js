import React from "react";
import Image from "next/image";
import { createAvatar } from "@dicebear/core";
import { loreleiNeutral } from "@dicebear/collection";

const BotAvatar = ({ name = "minerva.eth" }) => {
  const avatar = createAvatar(loreleiNeutral, {
    seed: { name },
  });

  const dataUri = avatar.toDataUri();

  return (
    <Image
      src={dataUri}
      className="object-cover rounded-lg"
      height={200}
      width={200}
      alt="Bot avatar"
    />
  );
};

export default BotAvatar;
