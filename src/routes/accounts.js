import { Router } from "express";
import * as accountValidationMiddleware from "../middlewares/validation/account.js";
import * as accountMiddleware from "../middlewares/account.js";
import * as authMiddleware from "../middlewares/auth.js";
import * as accountController from "../controllers/account.js";
import * as commonValidationMiddleware from "../middlewares/validation/common.js";

export default (app) => {
  const router = Router();
  app.use("/accounts", router);

  router.put(
    '/deposit',
    authMiddleware.isAuthorized,
    accountValidationMiddleware.amountSchemaValidation,
    accountMiddleware.checkAccountExistByUserIdAndAccountNumber,
    accountController.deposit
  )

  router.put(
    '/withdraw',
    authMiddleware.isAuthorized,
    accountValidationMiddleware.amountSchemaValidation,
    accountMiddleware.checkAccountExistByUserIdAndAccountNumber,
    accountController.withdraw
  )

  router.post(
    "/",
    authMiddleware.isAuthorized,
    accountValidationMiddleware.createAccountValidation,
    accountController.createAccount
  );

  router.get(
    "/:id",
    commonValidationMiddleware.validateParamsId,
    accountController.getAccountById
  );

  router.get("/", accountController.getAllAccount);
};
