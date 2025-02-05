import { mutation, query } from "./_generated/server.js";
import { v } from "convex/values";

export const createProposal = mutation({
  args: {
    api_key: v.string(),
    Proposal: v.object({
      snapshotId: v.string(),
      daoId: v.string(),
      title: v.string(),
      description: v.string(),
      aiSummary: v.optional(v.string()),
      choices: v.array(v.string()),
      endDate: v.number(),
    }),
  },
  handler: async (ctx, args) => {
    const { api_key, Proposal } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const proposal = await ctx.db
      .query("Proposals")
      .withIndex("by_snapshot_id", (q) =>
        q.eq("snapshotId", Proposal.snapshotId)
      )
      .first();

    if (proposal) {
      throw new Error("Proposal already exists");
    }

    return await ctx.db.insert("Proposals", {
      ...Proposal,
    });
  },
});

export const getProposalById = query({
  args: {
    api_key: v.string(),
    proposalId: v.id("Proposals"),
  },
  handler: async (ctx, args) => {
    const { api_key, proposalId } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const proposal = await ctx.db.get(proposalId);

    return proposal;
  },
});
