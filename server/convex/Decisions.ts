import { mutation, query } from "./_generated/server.js";
import { v } from "convex/values";

export const createBulkDecision = mutation({
  args: {
    api_key: v.string(),
    proposalId: v.id("Proposals"),
    agentIds: v.array(v.id("agents")),
    status: v.union(
      v.literal("pending"),
      v.literal("completed"),
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
      v.literal("completed"),
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
