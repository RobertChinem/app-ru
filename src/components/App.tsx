import axios from 'axios'
import Cardapio from 'Cardapio'
import { useEffect, useState } from 'react'
import Today from './Today'

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
    <div className="grid grid-cols-1 gap-4">
      {cardapios.map((cardapio, index) => (
        <Today key={index} cardapio={cardapio} />
      ))}
    </div>
  )
}

export default App
