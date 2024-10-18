import { prisma } from "../utils/db.js";

export function createUser(data) {
  return prisma.user.create({
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
}

export function getAllUser() {
  return prisma.user.findMany();
}

export function getUserById(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },
    include:{
      profile: true,
    }
  });
}

export function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}
