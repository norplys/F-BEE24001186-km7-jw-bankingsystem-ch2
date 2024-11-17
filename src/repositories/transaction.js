import { prisma } from "../utils/db.js";

export function createTransaction(data, transaction) {
    return transaction.transactions.create({
        data,
    });
}

export function getAllTransactions() {
    return prisma.transactions.findMany();
}

export function getTransactionById(id) {
    return prisma.transactions.findUnique({
        where: {
            id,
        },
        include: {
            source_account: true,
            destination_account: true,
        }
    });
}

export function deleteTransaction(id) {
    return prisma.transactions.delete({
        where: {
            id,
        },
    });
}