import { prisma } from "../utils/db.js";

export function createTransaction(data, transaction) {
    return transaction.transaction.create({
        data,
    });
}

export function getAllTransactions() {
    return prisma.transaction.findMany();
}

export function getTransactionById(id) {
    return prisma.transaction.findUnique({
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
    return prisma.transaction.delete({
        where: {
            id,
        },
    });
}