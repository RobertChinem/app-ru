import { useMeet } from 'contexts/useMeet'
import Cardapio from 'entities/Cardapio'
import Transaction from 'entities/Transaction'
import { useEffect } from 'react'
import LocalSave from 'services/LocalSave'
import CardapioToday from './CardapioToday'
import ListAllCardapios from './ListAllCardapios'
import Meet from './Meet'
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
  const { joinGroup } = useMeet()

  useEffect(() => {
    async function handleJoinGroup() {
      const searchParams = new URLSearchParams(window.location.search)
      const groupId = searchParams.get('groupId')
      if (groupId) {
        LocalSave.save('meet:groupId', groupId)
        await joinGroup(groupId)
        window.location.href = '/'
      }
    }
    handleJoinGroup()
  }, [joinGroup])

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
    case 'meet':
      return <Meet />
    default:
      return null
  }
}

export default Pages
