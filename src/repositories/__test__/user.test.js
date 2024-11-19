import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("../../utils/db.js", () => {
  return {
    prisma: {
      users: {
        create: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
      },
    },
  };
});

const { prisma } = await import("../../utils/db.js");

const userRepository = await import("../user.js");

describe("User Repository", () => {
  describe("createUser", () => {
    it("should call prisma.user.create with correct data", async () => {
      const data = {
        name: "User Name",
        email: "test@gmail.com",
        password: "password",
        identityType: "KTP",
        identityNumber: "1234567890",
        address: "Jalan Raya",
      };
      await userRepository.createUser(data);
      expect(prisma.users.create).toHaveBeenCalledWith({
        data: {
          name: data.name,
          email: data.email,
          password: data.password,
          profile: {
            create: {
              identityType: data.identityType,
              identityNumber: data.identityNumber,
              address: data.address,
            },
          },
        },
      });
    });
  });

  describe("getAllUser", () => {
    it("should call prisma.user.findMany", async () => {
      await userRepository.getAllUser();
      expect(prisma.users.findMany).toHaveBeenCalled();
    });
  });

  describe("getUserById", () => {
    it("should call prisma.user.findUnique with correct id", async () => {
      const id = 1;
      await userRepository.getUserById(id);
      expect(prisma.users.findUnique).toHaveBeenCalledWith({
        where: {
          id,
        },
        include: {
          profile: true,
        },
      });
    });
  });

  describe("getUserByEmail", () => {
    it("should call prisma.user.findUnique with correct email", async () => {
      const email = "test@gmail.com";
      await userRepository.getUserByEmail(email);

      expect(prisma.users.findUnique).toHaveBeenCalledWith({
        where: {
          email,
        },
      });
    });
  });
});
