import { Router } from "express";
import * as transactionValidationMiddleware from "../middlewares/validation/transaction.js";
import * as userMiddleware from "../middlewares/user.js";
import * as accountMiddleware from "../middlewares/account.js";
import * as authMiddleware from "../middlewares/auth.js";
import * as accountController from "../controllers/account.js";
import * as transactionController from "../controllers/transaction.js";
import * as commonValidationMiddleware from "../middlewares/validation/common.js";

export default (app) => {
  const router = Router();
  app.use("/v1/transactions", router);

  router.post(
    "/",
    transactionValidationMiddleware.createTransactionValidation,
    authMiddleware.isAuthorized,
    accountMiddleware.checkSourceAccountExist,
    accountMiddleware.checkDestinationAccountExist,
    transactionController.createTransaction
  );

  router.get("/", transactionController.getAllTransaction);

  router.get(
    "/:id",
    commonValidationMiddleware.validateParamsId,
    transactionController.getTransactionById
  );
};
