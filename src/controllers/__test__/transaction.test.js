import { describe, jest } from "@jest/globals";

const mockCreateTransaction = jest.fn();
const mockGetTransactionById = jest.fn();
const mockGetAllTransactions = jest.fn();
const mockDeleteTransaction = jest.fn();

jest.unstable_mockModule("../../services/transaction.js", () => ({
  TransactionService: jest.fn().mockImplementation(() => ({
    createTransaction: mockCreateTransaction,
    getTransactionById: mockGetTransactionById,
    getAllTransactions: mockGetAllTransactions,
    deleteTransaction: mockDeleteTransaction,
  })),
}));

const mockGetAccountById = jest.fn();
const mockGetAllAccount = jest.fn();
const mockGetAccountByAccountNumber = jest.fn();
const mockCreateAccount = jest.fn();
const mockUpdateAccountById = jest.fn();
const mockGetAccountByUserIdAndAccountNumber = jest.fn();

jest.unstable_mockModule("../../services/account.js", () => ({
  AccountService: jest.fn().mockImplementation(() => ({
    createAccount: mockCreateAccount,
    getAccountById: mockGetAccountById,
    getAllAccount: mockGetAllAccount,
    getAccountByAccountNumber: mockGetAccountByAccountNumber,
    updateAccountById: mockUpdateAccountById,
    getAccountByUserIdAndAccountNumber: mockGetAccountByUserIdAndAccountNumber,
  })),
}));

const mockPrisma = {
  $transaction: jest.fn(),
};

jest.unstable_mockModule("../../utils/db.js", () => ({
  prisma: mockPrisma,
}));

const transactionController = await import("../transaction.js");

describe("createTransaction", () => {
  it("should create a transaction", async () => {
    const req = {
      body: {
        amount: 100,
      },
    };
    const res = {
      locals: {
        destAccount: {
          id: 1,
          balance: 100,
        },
        account: {
          id: 2,
          balance: 200,
        },
      },
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockPrisma.$transaction.mockImplementation((callback) => callback());

    mockUpdateAccountById.mockResolvedValue({
      id: 2,
      balance: 100,
    });
    mockUpdateAccountById.mockResolvedValue({
      id: 1,
      balance: 200,
    });

    mockCreateTransaction.mockResolvedValue({
      id: 1,
      sourceAccountId: 2,
      destinationAccountId: 1,
      amount: 100,
    });

    await transactionController.createTransaction(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "Transaction created successfully",
      data: {
        id: 1,
        sourceAccountId: 2,
        destinationAccountId: 1,
        amount: 100,
      },
    });
  });

  it("should return 500 if any error occurs", async () => {
    const req = {
      body: {
        amount: 100,
      },
    };
    const res = {
      locals: {
        destAccount: {
          id: 1,
          balance: 100,
        },
        account: {
          id: 2,
          balance: 200,
        },
      },
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockPrisma.$transaction.mockRejectedValue(new Error("Transaction failed"));

    await transactionController.createTransaction(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: "Transaction failed",
    });
  });

  describe("getTransactionById", () => {
    it("should get a transaction by id", async () => {
      const req = {};
      const res = {
        locals: {
          id: 1,
        },
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockGetTransactionById.mockResolvedValue({
        id: 1,
        sourceAccountId: 2,
        destinationAccountId: 1,
        amount: 100,
      });

      await transactionController.getTransactionById(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        data: {
          id: 1,
          sourceAccountId: 2,
          destinationAccountId: 1,
          amount: 100,
        },
      });
    });

    it("should return 404 if transaction not found", async () => {
      const req = {};
      const res = {
        locals: {
          id: 1,
        },
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockGetTransactionById.mockResolvedValue(null);

      await transactionController.getTransactionById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Transaction not found",
      });
    });

    it("should return 500 if any error occurs", async () => {
      const req = {};
      const res = {
        locals: {
          id: 1,
        },
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockGetTransactionById.mockRejectedValue(
        new Error("Internal server error")
      );

      await transactionController.getTransactionById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("getAllTransactions", () => {
    it("should get all transactions", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockGetAllTransactions.mockResolvedValue([
        {
          id: 1,
          sourceAccountId: 2,
          destinationAccountId: 1,
          amount: 100,
        },
      ]);

      await transactionController.getAllTransaction(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Transactions retrieved successfully",
        data: [
          {
            id: 1,
            sourceAccountId: 2,
            destinationAccountId: 1,
            amount: 100,
          },
        ],
      });
    });

    it("should return 500 if any error occurs", async () => {
      const req = {};
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockGetAllTransactions.mockRejectedValue(
        new Error("Internal server error")
      );

      await transactionController.getAllTransaction(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("deleteTransaction", () => {
    it("should delete a transaction", async () => {
      const req = {};
      const res = {
        locals: {
          id: 1,
        },
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await transactionController.deleteTransaction(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Transaction deleted successfully",
      });
    });

    it("should return 500 if any error occurs", async () => {
      const req = {};
      const res = {
        locals: {
          id: 1,
        },
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockDeleteTransaction.mockRejectedValue(
        new Error("Internal server error")
      );

      await transactionController.deleteTransaction(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
});
