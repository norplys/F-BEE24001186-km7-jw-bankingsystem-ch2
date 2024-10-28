import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("../../../utils/helper.js", () => {
  return {
    generateJoiErrors: jest.fn(),
  };
});

const commonValidation = await import("../common.js");
const { generateJoiErrors } = await import("../../../utils/helper.js");

describe("commonValidation", () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
    locals: {
        id: 1,
    }
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("validateParamsId", () => {
    it("should call next if validation passes", async () => {
      const req = {
        params: {
          id: "1",
        },
      };

      await commonValidation.validateParamsId(req, res, next);

      expect(next).toHaveBeenCalled();
    });

    it("should return 400 if validation fails", async () => {
      const req = {
        params: {
          id: "invalid",
        },
      };

      const error = new Error("validation error");

      generateJoiErrors.mockReturnValue(error);

      await commonValidation.validateParamsId(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error });
    });
  });
});
