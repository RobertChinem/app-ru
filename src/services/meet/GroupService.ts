import RemoteRepository from 'services/RemoteRepository'
import BookService from './BookService'
import Group from './Group'

class GroupService {
  static repository: RemoteRepository<Group> = new RemoteRepository<Group>()

  static async create(): Promise<Group> {
    const groupId = await GroupService.repository.create()
    await GroupService.save({ id: groupId, userBookIds: [] })
    return await GroupService.getGroup(groupId)
  }

  static async getGroup(id: string): Promise<Group> {
    return await GroupService.repository.get(id)
  }

  static async save(group: Group): Promise<Group> {
    await GroupService.repository.save({ envId: group.id, data: group })
    return await GroupService.getGroup(group.id)
  }

  static async addFriend(groupId: string): Promise<Group> {
    const group = await GroupService.getGroup(groupId)
    const book = await BookService.create()
    group.userBookIds.push(book.id)
    return await GroupService.save(group)
  }

  static async deleteUser(groupId: string, bookId: string): Promise<Group> {
    const group = await GroupService.getGroup(groupId)
    group.userBookIds = group.userBookIds.filter((id) => id !== bookId)
    return await GroupService.save(group)
  }

  static async removeFriend(id: string, bookId: string): Promise<Group> {
    const group = await GroupService.getGroup(id)
    group.userBookIds = group.userBookIds.filter((id) => id !== bookId)
    return await GroupService.save(group)
  }
}

export default GroupService
