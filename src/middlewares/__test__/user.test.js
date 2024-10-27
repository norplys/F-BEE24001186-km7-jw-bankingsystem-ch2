import { afterEach, describe, expect, it, jest } from "@jest/globals";

const mockGetUserByEmail = jest.fn();

jest.unstable_mockModule("../../services/user.js", () => ({
  UserService: jest.fn().mockImplementation(() => ({
    getUserByEmail: mockGetUserByEmail,
  })),
}));

const userMiddleware = await import("../user.js");

describe("userMiddleware", () => {
  describe("blockIfEmailExists", () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    const mockRequest = {
      body: {
        email: "test@gmail.com",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockNext = jest.fn();

    it("should call next if email does not exist", async () => {
      mockGetUserByEmail.mockResolvedValue(null);

      await userMiddleware.blockIfEmailExists(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
    });

    it("should return 403 if email exists", async () => {
      mockGetUserByEmail.mockResolvedValue({ id: 1 });

      await userMiddleware.blockIfEmailExists(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(403);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Email already exists",
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it("should return 500 if an error occurred", async () => {
      mockGetUserByEmail.mockRejectedValue(new Error("Internal server error"));

      await userMiddleware.blockIfEmailExists(
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
