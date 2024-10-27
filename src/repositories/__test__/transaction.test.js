import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("../../utils/db.js", () => {
    return {
        prisma: {
            transaction: {
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
                transaction: {
                    create: jest.fn(),
                },
            };
            await transactionRepository.createTransaction(data, transaction);
            expect(transaction.transaction.create).toHaveBeenCalledWith({
                data,
            });
        });
    });

    describe("getAllTransactions", () => {
        it("should call prisma.transaction.findMany", async () => {
            await transactionRepository.getAllTransactions();
            expect(prisma.transaction.findMany).toHaveBeenCalled();
        });
    });

    describe("getTransactionById", () => {
        it("should call prisma.transaction.findUnique with correct id", async () => {
            const id = 1;
            await transactionRepository.getTransactionById(id);
            expect(prisma.transaction.findUnique).toHaveBeenCalledWith({
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
            expect(prisma.transaction.delete).toHaveBeenCalledWith({
                where: {
                    id,
                },
            });
        });
    });
});

