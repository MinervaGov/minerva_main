import { mutation, query } from "./_generated/server.js";
import { v } from "convex/values";

export const createNewUser = mutation({
  args: {
    api_key: v.string(),
    user: v.object({
      walletAddress: v.string(),
      name: v.string(),
    }),
  },
  handler: async (ctx, args) => {
    const { api_key, user } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const isPresent = await ctx.db
      .query("users")
      .withIndex("by_address", (u) => u.eq("walletAddress", user.walletAddress))
      .first();

    if (isPresent) {
      throw new Error("User already exists");
    }

    const userId = await ctx.db.insert("users", {
      walletAddress: user.walletAddress,
      name: user.name,
      mvaPoints: 0,
    });

    return userId;
  },
});

export const getUser = query({
  args: {
    api_key: v.string(),
    walletAddress: v.string(),
  },
  handler: async (ctx, args) => {
    const { api_key, walletAddress } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_address", (q) => q.eq("walletAddress", walletAddress))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },
});
