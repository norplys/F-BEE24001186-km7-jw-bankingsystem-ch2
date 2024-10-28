import { describe, jest } from "@jest/globals";

jest.unstable_mockModule("../../repositories/account.js", 
  () => ({
    createAccount: jest.fn(),
    getAccountById: jest.fn(),
    getAllAccount: jest.fn(),
    getAccountByAccountNumber: jest.fn(),
    updateAccountById: jest.fn(),
    getAccountByUserIdAndAccountNumber: jest.fn(),
  })
);

const accountRepository = await import("../../repositories/account.js");
const { AccountService } = await import("../../services/account.js");

describe("testAccountService", () => {
  let service;
  const accountData = {
    accountNumber: "1234",
    balance: 100,
    userId: 1,
  };

  beforeEach(() => {
    service = new AccountService();
  });

  describe("createAccount", () => {
    it("should return the created account", async () => {

      accountRepository.createAccount.mockResolvedValue(accountData);

      const account = await service.createAccount(accountData);

      expect(account).toEqual(accountData);
    });
  });

  describe("getAccountById", () => {
    it("should return the account by id", async () => {

      accountRepository.getAccountById.mockResolvedValue(accountData);

      const account = await service.getAccountById(1);

      expect(account).toEqual(accountData);
    });
  });

  describe("getAllAccount", () => {
    it("should return all accounts", async () => {
      const accounts = [accountData, accountData];

      accountRepository.getAllAccount.mockResolvedValue(accounts);

      const result = await service.getAllAccount();

      expect(result).toEqual(accounts);
    });
  });

  describe("getAccountByAccountNumber", () => {
    it("should return the account by account number", async () => {

      accountRepository.getAccountByAccountNumber.mockResolvedValue(accountData);

      const account = await service.getAccountByAccountNumber("1234");

      expect(account).toEqual(accountData);
    });
  });

  describe("updateAccountById", () => {
    it("should return the updated account", async () => {

      accountRepository.updateAccountById.mockResolvedValue(accountData);

      const account = await service.updateAccountById(1, accountData);

      expect(account).toEqual(accountData);
    });
  });

  describe("getAccountByUserIdAndAccountNumber", () => {
    it("should return the account by user id and account number", async () => {

      accountRepository.getAccountByUserIdAndAccountNumber.mockResolvedValue(accountData);

      const account = await service.getAccountByUserIdAndAccountNumber(1, "1234");

      expect(account).toEqual(accountData);
    });
  });
} );





