import { prisma } from "../utils/db";

export function createAccount(data) {
  return prisma.bankAccount.create({
    data,
  });
}

export function getAccounts() {
  return prisma.bankAccount.findMany();
}

export function getAccountById(id) {
  return prisma.bankAccount.findUnique({
    where: {
      id,
    },
  });
}

