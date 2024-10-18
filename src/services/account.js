import * as accountRepository from "../repositories/account.js";

export class AccountService {
    async createAccount(data) {
        const account = await accountRepository.createAccount(data);
        return account;
    }

    async getAccountById(id) {
        const account = await accountRepository.getAccountById(id);
        return account;
    }

    async getAllAccount() {
        const accounts = await accountRepository.getAllAccount();
        return accounts;
    }

    async getAccountByAccountNumber(bankAccountNumber) {
        const account = await accountRepository.getAccountByAccountNumber(bankAccountNumber);
        return account;
    }

    async updateAccountById(id, data, transaction = null) {
        const account = await accountRepository.updateAccountById(id, data, transaction);
        return account;
    }

    async getAccountByUserIdAndAccountNumber(userId, accountNumber) {
        const account = await accountRepository.getAccountByUserIdAndAccountNumber(userId, accountNumber);
        return account;
    }
}