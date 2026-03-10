import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({

  // Tabel users
  users: defineTable({
    name: v.string(),
    points: v.number(),
    visitCount: v.number(),
  }),

  // Fitur Quest / missions
  quests: defineTable({
    title: v.string(),
    description: v.string(),
    reward: v.number(),
  }),

  missions: defineTable({
    title: v.string(),
    description: v.string(),
    rewardPoints: v.number(),
  }),

  // Check-in perpustakaan
  checkins: defineTable({
    userId: v.id("users"),
    location: v.string(),
    createdAt: v.number(),
  }),

  // Reviews / upload konten
  reviews: defineTable({
    userId: v.id("users"),
    bookTitle: v.string(),
    content: v.string(),
    type: v.string(), // ringkasan | video | review
    createdAt: v.number(),
  }),

  // Rewards / tebus poin
  rewards: defineTable({
    title: v.string(),
    pointsRequired: v.number(),
  }),

  // Events
  events: defineTable({
    title: v.string(),
    location: v.string(),
    createdAt: v.number(),
  }),

  // Visit / kunjungan ke perpustakaan
  visits: defineTable({
    userId: v.id("users"),
    date: v.string(),
  }).index("by_user", ["userId"]),

  points: defineTable({
    userId: v.id("users"),
    amount: v.number(),
    reason: v.string(),
    date: v.string(),
  }),

  promos: defineTable({
    bookTitle: v.string(),
    author: v.string(),
    faculty: v.string(),
    recommendedBy: v.string(),
    description: v.string(),
    location: v.string(),
    status: v.string(),
  }),


  // Tabel untuk menyimpan kontribusi mahasiswa (AGAR TIDAK MERAH)

  uploads: defineTable({
    userId: v.string(),
    type: v.string(),
    contentUrl: v.string(),
    createdAt: v.number(),
  }),
  })


