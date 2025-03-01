import { mutation, query } from "./_generated/server.js";
import { v } from "convex/values";

export const AddSubscriptionTg = mutation({
  args: {
    api_key: v.string(),
    agentName: v.string(),
    userTg: v.string(),
  },
  handler: async (ctx, args) => {
    const { api_key, agentName, userTg } = args;

    if (api_key !== process.env.API_KEY) {
        throw new Error("Invalid API key");
    }

        const agent = await ctx.db
            .query("agents")
            .withSearchIndex("search_name", (q) => q.search("name", agentName))
            .collect();

    if (agent.length === 0) {
      throw new Error("No such agent");
    }

    const agentId = agent[0]._id;
    const row = await ctx.db
      .query("Subscriptions")
      .withIndex("by_agent", (q) => q.eq("agentId", agentId))
      .first();

    if (row) {
      const TgUserList = row.usersTg;
      if (TgUserList.includes(userTg)) {
        throw new Error("Agent already subscribed");
      }

      TgUserList.push(userTg);
      return await ctx.db.patch(row._id, {
        usersTg: TgUserList,
      });
    } else {
      return await ctx.db.insert("Subscriptions", {
        agentId: agentId,
        usersTg: [userTg],
        usersDisc: [],
      });
    }
  },
});

export const AddSubscriptionDiscord = mutation({
    args: {
      api_key: v.string(),
      agentName: v.string(),
      userDisc: v.string(),
    },
    handler: async (ctx, args) => {
      const { api_key, agentName, userDisc } = args;
  
      if (api_key !== process.env.API_KEY) {
          throw new Error("Invalid API key");
      }
  
          const agent = await ctx.db
              .query("agents")
              .withSearchIndex("search_name", (q) => q.search("name", agentName))
              .collect();
  
      if (agent.length === 0) {
        throw new Error("No such agent");
      }
  
      const agentId = agent[0]._id;
      const row = await ctx.db
        .query("Subscriptions")
        .withIndex("by_agent", (q) => q.eq("agentId", agentId))
        .first();
  
      if (row) {
        const DiscUserList = row.usersDisc;
        if (DiscUserList.includes(userDisc)) {
          throw new Error("Agent already subscribed");
        }
  
        DiscUserList.push(userDisc);
        return await ctx.db.patch(row._id, {
          usersDisc: DiscUserList
        });
      } else {
        return await ctx.db.insert("Subscriptions", {
          agentId: agentId,
          usersTg: [],
          usersDisc: [userDisc],
        });
      }
    },
  });

export const getUsersToNotify = query({
  args: {
    api_key: v.string(),
    daoId: v.string(),
    agentId: v.string(),
  },
  handler: async (ctx, args) => {
    const { api_key, daoId, agentId } = args;

    if (api_key !== process.env.API_KEY) {
      throw new Error("Invalid API key");
    }

    const rows = await ctx.db
      .query("agents")
      .withIndex("by_dao", (q) => q.eq("daoId", daoId))
      .collect();

    if (rows.length === 0) {
      return null;
    }

    let agentList: any[] = [];

    for (let row of rows) {
      const agentIdGet = row._id;

      if (agentId !== agentIdGet && agentId != undefined)
        continue;

      const agent = await ctx.db
        .query("Subscriptions")
        .withIndex("by_agent", (q) => q.eq("agentId", agentIdGet))
        .first();

      if (agent) {
        agentList.push(agent);
      }
    }

    return agentList;
  },
});
