import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl()
})

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query('expenses').order('desc').collect()
  },
})

export const create = mutation({
  args: {
    merchant: v.optional(v.string()),
    total: v.optional(v.number()),
    date: v.optional(v.string()),
    storageId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const expenseId = await ctx.db.insert('expenses', {
      merchant: args.merchant,
      total: args.total,
      date: args.date,
      storageId: args.storageId,
    })
    return expenseId
  },
})
