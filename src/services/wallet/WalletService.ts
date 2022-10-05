import Transaction from 'entities/Transaction'
import IWalletRepository from './IWalletRepository'
import LocalStorageWalletRepository from './LocalStorageWalletRepository'

class WalletService {
  private readonly walletRepository: IWalletRepository =
    LocalStorageWalletRepository

  getTransactions(): Promise<Transaction[]> {
    return this.walletRepository.getTransactions()
  }

  saveTransaction(transaction: Transaction): Promise<void> {
    return this.walletRepository.saveTransaction(transaction)
  }

  deleteTransaction(transaction: Transaction): Promise<void> {
    return this.walletRepository.deleteTransaction(transaction)
  }
}

export default new WalletService()
