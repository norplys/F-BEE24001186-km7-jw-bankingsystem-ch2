import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("../../../utils/helper.js", () => {
  return {
    generateJoiErrors: jest.fn(),
  };
});

const authValidation = await import("../auth.js");
const { generateJoiErrors } = await import("../../../utils/helper.js");

describe("authValidation", () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("loginValidation", () => {
    it("should call next if validation passes", async () => {
      const req = {
        body: {
          email: "test@gmail.com",
          password: "password",
        },
      };

      await authValidation.loginValidation(req, res, next);

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

      await authValidation.loginValidation(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: error });
    });
  });
});
