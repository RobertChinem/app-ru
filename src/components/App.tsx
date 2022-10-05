import axios from 'axios'
import Cardapio from 'Cardapio'
import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Pages from './Pages'

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
