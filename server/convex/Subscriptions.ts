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
            .first();

        if (!agent) {
            throw new Error("No such agent")
        }

        const agentId = agent._id;
        const row = await ctx.db
            .query("Subscriptions")
            .withIndex("by_agent", (q) => q.eq("agentId", agentId))
            .first();

        if (row) {
            const TgUserList = row.usersTg;
            if (TgUserList.includes(userTg)) {
                throw new Error("Agent already subscribed")
            }

            TgUserList.push(userTg)
            return await ctx.db.patch(row._id, {
                usersTg: TgUserList
            });
        }
        else {
            return await ctx.db.insert("Subscriptions", {
                agentId: agentId,
                usersTg: [userTg],
                usersDisc: [],
            });
        }
    }
});