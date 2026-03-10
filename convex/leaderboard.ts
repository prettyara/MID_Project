import { query } from "./_generated/server";

export const getTopUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();

    return users
      .sort((a, b) => (b.points ?? 0) - (a.points ?? 0))
      .slice(0, 10);
  },
});