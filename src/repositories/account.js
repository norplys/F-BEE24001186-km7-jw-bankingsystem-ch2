import { prisma } from "../utils/db.js";

export function createAccount(data) {
  return prisma.bankAccount.create({
    data: {
      bankName: data.bankName,
      bankAccountNumber: data.bankAccountNumber,
      userId: data.id,
    },
  });
}

export function getAllAccount() {
  return prisma.bankAccount.findMany();
}

export function getAccountById(id) {
  return prisma.bankAccount.findUnique({
    where: {
      id,
    },
  });
}

export function getAccountByAccountNumber(bankAccountNumber) {
  return prisma.bankAccount.findUnique({
    where: {
      bankAccountNumber,
    },
  });
}

