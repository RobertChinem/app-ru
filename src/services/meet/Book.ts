interface Book {
  id: string
  username: string
  freeTime: {
    start: Date
    end: Date
  }
  updatedAt: Date
}

export default Book
