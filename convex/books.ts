import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getBooks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("books").collect();
  },
});

export const getBookById = query({
  args: {
    id: v.id("books"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getBooksByFaculty = query({
  args: {
    faculty: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("books")
      .withIndex("by_faculty", (q) => q.eq("faculty", args.faculty))
      .collect();
  },
});

export const addBook = mutation({
  args: {
    title: v.string(),
    author: v.string(),
    faculty: v.string(),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("books", {
      title: args.title,
      author: args.author,
      faculty: args.faculty,
      status: args.status,
      isNew: true,
      source: "Library",
      createdAt: new Date().toISOString(),
    });
  },
});