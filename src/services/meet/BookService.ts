import RemoteRepository from 'services/RemoteRepository'
import Book from './Book'

class BookService {
  static repository: RemoteRepository<Book> = new RemoteRepository<Book>()

  static async create(): Promise<Book> {
    const bookId = await BookService.repository.create()
    await BookService.save({
      id: bookId,
      username: 'New Friend',
      freeTime: {
        start: new Date(),
        end: new Date()
      },
      updatedAt: new Date()
    })
    return await BookService.getBook(bookId)
  }

  static async getBook(id: string): Promise<Book> {
    const bookData = await BookService.repository.get(id)
    const book: Book = {
      ...bookData,
      freeTime: {
        start: new Date(bookData.freeTime.start),
        end: new Date(bookData.freeTime.end)
      },
      updatedAt: new Date(bookData.updatedAt)
    }
    return book
  }

  static async save(book: Book): Promise<Book> {
    await BookService.repository.save({ envId: book.id, data: book })
    return await BookService.getBook(book.id)
  }
}

export default BookService
