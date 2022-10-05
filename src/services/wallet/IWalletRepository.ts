import Transaction from 'entities/Transaction'

interface IWalletRepository {
  getTransactions(): Promise<Transaction[]>
  saveTransaction(transaction: Transaction): Promise<void>
  deleteTransaction(transaction: Transaction): Promise<void>
}

export default IWalletRepository
