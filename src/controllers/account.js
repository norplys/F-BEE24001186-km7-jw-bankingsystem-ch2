import { AccountService } from "../services/account.js";
import { generateBankAccountNumber } from "../utils/helper.js";

export async function createAccount(req, res) {
  try {
    const user = res.locals.user;
    const { bankName } = req.body;
    const service = new AccountService();
    let bankAccountNumber = generateBankAccountNumber();

    let accountExists = await service.getAccountByAccountNumber(
      bankAccountNumber
    );

    while (accountExists) {
      bankAccountNumber = generateBankAccountNumber();

      accountExists = await service.getAccountByAccountNumber(
        bankAccountNumber
      );
    }

    const account = await service.createAccount({
      bankName,
      id: user.id,
      bankAccountNumber,
    });
    res.status(201).json({
        message: "Account created successfully",
        data: account,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getAccountById(_req, res) {
  const id = res.locals.id;

  try {
    const service = new AccountService();

    const account = await service.getAccountById(id);

    if (!account) {
      return res.status(404).json({
        error: "Account not found",
      });
    }

    res.status(200).json({
      data: account,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getAllAccount(_req, res) {
  try {
    const service = new AccountService();

    const accounts = await service.getAllAccount();

    res.status(200).json({
      data: accounts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function deposit(req, res) {
  const { amount } = req.body;
  const account = res.locals.account;
  const service = new AccountService();

  try {
    const updatedAccount = await service.updateAccountById(account.id, {
      balance: account.balance + amount,
    });

    res.status(200).json({
      message: "Deposit successful",
      data: updatedAccount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function withdraw(req, res) {
  const { amount } = req.body;
  const account = res.locals.account;
  const service = new AccountService();

  try {
    if (account.balance < amount) {
      return res.status(400).json({
        error: "Insufficient balance",
      });
    }

    const updatedAccount = await service.updateAccountById(account.id, {
      balance: account.balance - amount,
    });

    res.status(200).json({
      message: "Withdrawal successful",
      data: updatedAccount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}
