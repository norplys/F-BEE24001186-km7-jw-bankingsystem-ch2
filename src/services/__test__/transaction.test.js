import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("../../repositories/transaction.js",
    () => ({
        createTransaction: jest.fn(),
        getTransactionById: jest.fn(),
        getAllTransactions: jest.fn(),
        deleteTransaction: jest.fn(),
    })
);

const transactionRepository = await import("../../repositories/transaction.js");
const { TransactionService } = await import("../../services/transaction.js");

describe("testTransactionService", () => {
    let service;
    const transactionData = {
        id: 1,
        amount: 100,
        senderAccountNumber: "1234",
    };

    beforeEach(() => {
        service = new TransactionService();
    });

    describe("createTransaction", () => {
        it("should return the created transaction", async () => {

            transactionRepository.createTransaction.mockResolvedValue(transactionData);

            const transaction = await service.createTransaction(transactionData);

            expect(transaction).toEqual(transactionData);
        });
    });

    describe("getTransactionById", () => {
        it("should return the transaction by id", async () => {

            transactionRepository.getTransactionById.mockResolvedValue(transactionData);

            const transaction = await service.getTransactionById(1);

            expect(transaction).toEqual(transactionData);
        });
    });

    describe("getAllTransactions", () => {
        it("should return all transactions", async () => {
            const transactions = [transactionData, transactionData];

            transactionRepository.getAllTransactions.mockResolvedValue(transactions);

            const result = await service.getAllTransactions();

            expect(result).toEqual(transactions);
        }
        );
    }
    );

    describe("deleteTransaction", () => {
        it("should return the deleted transaction", async () => {

            transactionRepository.deleteTransaction.mockResolvedValue(transactionData);

            const transaction = await service.deleteTransaction(1);

            expect(transaction).toEqual(transactionData);
        });
    });

}
);