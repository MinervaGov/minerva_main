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

const addProposal = async (Proposal) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.mutation(api.Proposals.createProposal, {
    api_key: process.env.CONVEX_API_KEY,
    Proposal,
  });
};

const addBulkDecision = async (proposalId, agentIds, status = "pending") => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.mutation(api.Decisions.createBulkDecision, {
    api_key: process.env.CONVEX_API_KEY,
    proposalId,
    agentIds,
    status,
  });
};

const getAgentsByDaoId = async (daoId) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.query(api.agents.getAgentsByDaoId, {
    api_key: process.env.CONVEX_API_KEY,
    daoId,
  });
};

const getAgentsByUserId = async (userId) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.query(api.agents.getAgentsByUserId, {
    api_key: process.env.CONVEX_API_KEY,
    userId,
  });
};

const getAgentByVisibilityStatus = async (status) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.query(api.agents.getAgentsByVisibility, {
    api_key: process.env.CONVEX_API_KEY,
    visibility: status,
  });
};

const changeDecisionStatus = async (decisionId, status) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.mutation(api.Decisions.changeDecisionStatus, {
    api_key: process.env.CONVEX_API_KEY,
    decisionId,
    status,
  });
};

const getDecisionsByAgentId = async (agentId) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.query(api.Decisions.getDecisionsByAgentId, {
    api_key: process.env.CONVEX_API_KEY,
    agentId,
  });
};

const getProposalById = async (proposalId) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.query(api.Proposals.getProposalById, {
    api_key: process.env.CONVEX_API_KEY,
    proposalId,
  });
};

const followAgent = async (userId, agentId) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.mutation(api.userAgentFollow.followAgent, {
    api_key: process.env.CONVEX_API_KEY,
    userId,
    agentId,
  });
};

const unfollowAgent = async (userId, agentId) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.mutation(api.userAgentFollow.unfollowAgent, {
    api_key: process.env.CONVEX_API_KEY,
    userId,
    agentId,
  });
};

const getFollowers = async (agentId) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.query(api.userAgentFollow.getFollowerCount, {
    api_key: process.env.CONVEX_API_KEY,
    agentId,
  });
};

const getFollowedAgents = async (userId) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.query(api.userAgentFollow.getFollowedAgents, {
    api_key: process.env.CONVEX_API_KEY,
    userId,
  });
};

const getDecisionById = async (decisionId) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.query(api.Decisions.getDecisionById, {
    api_key: process.env.CONVEX_API_KEY,
    decisionId,
  });
};

const getAgentById = async (agentId) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.query(api.agents.getAgentById, {
    api_key: process.env.CONVEX_API_KEY,
    agentId,
  });
};

const addSubscriptionTg = async (agentName, userTg) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.mutation(api.Subscriptions.AddSubscriptionTg, {
    api_key: process.env.CONVEX_API_KEY,
    agentName,
    userTg
  });
};

const setPrimaryDecision = async (
  decisionId,
  primaryDecision,
  primaryReason
) => {
  const client = new ConvexHttpClient(process.env.CONVEX_URL);

  return await client.mutation(api.Decisions.setPrimaryDecision, {
    api_key: process.env.CONVEX_API_KEY,
    decisionId,
    primaryDecision,
    primaryReason,
  });
};

export {
  addUser,
  getUserByAddress,
  createNewAgent,
  getAgentByName,
  addProposal,
  addBulkDecision,
  getAgentsByDaoId,
  getAgentsByUserId,
  getAgentByVisibilityStatus,
  changeDecisionStatus,
  getDecisionsByAgentId,
  getProposalById,
  followAgent,
  unfollowAgent,
  getFollowers,
  getFollowedAgents,
  getDecisionById,
  getAgentById,
  addSubscriptionTg,
  setPrimaryDecision,
};
