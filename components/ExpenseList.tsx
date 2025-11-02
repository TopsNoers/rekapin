'use client'

import { useQuery } from 'convex/react'
import { api } from '@/convex/_generated/api'

export default function ExpenseList() {
  const expenses = useQuery(api.expenses.list)

  if (expenses === undefined) {
    return (
      <div className="p-4 text-center text-gray-500">
        Loading expenses...
      </div>
    )
  }

  if (expenses.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No expenses found. Upload a receipt to get started.
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {expenses.map((expense) => (
        <div
          key={expense._id}
          className="p-4 border border-gray-200 rounded-md hover:bg-gray-50"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-900">{expense.merchant || 'Unknown Merchant'}</p>
              <p className="text-sm text-gray-500">
                {expense.date
                  ? new Date(expense.date).toLocaleDateString('id-ID', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })
                  : 'No date'}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-gray-900">
                {expense.total
                  ? new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(expense.total)
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
