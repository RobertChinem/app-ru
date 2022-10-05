interface MeetProps {}

function Meet({}: MeetProps) {
  return (
    <div className="p-4 pt-8">
      <h1 className="text-4xl font-bold">Encontro</h1>
      <div className="mt-3">
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Seu nome
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="John"
          required
        />
        <div className="flex justify-end mt-1">
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  )
}

export default Meet
