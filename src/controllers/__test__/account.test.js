import { describe, expect, it, jest } from "@jest/globals";

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

jest.unstable_mockModule("../../utils/helper.js", () => ({
  generateBankAccountNumber: jest.fn(),
}));

const { generateBankAccountNumber } = await import("../../utils/helper.js");
const accountController = await import("../account.js");

describe("accountController", () => {
  describe("createAccount", () => {
    it("should create an account", async () => {
      const mockRequest = {
        body: {
          bankName: "Test Bank",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {
          user: {
            id: 1,
          },
        },
      };

      const mockAccount = {
        id: 1,
        bankName: "Test Bank",
        bankAccountNumber: "1234567890",
      };

      mockCreateAccount.mockResolvedValue(mockAccount);

      await accountController.createAccount(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Account created successfully",
        data: mockAccount,
      });
    });

    it("should call generateBankAccountNumber if account number exists", async () => {
      const mockRequest = {
        body: {
          bankName: "Test Bank",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {
          user: {
            id: 1,
          },
        },
      };

      const mockAccount = {
        id: 1,
        bankName: "Test Bank",
        bankAccountNumber: "1234567890",
      };

      mockGetAccountByAccountNumber.mockResolvedValueOnce(mockAccount).mockResolvedValueOnce(null);

      await accountController.createAccount(mockRequest, mockResponse);

      expect(generateBankAccountNumber).toHaveBeenCalledTimes(3);
    });
 

    it("should return 500 if an error occurred", async () => {
      const mockRequest = {
        body: {
          bankName: "Test Bank",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {
          user: {
            id: 1,
          },
        },
      };

      mockCreateAccount.mockRejectedValue(new Error("Internal server error"));

      await accountController.createAccount(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("getAccountById", () => {
    it("should get an account by id", async () => {
      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {},
      };

      const mockAccount = {
        id: 1,
        bankName: "Test Bank",
        bankAccountNumber: "1234567890",
      };

      mockGetAccountById.mockResolvedValue(mockAccount);

      await accountController.getAccountById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockAccount });
    });

    it("should return 404 if account is not found", async () => {
      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {},
      };

      mockGetAccountById.mockResolvedValue(null);

      await accountController.getAccountById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);

      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Account not found",
      });
    });
  });

  describe("getAccountById", () => {
    it("should get account by id", async () => {
      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {},
      };

      const mockAccount = {
        id: 1,
        bankName: "Test Bank",
        bankAccountNumber: "1234567890",
      };

      mockGetAccountById.mockResolvedValue(mockAccount);

      await accountController.getAccountById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockAccount });
    });

    it("should return 404 if account is not found", async () => {
      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {},
      };

      mockGetAccountById.mockResolvedValue(null);

      await accountController.getAccountById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Account not found",
      });
    });

    it("should return 500 if an error occurred", async () => {
      const mockRequest = {
        params: {
          id: 1,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {},
      };

      mockGetAccountById.mockRejectedValue(new Error("Internal server error"));

      await accountController.getAccountById(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("getAllAccount", () => {
    it("should get all accounts", async () => {
      const mockRequest = {};

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      const mockAccounts = [
        {
          id: 1,
          bankName: "Test Bank",
          bankAccountNumber: "1234567890",
        },
      ];

      mockGetAllAccount.mockResolvedValue(mockAccounts);

      await accountController.getAllAccount(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ data: mockAccounts });
    });

    it("should return 500 if an error occurred", async () => {
      const mockRequest = {};

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      mockGetAllAccount.mockRejectedValue(new Error("Internal server error"));

      await accountController.getAllAccount(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("deposit", () => {
    it("should deposit money into an account", async () => {
      const mockRequest = {
        body: {
          amount: 1000,
        },
        params: {
          id: 1,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        locals: {
          account: {
            id: 1,
            bankName: "Test Bank",
            bankAccountNumber: "1234567890",
            balance: 1000,
          },
        },
        json: jest.fn(),
      };

      const mockAccount = {
        id: 1,
        bankName: "Test Bank",
        bankAccountNumber: "1234567890",
        balance: 1000,
      };

      mockUpdateAccountById.mockResolvedValue(mockAccount);

      await accountController.deposit(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Deposit successful",
        data: mockAccount,
      });
    });

    it("should return 500 if an error occurred", async () => {
      const mockRequest = {
        body: {
          amount: 1000,
        },
        params: {
          id: 1,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        locals: {
          account: {
            id: 1,
            bankName: "Test Bank",
            bankAccountNumber: "1234567890",
            balance: 1000,
          },
        },
        json: jest.fn(),
      };

      mockUpdateAccountById.mockRejectedValue(
        new Error("Internal server error")
      );

      await accountController.deposit(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("withdraw", () => {
    it("should withdraw money from an account", async () => {
      const mockRequest = {
        body: {
          amount: 500,
        },
        params: {
          id: 1,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        locals: {
          account: {
            id: 1,
            bankName: "Test Bank",
            bankAccountNumber: "1234567890",
            balance: 1000,
          },
        },
        json: jest.fn(),
      };

      const mockAccount = {
        id: 1,
        bankName: "Test Bank",
        bankAccountNumber: "1234567890",
        balance: 500,
      };

      mockUpdateAccountById.mockResolvedValue(mockAccount);

      await accountController.withdraw(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Withdrawal successful",
        data: mockAccount,
      });
    });

    it("should return 500 if an error occurred", async () => {
      const mockRequest = {
        body: {
          amount: 500,
        },
        params: {
          id: 1,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        locals: {
          account: {
            id: 1,
            bankName: "Test Bank",
            bankAccountNumber: "1234567890",
            balance: 1000,
          },
        },
        json: jest.fn(),
      };

      mockUpdateAccountById.mockRejectedValue(
        new Error("Internal server error")
      );

      await accountController.withdraw(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });

    it("should return 400 if account balance is insufficient", async () => {
      const mockRequest = {
        body: {
          amount: 1500,
        },
        params: {
          id: 1,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        locals: {
          account: {
            id: 1,
            bankName: "Test Bank",
            bankAccountNumber: "1234567890",
            balance: 1000,
          },
        },
        json: jest.fn(),
      };

      await accountController.withdraw(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: "Insufficient balance",
      });
    });
  });
});
