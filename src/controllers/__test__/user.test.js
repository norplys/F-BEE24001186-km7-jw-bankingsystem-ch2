import { afterEach, describe, it, jest } from "@jest/globals";

const mockCreateUser = jest.fn();
const mockGetAllUser = jest.fn();
const mockGetUserById = jest.fn();

jest.unstable_mockModule("../../services/user.js", () => ({
  UserService: jest.fn().mockImplementation(() => ({
    createUser: mockCreateUser,
    getAllUser: mockGetAllUser,
    getUserById: mockGetUserById,
  })),
}));

const userController = await import("../user.js");

describe("userController", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  const mockReq = {
    body: {
      email: "test@gmail.com",
      password: "password",
    },
  };

  const mockRes = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
    locals : {
        id: 1
    }
  };

  const mockAccount = {
    id: 1,
    balance: 100,
  };

  describe("createUser", () => {
    it("should create a user", async () => {
      mockCreateUser.mockResolvedValue(mockAccount);

      await userController.createUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "User created successfully",
        data: mockAccount,
      });
    });
  });

  it("should return 500 if an error occurred", async () => {
    mockCreateUser.mockRejectedValue(new Error("Server error"));

    await userController.createUser(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Server error",
    });
  });

  describe("getAllUser", () => {
    const mockUsers = [
      {
        id: 1,
        email: "test@gmail.com",
      },
      {
        id: 2,
        email: "test2@gmail.com",
      },
    ];

    it("should return all users", async () => {
      mockGetAllUser.mockResolvedValue(mockUsers);

      await userController.getAllUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        data: mockUsers,
      });
    });

    it("should return 500 if an error occurred", async () => {
      mockGetAllUser.mockRejectedValue(new Error("Server error"));

      await userController.getAllUser(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Server error",
      });
    });
  });

  describe("getUserById", () => {

    it("should return a user by id", async () => {
      mockGetUserById.mockResolvedValue(mockAccount);

      await userController.getUserById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        data: mockAccount,
      });
    });

    it("should return 404 if user not found", async () => {
      mockGetUserById.mockResolvedValue(null);

      await userController.getUserById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(404);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "User not found",
      });
    });

    it("should return 500 if an error occurred", async () => {
      mockGetUserById.mockRejectedValue(new Error("Server error"));

      await userController.getUserById(mockReq, mockRes);

      expect(mockRes.status).toHaveBeenCalledWith(500);
      expect(mockRes.json).toHaveBeenCalledWith({
        message: "Server error",
      });
    });
  });
});
