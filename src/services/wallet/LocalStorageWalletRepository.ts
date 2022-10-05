import Transaction from 'entities/Transaction'
import IWalletRepository from './IWalletRepository'

class LocalStorageWalletRepository implements IWalletRepository {
  private transactions: Transaction[] = []

  async getTransactions(): Promise<Transaction[]> {
    this.load()
    return this.transactions
  }

  async saveTransaction(transaction: Transaction): Promise<void> {
    this.load()
    this.transactions.push(transaction)
    this.save()
  }

  async deleteTransaction(transaction: Transaction): Promise<void> {
    this.load()
    this.transactions = this.transactions.filter(
      ({ date, amount }) =>
        date.getTime() !== transaction.date.getTime() &&
        amount !== transaction.amount
    )
    this.save()
  }

  private load() {
    this.transactions = []
    const transactions = localStorage.getItem('transactions') || '[]'
    this.transactions = (JSON.parse(transactions) as Transaction[]).map(
      ({ amount, date }) => ({
        amount,
        date: new Date(date)
      })
    )
  }

  private save() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions))
  }
}

export default new LocalStorageWalletRepository()
