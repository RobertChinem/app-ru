import Cardapio from 'entities/Cardapio'
import Today from './Today'

function ListAllCardapios({ cardapios }: { cardapios: Cardapio[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 pt-4">
      {cardapios.map((cardapio, index) => (
        <Today key={index} cardapio={cardapio} />
      ))}
    </div>
  )
}

export default ListAllCardapios
