import axios from 'axios'
import Cardapio from 'Cardapio'
import Home from 'icons/Home'
import ListBullet from 'icons/ListBullet'
import { ReactNode, useEffect, useState } from 'react'
import Today from './Today'

const routes: Array<{ icon: ReactNode; route: string }> = [
  {
    icon: <Home />,
    route: 'today'
  },
  {
    icon: <ListBullet />,
    route: 'all'
  }
]
function Navbar({
  route,
  setRoute
}: {
  route: string
  setRoute: (route: string) => void
}) {
  const currentRoute = route
  return (
    <div className="grid h-full grid-flow-col gap-4 bg-gray-100">
      {routes.map(({ route, icon }, index) => (
        <div key={index}>
          <button
            className={`flex h-full w-full items-center justify-center p-4 ${
              currentRoute !== route ? 'text-gray-400' : ''
            }`}
            onClick={() => setRoute(route)}
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

function CardapioToday({ cardapios }: { cardapios: Cardapio[] }) {
  const day = new Date().getDay()
  const cardapio = cardapios[day]

  return (
    <div className="px-4 pt-4">
      <Today cardapio={cardapio} />
    </div>
  )
}

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

function App() {
  const [cardapios, setCardapios] = useState<Cardapio[]>([])
  const [route, setRoute] = useState('today')

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
        <Pages route={route} cardapios={cardapios} />
      </div>
      <div>
        <Navbar route={route} setRoute={setRoute} />
      </div>
    </div>
  )
}

export default App
