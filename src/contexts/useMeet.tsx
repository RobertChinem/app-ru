import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import Book from 'services/meet/Book'
import BookService from 'services/meet/BookService'
import Group from 'services/meet/Group'
import GroupService from 'services/meet/GroupService'

interface MeetProviderProps {
  children: ReactNode
}

interface MeetContextData {
  group: Group | null
  books: Book[]
  removeFriend: (bookId: string) => Promise<void>
  joinGroup: (groupId: string) => Promise<void>
  createGroup: () => Promise<void>
  addFriend: () => Promise<void>
  updateBook: (book: Book) => Promise<void>
  leaveGroup: () => void
}

const MeetContext = createContext<MeetContextData>({} as MeetContextData)

export function MeetProvider({ children }: MeetProviderProps) {
  const [group, setGroup] = useState<Group | null>(null)
  const [books, setBooks] = useState<Book[]>([])

  useEffect(() => {
    async function loadGroup() {
      const groupId = localStorage.getItem('meet:groupId')
      if (groupId) {
        await joinGroup(groupId)
      }
    }
    if (!group) {
      loadGroup()
    }
  }, [group])

  async function joinGroup(groupId: string) {
    const group = await GroupService.getGroup(groupId)
    setGroup(group)
    setBooks(
      await Promise.all(
        group.userBookIds.map(
          async (bookId) => await BookService.getBook(bookId)
        )
      )
    )
  }

  async function createGroup() {
    const group = await GroupService.create()
    localStorage.setItem('meet:groupId', group.id)
    setGroup(group)
  }

  async function addFriend() {
    if (!group) return
    const updatedGroup = await GroupService.addFriend(group.id)
    setGroup(updatedGroup)
    setBooks(
      await Promise.all(
        updatedGroup.userBookIds.map(
          async (bookId) => await BookService.getBook(bookId)
        )
      )
    )
  }

  async function updateBook(book: Book) {
    if (!group) return
    await BookService.save(book)
    setBooks(
      await Promise.all(
        group.userBookIds.map(
          async (bookId) => await BookService.getBook(bookId)
        )
      )
    )
  }

  async function removeFriend(bookId: string) {
    if (!group) return
    const updatedGroup = await GroupService.removeFriend(group.id, bookId)
    setGroup(updatedGroup)
    setBooks(
      await Promise.all(
        updatedGroup.userBookIds.map(
          async (bookId) => await BookService.getBook(bookId)
        )
      )
    )
  }

  function leaveGroup() {
    localStorage.removeItem('meet:groupId')
    setGroup(null)
    setBooks([])
  }

  return (
    <MeetContext.Provider
      value={{
        group,
        books,
        removeFriend,
        joinGroup,
        createGroup,
        addFriend,
        updateBook,
        leaveGroup
      }}
    >
      {children}
    </MeetContext.Provider>
  )
}

export function useMeet() {
  return useContext(MeetContext)
}
