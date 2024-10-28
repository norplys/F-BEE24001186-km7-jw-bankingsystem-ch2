import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("../../../utils/helper.js", () => {
  return {
    generateJoiErrors: jest.fn(),
  };
});

const profileValidation = await import("../profile.js");

const { generateJoiErrors } = await import("../../../utils/helper.js");

describe("profileValidation", () => {
  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  };

  const next = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("updateProfileValidation", () => {
    it("should call next if validation passes", async () => {
      const req = {
        body: {
          identityType: "National ID",
          identityNumber: "123456789",
          address: "Address"
        },
      };

      await profileValidation.updateProfileValidation(req, res, next);

      expect(next).toHaveBeenCalled();
    });
  });

  it("should return 400 if validation fails", async () => {
    const req = {
      body: {
        email: "",
      },
    };

    const error = new Error("validation error");

    generateJoiErrors.mockReturnValue(error);

    await profileValidation.updateProfileValidation(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: error });
  });
});
