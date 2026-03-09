import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getRewards = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("rewards").collect();
  },
});

export const addReward = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    points: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("rewards", {
      title: args.title,
      description: args.description,
      points: args.points,
      createdAt: new Date().toISOString(),
    });
  },
});

export const redeemReward = mutation({
  args: {
    userId: v.id("users"),
    rewardId: v.id("rewards"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    const reward = await ctx.db.get(args.rewardId);
    if (!reward) throw new Error("Reward not found");

    if (user.points < reward.points) {
      throw new Error("Not enough points");
    }

    await ctx.db.patch(args.userId, {
      points: user.points - reward.points,
    });

    return {
      success: true,
      remainingPoints: user.points - reward.points,
    };
  },
});