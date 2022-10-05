import Cardapio from 'Cardapio'
import CardapioToday from './CardapioToday'
import ListAllCardapios from './ListAllCardapios'

function Pages({ route, cardapios }: { route: string; cardapios: Cardapio[] }) {
  switch (route) {
    case 'all':
      return <ListAllCardapios cardapios={cardapios} />
    case 'today':
      return <CardapioToday cardapios={cardapios} />
    default:
      return null
  }
}

export default Pages
