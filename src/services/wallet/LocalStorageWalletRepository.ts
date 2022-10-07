import Transaction from 'entities/Transaction'
import LocalSave from 'services/LocalSave'
import IWalletRepository from './IWalletRepository'

class LocalStorageWalletRepository implements IWalletRepository {
  private transactions: Transaction[] = []

  async getTransactions(): Promise<Transaction[]> {
    await this.load()
    return this.transactions
  }

  async saveTransaction(transaction: Transaction): Promise<void> {
    await this.load()
    this.transactions.push(transaction)
    this.save()
  }

  async deleteTransaction(transaction: Transaction): Promise<void> {
    await this.load()
    this.transactions = this.transactions.filter(
      ({ id }) => id !== transaction.id
    )
    this.save()
  }

  private async load() {
    this.transactions = []
    const transactions = (await LocalSave.load('transactions')) || '[]'
    this.transactions = (JSON.parse(transactions) as Transaction[]).map(
      ({ id, amount, date }) => ({
        id,
        amount,
        date: new Date(date)
      })
    )
  }

  private async save() {
    await LocalSave.save('transactions', JSON.stringify(this.transactions))
  }
}

export default new LocalStorageWalletRepository()
