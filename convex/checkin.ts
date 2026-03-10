import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const scanQR = mutation({
  args:{
    userId: v.id("users"),
    location: v.string()
  },

  handler: async(ctx,args)=>{

    await ctx.db.insert("checkins",{
      userId: args.userId,
      location: args.location,
      createdAt: Date.now()
    });

    const user = await ctx.db.get(args.userId);

    await ctx.db.patch(args.userId,{
      points: user!.points + 10
    });

    return "Checkin berhasil";
  }
});