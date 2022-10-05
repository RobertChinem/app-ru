import axios from 'axios'
import Cardapio from 'entities/Cardapio'
import Transaction from 'entities/Transaction'
import { useEffect, useState } from 'react'
import WalletService from 'services/wallet/WalletService'
import Navbar from './Navbar'
import Pages from './Pages'

function App() {
  const [cardapios, setCardapios] = useState<Cardapio[]>([])
  const [route, setRoute] = useState('today')
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    async function request() {
      const { data } = await axios.get(
        'https://api-ufabc-ru.herokuapp.com/week'
      )
      setCardapios(data)
      setTransactions(await WalletService.getTransactions())
    }
    request()
  }, [])

  async function handleAddTransaction(transaction: Transaction) {
    setTransactions([...transactions, transaction])
    await WalletService.saveTransaction(transaction)
  }

  async function handleRemoveTransaction(transaction: Transaction) {
    setTransactions(
      transactions.filter(
        ({ amount, date }) =>
          date !== transaction.date && amount !== transaction.amount
      )
    )
    await WalletService.deleteTransaction(transaction)
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="grow overflow-y-scroll">
        <Pages
          handleAddTransaction={handleAddTransaction}
          handleRemoveTransaction={handleRemoveTransaction}
          transactions={transactions}
          route={route}
          cardapios={cardapios}
        />
      </div>
      <div>
        <Navbar route={route} setRoute={setRoute} />
      </div>
    </div>
  )
}

export default App
