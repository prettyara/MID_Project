import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addReview = mutation({
  args: {
    userId: v.id("users"),
    bookId: v.id("books"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    const book = await ctx.db.get(args.bookId);
    if (!book) throw new Error("Book not found");

    const reviewPoints = 10;

    const reviewId = await ctx.db.insert("reviews", {
      userId: args.userId,
      bookId: args.bookId,
      content: args.content,
      points: reviewPoints,
      createdAt: new Date().toISOString(),
    });

    await ctx.db.patch(args.userId, {
      points: user.points + reviewPoints,
    });

    return reviewId;
  },
});

export const getReviews = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("reviews").collect();
  },
});

export const getReviewsByBook = query({
  args: {
    bookId: v.id("books"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reviews")
      .filter((q) => q.eq(q.field("bookId"), args.bookId))
      .collect();
  },
});