import UploadReceipt from '@/components/UploadReceipt'
import ExpenseList from '@/components/ExpenseList'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Rekapin - Expense Tracker</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-xl font-semibold mb-4">Upload Receipt</h2>
          <UploadReceipt />
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Expense List</h2>
          <ExpenseList />
        </div>
      </div>
    </main>
  )
}
