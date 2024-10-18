import { prisma } from "../utils/db.js";

export function createUser(data) {
  return prisma.user.create({
    data,
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
  });
}

export function getUserByEmail(email) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}