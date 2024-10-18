import * as transactionRepository from "../repositories/transaction.js";

export class TransactionService {
    async createTransaction(data, transaction) {
        const transactionData = await transactionRepository.createTransaction(data, transaction);
        return transactionData;
    }
}