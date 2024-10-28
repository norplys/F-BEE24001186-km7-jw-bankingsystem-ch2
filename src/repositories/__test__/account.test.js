import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("../../utils/db.js", () => {
    return {
        prisma: {
            bankAccount: {
                create: jest.fn(),
                findMany: jest.fn(),
                findUnique: jest.fn(),
                update: jest.fn(),
                findFirst: jest.fn(),
            },
        },
    };
});

const { prisma } = await import("../../utils/db.js");
const accountRepository = await import("../account.js");

describe("Account Repository", () => {
    describe("createAccount", () => {
        it("should call prisma.bankAccount.create with correct data", async () => {
            const data = {
                bankName: "Bank Name",
                bankAccountNumber: "1234567890",
                id: 1,
            };
            await accountRepository.createAccount(data);
            expect(prisma.bankAccount.create).toHaveBeenCalledWith({
                data: {
                    bankName: data.bankName,
                    bankAccountNumber: data.bankAccountNumber,
                    userId: data.id,
                },
            });
        });
    });

    describe("getAllAccount", () => {
        it("should call prisma.bankAccount.findMany", async () => {
            await accountRepository.getAllAccount();
            expect(prisma.bankAccount.findMany).toHaveBeenCalled();
        });
    });

    describe("getAccountById", () => {
        it("should call prisma.bankAccount.findUnique with correct id", async () => {
            const id = 1;
            await accountRepository.getAccountById(id);
            expect(prisma.bankAccount.findUnique).toHaveBeenCalledWith({
                where: {
                    id,
                },
            });
        });
    });

    describe("getAccountByAccountNumber", () => {
        it("should call prisma.bankAccount.findUnique with correct bankAccountNumber", async () => {
            const bankAccountNumber = "1234567890";
            await accountRepository.getAccountByAccountNumber(bankAccountNumber);
            expect(prisma.bankAccount.findUnique).toHaveBeenCalledWith({
                where: {
                    bankAccountNumber,
                },
            });
        });
    });

    describe("updateAccountById", () => {
        it("should call prisma.bankAccount.update with correct id and data", async () => {
            const id = 1;
            const data = {
                bankName: "Bank Name",
                bankAccountNumber: "1234567890",
                userId: 1,
            };
            await accountRepository.updateAccountById(id, data);
            expect(prisma.bankAccount.update).toHaveBeenCalledWith({
                where: {
                    id,
                },
                data,
            });
        });
    });

    describe("getAccountByUserIdAndBankName", () => {
        it("should call prisma.bankAccount.findFirst with correct userId and bankName", async () => {
            const userId = 1;
            const bankName = "Bank Name";
            await accountRepository.getAccountByUserIdAndBankName(userId, bankName);
            expect(prisma.bankAccount.findFirst).toHaveBeenCalledWith({
                where: {
                    userId,
                    bankName,
                },
            });
        });
    });

    describe("getAccountByUserIdAndAccountNumber", () => {
        it("should call prisma.bankAccount.findUnique with correct userId and bankAccountNumber", async () => {
            const userId = 1;
            const bankAccountNumber = "1234567890";
            await accountRepository.getAccountByUserIdAndAccountNumber(
                userId,
                bankAccountNumber
            );
            expect(prisma.bankAccount.findUnique).toHaveBeenCalledWith({
                where: {
                    userId,
                    bankAccountNumber,
                },
            });
        });
    });
});
