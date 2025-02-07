import { mutation, query } from "./_generated/server.js";
import { v } from "convex/values";

export const createBulkDecision = mutation({
  args: {
    api_key: v.string(),
    proposalId: v.id("Proposals"),
    agentIds: v.array(v.id("agents")),
    status: v.union(
      v.literal("pending"),
      v.literal("decided"),
      v.literal("failed")
    ),
  },
  handler: async (ctx, args) => {
    const { api_key, proposalId, agentIds, status } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const decisions = await Promise.all(
      agentIds.map(async (agentId) => {
        return await ctx.db.insert("Decisions", {
          proposalId,
          agentId,
          status,
        });
      })
    );

    return decisions;
  },
});

export const changeDecisionStatus = mutation({
  args: {
    api_key: v.string(),
    decisionId: v.id("Decisions"),
    status: v.union(
      v.literal("pending"),
      v.literal("decided"),
      v.literal("failed")
    ),
  },
  handler: async (ctx, args) => {
    const { api_key, decisionId, status } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    await ctx.db.patch(decisionId, {
      status,
    });
  },
});

export const getDecisionsByAgentId = query({
  args: {
    api_key: v.string(),
    agentId: v.id("agents"),
  },
  handler: async (ctx, args) => {
    const { api_key, agentId } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const decisions = await ctx.db
      .query("Decisions")
      .withIndex("by_agent", (q) => q.eq("agentId", agentId))
      .collect();

    return decisions;
  },
});

export const getDecisionById = query({
  args: {
    api_key: v.string(),
    decisionId: v.id("Decisions"),
  },
  handler: async (ctx, args) => {
    const { api_key, decisionId } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const decision = await ctx.db.get(decisionId);

    return decision;
  },
});

export const setPrimaryDecision = mutation({
  args: {
    api_key: v.string(),
    decisionId: v.id("Decisions"),
    primaryDecision: v.string(),
    primaryReason: v.string(),
  },
  handler: async (ctx, args) => {
    const { api_key, decisionId, primaryDecision, primaryReason } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    await ctx.db.patch(decisionId, {
      primaryDecision,
      primaryReason,
      status: "decided",
    });
  },
});
