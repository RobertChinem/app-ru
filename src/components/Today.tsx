import Cardapio from 'Cardapio'

function Today({ cardapio }: { cardapio: Cardapio }) {
  if (!cardapio) return null

  return (
    <div className="rounded-xl border-2 border-gray-100 p-4 shadow-md">
      <h1 className="text-2xl">{cardapio.dia}</h1>
      <div>
        <h2 className="text-xl">Almoço</h2>
        <div>
          <h3 className="text-lg">Principal</h3>
          {cardapio.almoco.principal}
        </div>
        <div>
          <h3 className="text-lg">Vegetariano</h3>
          {cardapio.almoco.vegetariano}
        </div>
        <div>
          <h3 className="text-lg">Guarnição</h3>
          {cardapio.almoco.guarnicao}
        </div>
      </div>
      <div>
        <h2 className="text-xl">Jantar</h2>
        <div>
          <h3 className="text-lg">Principal</h3>
          {cardapio.jantar.principal}
        </div>
        <div>
          <h3 className="text-lg">Vegetariano</h3>
          {cardapio.jantar.vegetariano}
        </div>
        <div>
          <h3 className="text-lg">Guarnição</h3>
          {cardapio.jantar.guarnicao}
        </div>
      </div>
    </div>
  )
}

export default Today
