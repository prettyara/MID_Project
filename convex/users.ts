import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const createUser = mutation({
  args: {
    name: v.string(),
    nim: v.string(),
    faculty: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("users", {
      name: args.name,
      nim: args.nim,
      faculty: args.faculty,
      points: 0,
      visitCount: 0,
      createdAt: new Date().toISOString(),
    });
  },
});

export const getUsers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getUserByNim = query({
  args: {
    nim: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_nim", (q) => q.eq("nim", args.nim))
      .unique();
  },
});

export const addPoints = mutation({
  args: {
    userId: v.id("users"),
    points: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(args.userId, {
      points: user.points + args.points,
    });
  },
});

export const increaseVisitCount = mutation({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(args.userId, {
      visitCount: user.visitCount + 1,
    });
  },
});