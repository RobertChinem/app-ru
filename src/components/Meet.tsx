import { useMeet } from 'contexts/useMeet'
import { useState } from 'react'
import Book from 'services/meet/Book'
import MeetCreateGroup from './MeetCreateGroup'

const millisecondInDay = 1000 * 60 * 60 * 24
function formatTime(date: Date) {
  return new Intl.DateTimeFormat('pt-BR', {
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

function Visualization() {
  const { books } = useMeet()
  const last24h = books.filter(
    ({ updatedAt }) => updatedAt.getTime() > Date.now() - millisecondInDay
  )
  const users = last24h.map((book) => book.username)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  function toggleUser(username: string) {
    if (selectedUsers.includes(username)) {
      setSelectedUsers(selectedUsers.filter((user) => user !== username))
    } else {
      setSelectedUsers([...selectedUsers, username])
    }
  }

  function getOverlap() {
    const selectedBooks = books.filter((book) =>
      selectedUsers.includes(book.username)
    )
    const intersection = {
      start: 0,
      end: 1e18,
      error: false
    }

    if (selectedBooks.length === 0) {
      return {
        ...intersection,
        error: true
      }
    }

    selectedBooks.forEach((book) => {
      if (book.freeTime.start.getTime() > intersection.start) {
        intersection.start = book.freeTime.start.getTime()
      }
      if (book.freeTime.end.getTime() < intersection.end) {
        intersection.end = book.freeTime.end.getTime()
      }
    })

    return intersection
  }

  function getMinutesFromMidnight(date: Date) {
    return date.getHours() * 60 + date.getMinutes()
  }

  const overlap = {
    start: new Date(getOverlap().start),
    end: new Date(getOverlap().end),
    error: getOverlap().error
  }

  const remPerMinute = 20 / (10 * 60)
  const startRU = 11 * 60

  return (
    <div>
      <div className="mt-16 w-full gap-4">
        {users.map((user, index) => (
          <button
            onClick={() => toggleUser(user)}
            key={index}
            className={`mr-4 mb-4 rounded-xl py-1 px-4 font-medium ${
              selectedUsers.includes(user) ? 'bg-gray-400' : 'bg-gray-100'
            }`}
          >
            {user}
          </button>
        ))}
      </div>
      <div className="mx-auto mt-8 flex h-16 items-center justify-center rounded-lg shadow">
        <div style={{ width: '20rem' }}>
          {!overlap.error && (
            <div
              className="inline-flex h-12 items-center justify-between rounded-lg bg-lime-300/80 px-2"
              style={{
                marginLeft: `${
                  remPerMinute *
                  (getMinutesFromMidnight(overlap.start) - startRU)
                }rem`,
                minWidth: `${
                  remPerMinute *
                  (getMinutesFromMidnight(overlap.end) -
                    getMinutesFromMidnight(overlap.start))
                }rem`
              }}
            >
              <div className="w-full">
                <p className="text-start text-xs font-semibold">
                  {formatTime(overlap.start)}
                </p>
                <p className="text-end text-xs font-semibold">
                  {formatTime(overlap.end)}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function MeetDetails() {
  const { books, group, addFriend, updateBook, removeFriend, leaveGroup } =
    useMeet()
  const [openFriendList, setOpenFriendList] = useState(false)
  const [username, setUsername] = useState<string>('')
  const [id, setId] = useState<string>('')
  const [freeTime, setFreeTime] = useState<{ start: Date; end: Date }>({
    start: new Date(),
    end: new Date()
  })
  const [updatedAt, setUpdatedAt] = useState<Date>(new Date())

  function handleOpenFriendList() {
    setOpenFriendList(!openFriendList)
  }

  async function handleAddFriend() {
    await addFriend()
  }

  async function handleSave() {
    if (!id) return
    const updatedBook = {
      id,
      username,
      freeTime,
      updatedAt: new Date()
    }
    await updateBook(updatedBook)
    setUpdatedAt(updatedBook.updatedAt)
  }

  function formatDate(date: Date) {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  function handleSelectUser(book: Book) {
    setUsername(book.username)
    setId(book.id)
    setFreeTime(book.freeTime)
    setUpdatedAt(book.updatedAt)
  }

  async function handleDeleteUser() {
    if (!id || !group) return
    await removeFriend(id)
    setId('')
  }

  function handleCopyLink() {
    if (group) {
      navigator.clipboard.writeText(
        `${window.location.href}?groupId=${group.id}`
      )
    }
  }

  return (
    <div className="px-4 pt-4 pb-16">
      <div className="flex justify-end">
        <button
          onClick={() => leaveGroup()}
          className="px-4 py-2 text-blue-600"
        >
          Sair
        </button>
      </div>
      <h1 className="text-4xl font-bold">Encontro</h1>
      <div className="mt-8">
        <button onClick={handleOpenFriendList} className="py-2 text-blue-600">
          Lista de amigos
        </button>
        {openFriendList && (
          <div>
            <div className="flex justify-end">
              <button onClick={handleAddFriend} className="text-blue-600">
                Adicionar
              </button>
            </div>
            <div className="mt-4 divide-y">
              {books.map((book, index) => (
                <div key={index}>
                  <button
                    onClick={() => handleSelectUser(book)}
                    className="w-full py-2 text-start"
                  >
                    <h3 className="text-xl text-gray-900">{book.username}</h3>
                    <p className="text-sm text-gray-500">
                      {`${formatTime(book.freeTime.start)} - ${formatTime(
                        book.freeTime.end
                      )}`}
                    </p>
                    <p className="text-sm text-gray-500">
                      Última atualização {formatDate(book.updatedAt)}
                    </p>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {id && openFriendList && (
        <div>
          <div className="flex justify-end">
            <button
              onClick={handleDeleteUser}
              className="mt-4 p-2 text-right text-blue-600"
            >
              Remover
            </button>
          </div>
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm font-medium text-gray-900"
            >
              Nome
            </label>
            <input
              type="text"
              id="username"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Digite seu nome"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="date-start"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Horário mínimo
              </label>
              <input
                value={`${formatTime(freeTime.start)}`}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':')
                  setFreeTime({
                    ...freeTime,
                    start: new Date(
                      freeTime.start.getFullYear(),
                      freeTime.start.getMonth(),
                      freeTime.start.getDate(),
                      Number(hours),
                      Number(minutes)
                    )
                  })
                }}
                id="date-start"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                type="time"
              />
            </div>
            <div>
              <label
                htmlFor="date-end"
                className="mb-2 block text-sm font-medium text-gray-900"
              >
                Horário máximo
              </label>
              <input
                id="date-end"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                type="time"
                value={`${formatTime(freeTime.end)}`}
                onChange={(e) => {
                  const [hours, minutes] = e.target.value.split(':')
                  setFreeTime({
                    ...freeTime,
                    end: new Date(
                      freeTime.end.getFullYear(),
                      freeTime.end.getMonth(),
                      freeTime.end.getDate(),
                      Number(hours),
                      Number(minutes)
                    )
                  })
                }}
              />
            </div>
          </div>
          <div className="mt-4">
            <p className="mb-4 text-center">
              Última atualização {formatDate(updatedAt)}
            </p>
            <button
              onClick={handleSave}
              type="button"
              className="w-full rounded-lg bg-green-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
            >
              Salvar
            </button>
          </div>
        </div>
      )}
      <Visualization />

      <div className="mt-8 flex justify-center">
        <button onClick={handleCopyLink} className="py-2 px-6 text-blue-600">
          Copiar link
        </button>
      </div>
    </div>
  )
}

function Meet() {
  const { group } = useMeet()

  if (!group) return <MeetCreateGroup />
  return <MeetDetails />
}

export default Meet
