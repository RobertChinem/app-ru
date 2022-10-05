import Cardapio from 'Cardapio'
import Today from './Today'

function CardapioToday({ cardapios }: { cardapios: Cardapio[] }) {
  const day = new Date().getDay()
  const cardapio = cardapios[day]

  return (
    <div className="px-4 pt-4">
      <Today cardapio={cardapio} />
    </div>
  )
}

export default CardapioToday
