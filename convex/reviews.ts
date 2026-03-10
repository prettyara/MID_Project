import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const addReview = mutation({
  args:{
    userId: v.id("users"),
    bookTitle: v.string(),
    content: v.string(),
    type: v.string(),
  },

  handler: async(ctx,args)=>{

    await ctx.db.insert("reviews",{
      userId: args.userId,
      bookTitle: args.bookTitle,
      content: args.content,
      type: args.type,
      createdAt: Date.now()
    });

    const user = await ctx.db.get(args.userId);

    await ctx.db.patch(args.userId,{
      points: (user?.points || 0) + 20
    });

    return "Review berhasil, poin +20";
  }
});