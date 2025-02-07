import { mutation, query } from "./_generated/server.js";
import { v } from "convex/values";

export const followAgent = mutation({
  args: {
    api_key: v.string(),
    userId: v.id("users"),
    agentId: v.id("agents"),
  },
  handler: async (ctx, args) => {
    const { api_key, userId, agentId } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const user = await ctx.db.get(userId);
    const agent = await ctx.db.get(agentId);

    if (!user || !agent) {
      throw new Error("User or agent not found");
    }

    const userAgentFollow = await ctx.db
      .query("userAgentFollows")
      .withIndex("by_user_agent", (q) =>
        q.eq("userId", userId).eq("agentId", agentId)
      )
      .first();

    if (userAgentFollow) {
      throw new Error("User already follows agent");
    }

    return await ctx.db.insert("userAgentFollows", {
      userId,
      agentId,
    });
  },
});

export const getFollowerCount = query({
  args: {
    api_key: v.string(),
    agentId: v.id("agents"),
  },
  handler: async (ctx, args) => {
    const { api_key, agentId } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const followerCount = await ctx.db
      .query("userAgentFollows")
      .withIndex("by_agent", (q) => q.eq("agentId", agentId))
      .collect();

    return followerCount.length;
  },
});

export const getFollowedAgents = query({
  args: {
    api_key: v.string(),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const { api_key, userId } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const followedAgents = await ctx.db
      .query("userAgentFollows")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .collect();

    if (followedAgents.length === 0) {
      return [];
    }

    const agents = await Promise.all(
      followedAgents.map(async (follow) => {
        return await ctx.db.get(follow.agentId);
      })
    );

    return agents;
  },
});

export const unfollowAgent = mutation({
  args: {
    api_key: v.string(),
    userId: v.id("users"),
    agentId: v.id("agents"),
  },
  handler: async (ctx, args) => {
    const { api_key, userId, agentId } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const userAgentFollow = await ctx.db
      .query("userAgentFollows")
      .withIndex("by_user_agent", (q) =>
        q.eq("userId", userId).eq("agentId", agentId)
      )
      .first();

    if (!userAgentFollow) {
      throw new Error("User does not follow agent");
    }

    return await ctx.db.delete(userAgentFollow._id);
  },
});
