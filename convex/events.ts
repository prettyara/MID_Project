import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getEvents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("events").collect();
  },
});

export const getActiveEvents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("events")
      .filter((q) => q.eq(q.field("active"), true))
      .collect();
  },
});

export const addEvent = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    date: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("events", {
      title: args.title,
      description: args.description,
      date: args.date,
      active: true,
      createdAt: new Date().toISOString(),
    });
  },
});