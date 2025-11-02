import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  expenses: defineTable({
    merchant: v.optional(v.string()),
    total: v.optional(v.number()),
    date: v.optional(v.string()),
    storageId: v.optional(v.string()),
  }),
})
