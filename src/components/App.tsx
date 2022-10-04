import axios from 'axios'
import Cardapio from 'Cardapio'
import Home from 'icons/Home'
import { ReactNode, useEffect, useState } from 'react'
import Today from './Today'

const routes: Array<{ icon: ReactNode; route: string }> = [
  {
    icon: <Home />,
    route: 'all'
  }
]
function Navbar() {
  return (
    <div className="grid h-full grid-flow-col gap-4 bg-gray-100 flex align-items-center">
      {routes.map(({ route, icon }, index) => (
        <div key={index}>
          <button
            className={`flex h-full w-full items-center justify-center p-4`}
          >
            {icon}
          </button>
        </div>
      ))}
    </div>
  )
}

function ListAllCardapios({ cardapios }: { cardapios: Cardapio[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 pt-4">
      {cardapios.map((cardapio, index) => (
        <Today key={index} cardapio={cardapio} />
      ))}
    </div>
  )
}

function Pages({ route, cardapios }: { route: string; cardapios: Cardapio[] }) {
  switch (route) {
    case 'all':
      return <ListAllCardapios cardapios={cardapios} />
    default:
      return null
  }
}

function App() {
  const [cardapios, setCardapios] = useState<Cardapio[]>([])

  useEffect(() => {
    async function request() {
      const { data } = await axios.get(
        'https://api-ufabc-ru.herokuapp.com/week'
      )
      setCardapios(data)
    }
    request()
  }, [])

  return (
    <div className="flex h-screen flex-col">
      <div className="grow overflow-y-scroll">
        <Pages route={'all'} cardapios={cardapios} />
      </div>
      <div className="h-12">
        <Navbar />
      </div>
    </div>
  )
}

export default App
