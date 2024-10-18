import { prisma } from "../utils/db";

export function createUsers(data) {
  return prisma.user.create({
    data,
  });
}

export function getUsers() {
  return prisma.user.findMany();
}

export function getUserById(id) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}