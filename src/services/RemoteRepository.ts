import axios from 'axios'

interface State {
  code: {
    source_code: string
    language_id: number
    stdin: string
  }
  id: string
  message: string
  parent_commit: string
  timestamp: number
  username: string
}

interface Commit {
  name: string
  states: State[]
}

class RemoteRepository<T> {
  private BASE_URL = 'https://backend-coding-platform.herokuapp.com'

  private commit: Commit = { name: '', states: [] }

  async create(): Promise<string> {
    const { data } = await axios.post(`${this.BASE_URL}/code-environments`)
    await this.loadCommits(data._id)
    return data._id
  }

  async save({ envId, data }: { envId: string; data: T }): Promise<void> {
    await this.loadCommits(envId)
    await axios.post(`${this.BASE_URL}/code-environments/${envId}/states`, {
      message: 'new commit',
      code: {
        source_code: JSON.stringify(data),
        language_id: 71,
        stdin: ''
      },
      username: 'App',
      parent_commit: ''
    })
  }

  async get(envId: string): Promise<T> {
    await this.loadCommits(envId)
    const lastState = this.commit.states[this.commit.states.length - 1]
    return JSON.parse(lastState.code.source_code)
  }

  private async loadCommits(envId: string) {
    const { data } = await axios.get(
      `${this.BASE_URL}/code-environments/${envId}`
    )
    this.commit = data
  }
}

export default RemoteRepository
