import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addVisit = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new Error("User not found");
    }

    const date = new Date().toISOString();

    // save visit
    await ctx.db.insert("visits", {
      userId: args.userId,
      date,
    });

    // increase visit count
    await ctx.db.patch(args.userId, {
      visitCount: user.visitCount + 1,
    });

    return date;
  },
});

export const getVisits = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("visits").collect();
  },
});

export const getVisitsByUser = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("visits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});