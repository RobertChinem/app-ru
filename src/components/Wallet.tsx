import ArrowDown from 'icons/ArrowDown'
import ArrowUp from 'icons/ArrowUp'
import CurrencyDollar from 'icons/CurrencyDollar'
import { useState } from 'react'

interface Transaction {
  date: Date
  amount: number
}

function Card({ balance }: { balance: number }) {
  return (
    <div className="h-44 w-80 rounded-xl bg-lime-400 p-4 shadow-xl shadow-lime-200">
      <h1 className="text-2xl font-medium">Saldo {balance} créditos</h1>
    </div>
  )
}

function Transaction({ transaction }: { transaction: Transaction }) {
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

function Wallet() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  function handleIncreaseCredit() {
    setTransactions([
      ...transactions,
      {
        date: new Date(),
        amount: 1
      }
    ])
  }

  function handleDecreaseCredit() {
    setTransactions([
      ...transactions,
      {
        date: new Date(),
        amount: -1
      }
    ])
  }

  const balance = transactions.reduce((acc, { amount }) => acc + amount, 0)

  return (
    <div className="p-4 pt-8">
      <h1 className="text-4xl font-bold">Carteira</h1>
      <div className="mt-8 flex justify-center">
        <Card balance={balance} />
      </div>
      <div className="mt-8 flex justify-between">
        <button
          onClick={handleIncreaseCredit}
          className="inline-flex items-center rounded-lg border border-gray-200 bg-white p-4 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 "
        >
          <CurrencyDollar />
          <span className="ml-2">Adicionar saldo</span>
        </button>
        <button
          onClick={handleDecreaseCredit}
          className="inline-flex items-center rounded-lg border border-red-200 bg-white p-4 text-sm font-medium text-red-500 hover:bg-red-100 hover:text-red-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-red-200 "
        >
          <ArrowDown />
          <span className="ml-2">Descontar</span>
        </button>
      </div>
      <h2 className="mt-8 text-xl font-bold">Transações Recentes</h2>
      <div className="divide-y divide-gray-200">
        {transactions
          .slice()
          .reverse()
          .map((transaction, index) => (
            <Transaction key={index} transaction={transaction} />
          ))}
      </div>
    </div>
  )
}

export default Wallet
