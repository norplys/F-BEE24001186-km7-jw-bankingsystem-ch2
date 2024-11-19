import { prisma } from "../utils/db.js";

export function createAccount(data) {
  return prisma.bankAccounts.create({
    data: {
      bankName: data.bankName,
      bankAccountNumber: data.bankAccountNumber,
      userId: data.id,
    },
  });
}

export function getAllAccount() {
  return prisma.bankAccounts.findMany();
}

export function getAccountById(id) {
  return prisma.bankAccounts.findUnique({
    where: {
      id,
    },
  });
}

export function getAccountByAccountNumber(bankAccountNumber) {
  return prisma.bankAccounts.findUnique({
    where: {
      bankAccountNumber,
    },
  });
}

export function updateAccountById(id, data, transaction = null) {
  const db = transaction || prisma;
  return db.bankAccounts.update({
    where: {
      id,
    },
    data,
  });
}

export function getAccountByUserIdAndBankName(userId, bankName) {
  return prisma.bankAccounts.findFirst({
    where: {
      userId,
      bankName,
    },
  });
}

export function getAccountByUserIdAndAccountNumber(userId, bankAccountNumber) {
  return prisma.bankAccounts.findUnique({
    where: {
      userId,
      bankAccountNumber,
    },
  });
} 