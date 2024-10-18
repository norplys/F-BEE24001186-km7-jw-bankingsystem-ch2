import { Router } from "express";
import * as accountValidationMiddleware from "../middlewares/validation/account.js";
import * as userMiddleware from "../middlewares/user.js";
import * as authMiddleware from "../middlewares/auth.js";
import * as accountController from "../controllers/account.js";
import * as commonValidationMiddleware from "../middlewares/validation/common.js";

export default (app) => {
  const router = Router();
  app.use("/v1/accounts", router);

  router.post(
    "/",
    accountValidationMiddleware.createAccountValidation,
    userMiddleware.checkUserExistsByEmail,
    authMiddleware.comparePassword,
    accountController.createAccount
  );

  router.get(
    "/:id",
    commonValidationMiddleware.validateParamsId,
    accountController.getAccountById
  );

  router.get("/", accountController.getAllAccount);
};
