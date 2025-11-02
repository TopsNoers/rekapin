import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  expenses: defineTable({
    merchant: v.optional(v.string()),
    total: v.optional(v.number()),
    date: v.optional(v.string()),
    description: v.optional(v.string()),
    category: v.optional(v.string()),
    subCategory: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    notes: v.optional(v.string()),
    attachments: v.optional(v.array(v.string())),
    createdAt: v.optional(v.string()),
    updatedAt: v.optional(v.string()),
    storageId: v.optional(v.string()),
  }),
})
