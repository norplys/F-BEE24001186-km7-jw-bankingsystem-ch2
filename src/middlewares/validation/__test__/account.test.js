import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("../../../utils/helper.js", () => {
  return {
    generateJoiErrors: jest.fn(),
  };
});

const accountValidation = await import("../account");
const { generateJoiErrors } = await import("../../../utils/helper.js");

describe("accountValidation", () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("createAccountValidation", () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    
    it("should call next if validation passes", async () => {
      const req = {
        body: {
          bankName: "Bank Name",
        },
      };

      await accountValidation.createAccountValidation(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("should return 400 if validation fails", async () => {
      const req = {
        body: {
          email: "",
        },
      };

      const error = new Error("validation error");

      generateJoiErrors.mockReturnValue(error);

      await accountValidation.createAccountValidation(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error });
    });
  });

  describe("amountSchemaValidation", () => {
    it("should call next if validation passes", async () => {
      const req = {
        body: {
          amount: 100,
          accountNumber: "123456"
        },
      };

      await accountValidation.amountSchemaValidation(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("should return 400 if validation fails", async () => {
      const req = {
        body: {
          amount: -100,
          accountNumber: "123456"
        },
      };

      const error = new Error("validation error");

      generateJoiErrors.mockReturnValue(error);

      await accountValidation.amountSchemaValidation(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error });
    });
  });
});
