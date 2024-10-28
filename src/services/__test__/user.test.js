import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("../../repositories/user.js", () => ({
  createUser: jest.fn(),
  getUserById: jest.fn(),
  getAllUser: jest.fn(),
  getUserByEmail: jest.fn(),
}));

jest.unstable_mockModule("bcrypt", () => ({
  default: {
    genSalt: jest.fn(),
    hash: jest.fn(),
    compare: jest.fn(),
  },
}));

const bcrypt = await import("bcrypt");
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
      bcrypt.default.genSalt.mockResolvedValue("salt");
      bcrypt.default.hash.mockResolvedValue("hashedPassword");
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

  describe("comparePassword", () => {
    it("should return true if password is valid", async () => {
      bcrypt.default.compare.mockResolvedValue(true);

      const isValid = await service.comparePassword(
        "password",
        "hashedPassword"
      );

      expect(isValid).toBe(true);
    });

    it("should return false if password is invalid", async () => {
      bcrypt.default.compare.mockResolvedValue(false);

      const isValid = await service.comparePassword(
        "password",
        "hashedPassword"
      );

      expect(isValid).toBe(false);
    });
  });
});
