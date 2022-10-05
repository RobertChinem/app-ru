import ArrowDown from 'icons/ArrowDown'
import CurrencyDollar from 'icons/CurrencyDollar'
import { useState } from 'react'
import Transaction from 'Transaction'
import Card from './Card'
import TransactionCard from './TransactionCard'

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
            <TransactionCard key={index} transaction={transaction} />
          ))}
      </div>
    </div>
  )
}

export default Wallet
