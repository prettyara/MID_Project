import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createEvent = mutation({
  args: {
    title: v.string(),
    location: v.string(),
  },
  handler: async (ctx, args) => {

    await ctx.db.insert("events", {
      title: args.title,
      location: args.location,
      createdAt: Date.now(),
    });

  },
});