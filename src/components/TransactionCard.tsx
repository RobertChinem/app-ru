import Transaction from 'entities/Transaction'
import ArrowDown from 'icons/ArrowDown'
import ArrowUp from 'icons/ArrowUp'
import { useState } from 'react'

interface TransactionCardProps {
  handleRemoveTransaction: (transaction: Transaction) => void
  transaction: Transaction
}

function TransactionCard({
  transaction,
  handleRemoveTransaction
}: TransactionCardProps) {
  const [open, setOpen] = useState(false)

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  function handleOpenDetails() {
    setOpen(!open)
  }

  return (
    <div>
      <button className="w-full py-2" onClick={handleOpenDetails}>
        <div className="flex w-full items-center rounded-lg">
          {transaction.amount > 0 ? (
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-200 text-green-800">
              <ArrowUp />
            </div>
          ) : (
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-200 text-red-800">
              <ArrowDown />
            </div>
          )}
          <div className="ml-3">{formatDate(transaction.date)}</div>
        </div>
        <div className={`overflow-hidden ${open ? '' : 'h-0'}`}>
          <button
            type="button"
            onClick={() => handleRemoveTransaction(transaction)}
            className="mt-6 mr-2 mb-2 w-full rounded-lg border border-red-700 px-5 py-2.5 text-center text-sm font-medium text-red-700 hover:bg-red-800 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300"
          >
            Remover
          </button>
        </div>
      </button>
    </div>
  )
}

export default TransactionCard
