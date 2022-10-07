import { useMeet } from 'contexts/useMeet'

function MeetCreateGroup() {
  const { createGroup } = useMeet()

  async function handleCreateGroup() {
    await createGroup()
  }
  return (
    <div className="p-4 pt-8">
      <h1 className="text-4xl font-bold">Encontro</h1>

      <div className="mt-80 flex justify-center">
        <button
          onClick={handleCreateGroup}
          className="rounded-lg bg-green-700 px-5 py-2.5 text-lg font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
        >
          Criar grupo
        </button>
      </div>
    </div>
  )
}

export default MeetCreateGroup
