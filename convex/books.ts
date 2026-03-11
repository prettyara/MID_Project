// convex/books.ts
import { v } from "convex/values";
import { query } from "./_generated/server";

// 1. Ambil semua buku
export const getAllBooks = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("books").collect();
  },
});

// 2. Ambil buku baru
export const getNewArrivals = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("books")
      .filter((q) => q.eq(q.field("category"), "New Arrival"))
      .collect();
  },
});

// 3. TAMBAHAN: Cari buku berdasarkan judul (untuk fitur pencarian)
export const searchBooks = query({
  args: { title: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("books")
      .filter((q) => q.eq(q.field("title"), args.title))
      .collect();
  },
});