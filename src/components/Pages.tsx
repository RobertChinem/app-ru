import Cardapio from 'entities/Cardapio'
import Transaction from 'entities/Transaction'
import CardapioToday from './CardapioToday'
import ListAllCardapios from './ListAllCardapios'
import Wallet from './Wallet'

interface PagesProps {
  route: string
  cardapios: Cardapio[]
  handleAddTransaction: (transaction: Transaction) => void
  handleRemoveTransaction: (transaction: Transaction) => void
  transactions: Transaction[]
}

function Pages({
  route,
  cardapios,
  handleAddTransaction,
  handleRemoveTransaction,
  transactions
}: PagesProps) {
  switch (route) {
    case 'all':
      return <ListAllCardapios cardapios={cardapios} />
    case 'today':
      return <CardapioToday cardapios={cardapios} />
    case 'wallet':
      return (
        <Wallet
          handleAddTransaction={handleAddTransaction}
          handleRemoveTransaction={handleRemoveTransaction}
          transactions={transactions}
        />
      )
    default:
      return null
  }
}

export default Pages
