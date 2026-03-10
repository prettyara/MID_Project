import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const recordVisit = mutation({
  args: { userId: v.string(), location: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db.insert("uploads", {
      userId: args.userId,
      type: "visit",
      contentUrl: args.location,
      createdAt: Date.now(),
    });
  },
});

export const getByFaculty = query({
  args: { faculty: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("promos")
      .filter((q) => q.eq(q.field("faculty"), args.faculty))
      .collect();
  },
});

export const getLeaderboard = query({
  args: {},
  handler: async (ctx) => {
    const data = await ctx.db.query("uploads").collect();
    const scores: Record<string, number> = {};
    data.forEach((item) => {
      const name = item.userId || "Anonim";
      scores[name] = (scores[name] ?? 0) + 10;
    });
    return Object.entries(scores)
      .map(([name, points]) => ({ name, points }))
      .sort((a, b) => b.points - a.points);
  },
});