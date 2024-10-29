import { describe, jest } from "@jest/globals";

const mockGetUserByEmail = jest.fn();
const mockComparePassword = jest.fn();

jest.unstable_mockModule("../../services/user.js", () => ({
  UserService: jest.fn().mockImplementation(() => ({
    getUserByEmail: mockGetUserByEmail,
    comparePassword: mockComparePassword,
  })),
}));

jest.unstable_mockModule("jsonwebtoken", () => ({
  default: {
    sign: jest.fn(),
  },
}));

const jwt = await import("jsonwebtoken");
const { login } = await import("../auth.js");

describe("authController", () => {
  describe("login", () => {
    const mockRequest = {
      body: {
        email: "test@gmail.com",
        password: "password",
      },
    };

    const mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockAccount = {
      id: 1,
      email: "test@gmail.com",
      password: "password",
    };

    it("should return 200 if login success", async () => {
      mockGetUserByEmail.mockResolvedValue(mockAccount);
      mockComparePassword.mockResolvedValue(true);
      jwt.default.sign.mockReturnValue("token");

      await login(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Login success",
        data: {
          ...mockAccount,
          token: "token",
        },
      });
    });

    it("should return 400 if email is invalid", async () => {
      mockGetUserByEmail.mockResolvedValue(null);
      mockComparePassword.mockResolvedValue(true);

      await login(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Invalid email",
      });
    });

    it("should return 400 if password is invalid", async () => {
      mockRequest.body.password = "invalid_password";
      mockGetUserByEmail.mockResolvedValue(mockAccount);
      mockComparePassword.mockResolvedValue(false);

      await login(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Invalid password",
      });
    });

    it("should return 500 if an error occurred", async () => {
      mockGetUserByEmail.mockRejectedValue(new Error("Internal server error"));

      await login(mockRequest, mockResponse);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });
});
