import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    walletAddress: v.string(),
    name: v.string(),
    mvaPoints: v.number(),
  }).index("by_address", ["walletAddress"]),
  agents: defineTable({
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
        charProfile: v.object({
          username: v.string(),
          sentiment: v.string(),
          emotional_tone: v.string(),
          personality_traits: v.object({
            openness: v.string(),
            conscientiousness: v.string(),
            extraversion: v.string(),
            agreeableness: v.string(),
            neuroticism: v.string(),
          }),
          communication_style: v.object({
            formality: v.string(),
            emoji_usage: v.string(),
            sarcasm: v.boolean(),
          }),
          interest_categories: v.array(v.string()),
          engagement_level: v.string(),
        }),
      })
    ),
    tags: v.optional(v.array(v.string())),
    importProfile: v.optional(v.id("agents")),
  })
    .searchIndex("search_name", { searchField: "name" })
    .index("by_dao", ["daoId"])
    .index("by_created_by", ["createdBy"])
    .index("by_visibility", ["visibility"])
    .index("by_name", ["name"]),
  userAgentFollows: defineTable({
    userId: v.id("users"),
    agentId: v.id("agents"),
  })
    .index("by_user", ["userId"])
    .index("by_agent", ["agentId"]),
  userAgentJoins: defineTable({
    userId: v.id("users"),
    agentId: v.id("agents"),
  })
    .index("by_user", ["userId"])
    .index("by_agent", ["agentId"]),
});
