import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  users: defineTable({
    name: v.string(),
    nim: v.string(),
    faculty: v.string(),
    points: v.number(),
    visitCount: v.number(),
    createdAt: v.string(),
  }).index("by_nim", ["nim"]),

  books: defineTable({
    title: v.string(),
    author: v.string(),
    faculty: v.string(),
    status: v.string(), // available | read_only | restricted
    isNew: v.boolean(),
    source: v.string(), // BI | dosen | library
    createdAt: v.string(),
  }).index("by_faculty", ["faculty"]),

  quests: defineTable({
    title: v.string(),
    description: v.string(),
    points: v.number(),
    type: v.string(), // visit | read | review
    active: v.boolean(),
    createdAt: v.string(),
  }),

  visits: defineTable({
    userId: v.id("users"),
    date: v.string(),
  }).index("by_user", ["userId"]),

  reviews: defineTable({
    userId: v.id("users"),
    bookId: v.id("books"),
    content: v.string(),
    points: v.number(),
    createdAt: v.string(),
  }).index("by_book", ["bookId"]),

  events: defineTable({
    title: v.string(),
    description: v.string(),
    date: v.string(),
    active: v.boolean(),
    createdAt: v.string(),
  }),

  rewards: defineTable({
    title: v.string(),
    description: v.string(),
    points: v.number(),
    createdAt: v.string(),
  }),

});