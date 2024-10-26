import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("../../repositories/user.js", () => ({
  createUser: jest.fn((data) => data),
  getUserById: jest.fn((id) => id),
  getAllUser: jest.fn((data) => data),
  getUserByEmail: jest.fn((email) => email),
}));

const userRepository = await import("../../repositories/user.js");
const { UserService } = await import("../../services/user.js");

describe("testUserService", () => {
  let service;
  const userData = {
    id: 1,
    name: "John Doe",
    email: "test@gmail.com",
  };

  beforeEach(() => {
    service = new UserService();
  });

  describe("createUser", () => {
    it("should return the created user", async () => {
      userRepository.createUser.mockResolvedValue(userData);

      const user = await service.createUser(userData);

      expect(user).toEqual(userData);
    });
  });

  describe("getUserById", () => {
    it("should return the user by id", async () => {
      userRepository.getUserById.mockResolvedValue(userData);

      const user = await service.getUserById(1);

      expect(user).toEqual(userData);
    });
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const users = [userData, userData];

      userRepository.getAllUser.mockResolvedValue(users);

      const result = await service.getAllUser();

      expect(result).toEqual(users);
    });
  });

  describe("getUserByEmail", () => {
    it("should return the user by email", async () => {
      userRepository.getUserByEmail.mockResolvedValue(userData);

      const user = await service.getUserByEmail("test@gmail.com");

      expect(user).toEqual(userData);
    });
  });
});
