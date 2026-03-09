import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getQuests = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("quests").collect();
  },
});

export const getActiveQuests = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("quests")
      .filter((q) => q.eq(q.field("active"), true))
      .collect();
  },
});

export const addQuest = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    points: v.number(),
    type: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("quests", {
      title: args.title,
      description: args.description,
      points: args.points,
      type: args.type,
      active: true,
      createdAt: new Date().toISOString(),
    });
  },
});

export const completeQuest = mutation({
  args: {
    userId: v.id("users"),
    questId: v.id("quests"),
  },
  handler: async (ctx, args) => {
    const quest = await ctx.db.get(args.questId);

    if (!quest) {
      throw new Error("Quest not found");
    }

    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(args.userId, {
      points: user.points + quest.points,
    });

    return {
      success: true,
      pointsEarned: quest.points,
    };
  },
});