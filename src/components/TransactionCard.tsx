import ArrowDown from 'icons/ArrowDown'
import ArrowUp from 'icons/ArrowUp'
import Transaction from 'Transaction'

function TransactionCard({ transaction }: { transaction: Transaction }) {
  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="py-2">
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
    </div>
  )
}

export default TransactionCard
