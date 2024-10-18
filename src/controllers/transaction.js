import { TransactionService } from "../services/transaction.js";
import { AccountService } from "../services/account.js";
import { prisma } from "../utils/db.js";

export async function createTransaction(req, res) {
    const transactionService = new TransactionService();
    const accountService = new AccountService();
    const destAccount = res.locals.destAccount;
    const account = res.locals.account;
    const { amount } = req.body;
    try{
        const data = await prisma.$transaction(async (transaction) => {
            await accountService.updateAccountById(account.id, { balance : account.balance - amount }, transaction);
            await accountService.updateAccountById(destAccount.id, { balance: destAccount.balance + amount }, transaction);
            const transactionPayload = {
                sourceAccountId: account.userId,
                destinationAccountId: destAccount.userId,
                amount,
            };
            const transactionData = await transactionService.createTransaction(transactionPayload, transaction);
            return transactionData;
        }
        );
        
        res.status(201).json({
            message: "Transaction created successfully",
            data,
        });
    }
    catch(error){
        res.status(500).json({
            message: error.message
        });
    }
}

export async function getTransactionById(_req, res) {
    const id = res.locals.id;
    const service = new TransactionService();

    try {
        const transaction = await service.getTransactionById(id);

        if (!transaction) {
            res.status(404).json({
                message: "Transaction not found",
            });
            return;
        }

        res.status(200).json({
            data: transaction,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}

export async function getAllTransaction(_req, res) {
    const service = new TransactionService();

    try {
        const transactions = await service.getAllTransactions();

        res.status(200).json({
            message: "Transactions retrieved successfully",
            data: transactions,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
}