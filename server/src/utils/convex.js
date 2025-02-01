import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api.js";
import dotenv from "dotenv";
dotenv.config();

const addUser = async (walletAddress, name) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.mutation(api.users.createNewUser, {
    api_key: process.env.CONVEX_API_KEY,
    user: {
      walletAddress,
      name,
    },
  });
};

const getUserByAddress = async (walletAddress) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.query(api.users.getUser, {
    api_key: process.env.CONVEX_API_KEY,
    walletAddress,
  });
};

const createNewAgent = async (agent) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.mutation(api.agents.createAgent, {
    api_key: process.env.CONVEX_API_KEY,
    agent,
  });
};

const getAgentByName = async (name) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.query(api.agents.getAgentByName, {
    api_key: process.env.CONVEX_API_KEY,
    name,
  });
};
export { addUser, getUserByAddress, createNewAgent, getAgentByName };
