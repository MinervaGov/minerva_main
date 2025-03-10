import { PrivyClient } from "@privy-io/server-auth";
import dotenv from "dotenv";

dotenv.config();

const createPrivyWallet = async () => {
  const privy = new PrivyClient(
    process.env.PRIVY_APP_ID,
    process.env.PRIVY_APP_SECRET
  );

  const { id, address, chainType } = await privy.walletApi.create({
    chainType: "ethereum",
  });

  return { id, address, chainType };
};

export { createPrivyWallet };
