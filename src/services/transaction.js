import * as transactionRepository from "../repositories/transaction.js";

export class TransactionService {
    async createTransaction(data, transaction) {
        const transactionData = await transactionRepository.createTransaction(data, transaction);
        return transactionData;
    }

    async getTransactionById(id) {
        const transaction = await transactionRepository.getTransactionById(id);
        return transaction;
    }

    async getAllTransactions() {
        const transactions = await transactionRepository.getAllTransactions();
        return transactions;
    }
}