import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("../../utils/db.js", () => {
    return {
        prisma: {
            transactions: {
                create: jest.fn(),
                findMany: jest.fn(),
                findUnique: jest.fn(),
                delete: jest.fn(),
            },
        },
    };
});

const { prisma } = await import("../../utils/db.js");

const transactionRepository = await import("../transaction.js");

describe("Transaction Repository", () => {
    describe("createTransaction", () => {
        it("should call prisma.transaction.create with correct data", async () => {
            const data = {
                sourceAccountId: 1,
                destinationAccountId: 2,
                amount: 1000,
            };
            const transaction = {
                transactions: {
                    create: jest.fn(),
                },
            };
            await transactionRepository.createTransaction(data, transaction);
            expect(transaction.transactions.create).toHaveBeenCalledWith({
                data,
            });
        });
    });

    describe("getAllTransactions", () => {
        it("should call prisma.transaction.findMany", async () => {
            await transactionRepository.getAllTransactions();
            expect(prisma.transactions.findMany).toHaveBeenCalled();
        });
    });

    describe("getTransactionById", () => {
        it("should call prisma.transaction.findUnique with correct id", async () => {
            const id = 1;
            await transactionRepository.getTransactionById(id);
            expect(prisma.transactions.findUnique).toHaveBeenCalledWith({
                where: {
                    id,
                },
                include: {
                    source_account: true,
                    destination_account: true,
                }
            });
        });
    });

    describe("deleteTransaction", () => {
        it("should call prisma.transaction.delete with correct id", async () => {
            const id = 1;
            await transactionRepository.deleteTransaction(id);
            expect(prisma.transactions.delete).toHaveBeenCalledWith({
                where: {
                    id,
                },
            });
        });
    });
});

