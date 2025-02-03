import { mutation, query } from "./_generated/server.js";
import { v } from "convex/values";

export const createAgent = mutation({
  args: {
    api_key: v.string(),
    agent: v.object({
      name: v.string(),
      imageUrl: v.optional(v.string()),
      imageType: v.optional(v.string()),
      createdBy: v.id("users"),
      privyWalletId: v.string(),
      daoId: v.string(),
      profileType: v.union(
        v.literal("twitter"),
        v.literal("tags"),
        v.literal("import")
      ),
      visibility: v.union(v.literal("public"), v.literal("private")),
      delayPeriod: v.number(),
      twitterProfile: v.optional(
        v.object({
          twitterId: v.string(),
          charProfile: v.any(),
        })
      ),
      tags: v.optional(v.array(v.string())),
      importProfile: v.optional(v.id("agents")),
    }),
  },
  handler: async (ctx, args) => {
    const { api_key, agent } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const existingAgent = await ctx.db
      .query("agents")
      .withIndex("by_name", (q) => q.eq("name", agent.name))
      .first();

    if (existingAgent) {
      throw new Error("Agent already exists");
    }

    const agentId = await ctx.db.insert("agents", {
      name: agent.name,
      imageUrl: agent.imageUrl,
      imageType: agent.imageType,
      privyWalletId: agent.privyWalletId,
      daoId: agent.daoId,
      profileType: agent.profileType,
      visibility: agent.visibility,
      delayPeriod: agent.delayPeriod,
      twitterProfile: agent.twitterProfile,
      tags: agent.tags,
      importProfile: agent.importProfile,
      createdBy: agent.createdBy,
    });

    return agentId;
  },
});

export const getAgent = query({
  args: {
    api_key: v.string(),
    agentId: v.id("agents"),
  },
  handler: async (ctx, args) => {
    const { api_key, agentId } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const agent = await ctx.db.get(agentId);

    return agent;
  },
});

export const getAgentByCreatedBy = query({
  args: {
    api_key: v.string(),
    createdBy: v.id("users"),
  },
  handler: async (ctx, args) => {
    const { api_key, createdBy } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const agents = await ctx.db
      .query("agents")
      .withIndex("by_created_by", (q) => q.eq("createdBy", createdBy))
      .collect();

    return agents;
  },
});

export const getAgentsByVisibility = query({
  args: {
    api_key: v.string(),
    visibility: v.union(v.literal("public"), v.literal("private")),
  },
  handler: async (ctx, args) => {
    const { api_key, visibility } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const agents = await ctx.db
      .query("agents")
      .withIndex("by_visibility", (q) => q.eq("visibility", visibility))
      .collect();

    return agents;
  },
});

export const searchAgentsByName = query({
  args: {
    api_key: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const { api_key, name } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const agents = await ctx.db
      .query("agents")
      .withSearchIndex("search_name", (q) => q.search("name", name))
      .collect();

    return agents;
  },
});

export const getAgentByName = query({
  args: {
    api_key: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    const { api_key, name } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const agent = await ctx.db
      .query("agents")
      .withIndex("by_name", (q) => q.eq("name", name))
      .first();

    return agent;
  },
});
