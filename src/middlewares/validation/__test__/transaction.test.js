import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("../../../utils/helper.js", () => {
  return {
    generateJoiErrors: jest.fn(),
  };
});

const transactionValidation = await import("../transaction.js");

const { generateJoiErrors } = await import("../../../utils/helper.js");

describe("transactionValidation", () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createTransactionValidation", () => {
    it("should call next if validation passes", async () => {
      const req = {
        body: {
          sourceAccountNumber: "123",
          destinationAccountNumber: "456",
          amount: 100,
        },
      };

      await transactionValidation.createTransactionValidation(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("should return 400 if validation fails", async () => {
      const req = {
        body: {
          amount: "",
        },
      };

      const error = new Error("validation error");

      generateJoiErrors.mockReturnValue(error);

      await transactionValidation.createTransactionValidation(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error });
    });

    it("should return 400 if source and destination account are the same", async () => {
      const req = {
        body: {
            sourceAccountNumber: "123",
            destinationAccountNumber: "123",
            amount: 100,
        },
      };

      await transactionValidation.createTransactionValidation(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Source and destination account cannot be the same" });
    });
  });
});
