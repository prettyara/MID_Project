import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const redeemReward = mutation({

  args:{
    userId: v.id("users"),
    rewardId: v.id("rewards"),
  },

  handler: async(ctx,args)=>{

    const user = await ctx.db.get(args.userId);
    const reward = await ctx.db.get(args.rewardId);

    if(!user || !reward){
      throw new Error("Data tidak ditemukan");
    }

    if(user.points < reward.pointsRequired){
      throw new Error("Poin tidak cukup");
    }

    await ctx.db.patch(args.userId,{
      points: user.points - reward.pointsRequired
    });

    return "Reward berhasil ditukar";
  }

});