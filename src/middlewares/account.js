import { AccountService } from "../services/account.js";

export async function checkSourceAccountExist(req, res, next) {
    const { sourceAccountNumber } = req.body;
    const service = new AccountService();
    
    try {
        const account = await service.getAccountByAccountNumber(sourceAccountNumber);
    
        if (!account) {
        return res.status(404).json({ error: "Source account doesn't exist" });
        }

        if (account.balance < req.body.amount) {
            return res.status(400).json({ error: "Insufficient balance" });
        }
    
        res.locals.account = account;
    
        next();
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function checkDestinationAccountExist(req, res, next) {
  const { destinationAccountNumber } = req.body;
  const service = new AccountService();

  try {
    const account = await service.getAccountByAccountNumber(destinationAccountNumber);

    if (!account) {
      return res
        .status(404)
        .json({ error: "Destination account doesn't exist" });
    }

    res.locals.destAccount = account;

    next();
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
