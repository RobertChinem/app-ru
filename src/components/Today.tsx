import Cardapio from 'entities/Cardapio'
import Moon from 'icons/Moon'
import Sun from 'icons/Sun'
import { useState } from 'react'
import LocalSave from 'services/LocalSave'
import { useEffect } from 'react'

function Today({ cardapio }: { cardapio: Cardapio }) {
  const [data, setData] = useState('none')
  useEffect(() => {
    async function f() {
      setData(await LocalSave.load('meet:groupId'))
    }
    f()
  }, [])

  if (!cardapio) return null

  return (
    <div className="rounded-xl border p-4">
      <p>{data}</p>
      <h1 className="text-3xl font-bold">{cardapio.dia}</h1>
      <div className="mt-4 grid grid-cols-1 gap-4">
        <div className="rounded-xl bg-amber-100/20 p-4 shadow-md shadow-amber-200">
          <div className="mb-4 flex w-full items-center rounded-lg">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-500">
              <Sun />
            </div>
            <div className="ml-3 text-sm font-bold">
              <h1 className="text-xl">Almoço</h1>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div>
              <h3 className="text-lg font-medium leading-4">Principal</h3>
              <span className="text-sm font-light">
                {cardapio.almoco.principal}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-medium leading-4">Vegetariano</h3>
              <span className="text-sm font-light">
                {cardapio.almoco.vegetariano}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-medium leading-4">Guarnição</h3>
              <span className="text-sm font-light">
                {cardapio.almoco.guarnicao}
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-blue-100/20 p-4 shadow-md shadow-blue-200">
          <div className="mb-4 flex w-full items-center rounded-lg">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-200 text-blue-800">
              <Moon />
            </div>
            <div className="ml-3 text-sm font-bold">
              <h1 className="text-xl">Jantar</h1>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div>
              <h3 className="text-lg font-medium leading-4">Principal</h3>
              <span className="text-sm font-light">
                {cardapio.jantar.principal}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-medium leading-4">Vegetariano</h3>
              <span className="text-sm font-light">
                {cardapio.jantar.vegetariano}
              </span>
            </div>
            <div>
              <h3 className="text-lg font-medium leading-4">Guarnição</h3>
              <span className="text-sm font-light">
                {cardapio.jantar.guarnicao}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Today
