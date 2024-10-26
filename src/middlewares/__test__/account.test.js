import { describe, it, jest } from "@jest/globals";

const mockGetAccountByAccountNumber = jest.fn();
const mockGetAccountByUserIdAndAccountNumber = jest.fn();

jest.unstable_mockModule("../../services/account.js", () => ({
  AccountService: jest.fn().mockImplementation(() => ({
    getAccountByAccountNumber: mockGetAccountByAccountNumber,
    getAccountByUserIdAndAccountNumber: mockGetAccountByUserIdAndAccountNumber,
  })),
}));

const accountMiddleware = await import("../account.js");

describe("accountMiddleware", () => {
  describe("checkSourceAccountExist", () => {
    it("should call next if account exists and has sufficient balance", async () => {
      const mockRequest = {
        body: {
          sourceAccountNumber: "1234567890",
          amount: 1000,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {},
      };

      const mockNext = jest.fn();

      const account = {
        sourceAccountNumber: "1234567890",
        balance: 2000,
      };

      mockGetAccountByAccountNumber.mockResolvedValue(account);

      await accountMiddleware.checkSourceAccountExist(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.locals.account).toEqual(account);
      expect(mockNext).toHaveBeenCalled();
    });

    it("should return 404 if the account does not exist", async () => {
      const mockRequest = {
        body: {
          sourceAccountNumber: "test",
          amount: 1000,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {},
      };

      const mockNext = jest.fn();

      mockGetAccountByAccountNumber.mockResolvedValue(null);

      await accountMiddleware.checkSourceAccountExist(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Source account doesn't exist",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should return 400 if the account has insufficient balance", async () => {
      const mockRequest = {
        body: {
          sourceAccountNumber: "1234567890",
          amount: 3000,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {},
      };

      const mockNext = jest.fn();

      const account = {
        sourceAccountNumber: "1234567890",
        balance: 2000,
      };

      mockGetAccountByAccountNumber.mockResolvedValue(account);

      await accountMiddleware.checkSourceAccountExist(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Insufficient balance",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should return 500 if an error occurs", async () => {
      const mockRequest = {
        body: {
          sourceAccountNumber: "1234567890",
          amount: 1000,
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {},
      };

      const mockNext = jest.fn();

      mockGetAccountByAccountNumber.mockRejectedValue(
        new Error("Internal server error")
      );

      await accountMiddleware.checkSourceAccountExist(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe("checkDestinationAccountExist", () => {
    it("should call next if account exists", async () => {
      const mockRequest = {
        body: {
          destinationAccountNumber: "1234567890",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {},
      };

      const mockNext = jest.fn();

      const account = {
        destinationAccountNumber: "1234567890",
      };

      mockGetAccountByAccountNumber.mockResolvedValue(account);

      await accountMiddleware.checkDestinationAccountExist(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.locals.destAccount).toEqual(account);
      expect(mockNext).toHaveBeenCalled();
    });

    it("should return 404 if the account does not exist", async () => {
      const mockRequest = {
        body: {
          destinationAccountNumber: "test",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {},
      };

      const mockNext = jest.fn();

      mockGetAccountByAccountNumber.mockResolvedValue(null);

      await accountMiddleware.checkDestinationAccountExist(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Destination account doesn't exist",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should return 500 if an error occurs", async () => {
      const mockRequest = {
        body: {
          destinationAccountNumber: "1234567890",
        },
      };

      const mockResponse = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
        locals: {},
      };

      const mockNext = jest.fn();

      mockGetAccountByAccountNumber.mockRejectedValue(
        new Error("Internal server error")
      );

      await accountMiddleware.checkDestinationAccountExist(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });

  describe("checkAccountExistByUserIdAndAccountNumber", () => {
    it("should call next if account exists", async () => {
      const mockRequest = {
        body: {
          accountNumber: "1234567890",
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

      const mockNext = jest.fn();

      const account = {
        accountNumber: "1234567890",
      };

      mockGetAccountByUserIdAndAccountNumber.mockResolvedValue(account);

      await accountMiddleware.checkAccountExistByUserIdAndAccountNumber(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.locals.account).toEqual(account);
      expect(mockNext).toHaveBeenCalled();
    });

    it("should return 404 if the account does not exist", async () => {
      const mockRequest = {
        body: {
          accountNumber: "test",
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

      const mockNext = jest.fn();

      mockGetAccountByUserIdAndAccountNumber.mockResolvedValue(null);

      await accountMiddleware.checkAccountExistByUserIdAndAccountNumber(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Account doesn't exist",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should return 500 if an error occurs", async () => {
      const mockRequest = {
        body: {
          accountNumber: "1234567890",
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

      const mockNext = jest.fn();

      mockGetAccountByUserIdAndAccountNumber.mockRejectedValue(
        new Error("Internal server error")
      );

      await accountMiddleware.checkAccountExistByUserIdAndAccountNumber(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });
  });
});
