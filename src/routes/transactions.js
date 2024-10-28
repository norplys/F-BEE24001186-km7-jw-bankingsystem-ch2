import { Router } from "express";
import * as transactionValidationMiddleware from "../middlewares/validation/transaction.js";
import * as accountMiddleware from "../middlewares/account.js";
import * as authMiddleware from "../middlewares/auth.js";
import * as transactionController from "../controllers/transaction.js";
import * as commonValidationMiddleware from "../middlewares/validation/common.js";

export default (app) => {
  const router = Router();
  app.use("/transactions", router);

  router.post(
    "/",
    authMiddleware.isAuthorized,
    transactionValidationMiddleware.createTransactionValidation,
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

  // this route is only for requirement and there is no validation for this route

  router.delete(
    "/:id",
    authMiddleware.isAuthorized,
    commonValidationMiddleware.validateParamsId,
    transactionController.deleteTransaction
  );
};
