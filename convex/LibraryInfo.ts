// convex/libraryInfo.ts
import { query } from "./_generated/server";

// Pastikan fungsi ini ada dan di-export
export const getStatus = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("libraryInfo").first();
  },
});

export const getContactInfo = query({
  args: {},
  handler: async (ctx) => {
    return {
      adminWa: "628123456789",
      email: "perpus@kampus.ac.id",
      lokasi: "Gedung Utama Lt. 1"
    };
  },
});