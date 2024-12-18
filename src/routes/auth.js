import { Router } from "express";
import * as userValidationMiddleware from "../middlewares/validation/user.js";
import * as userMiddleware from "../middlewares/user.js";
import * as userController from "../controllers/user.js";
import * as authValidationMiddleware from "../middlewares/validation/auth.js";
import * as authController from "../controllers/auth.js";
import * as commonValidationMiddleware from "../middlewares/validation/common.js";

export default (app) => {
  const router = Router();
  app.use("/auth", router);

  router.post(
    "/login",
    authValidationMiddleware.loginValidation,
    authController.login
  );

  router.post(
    "/register",
    userValidationMiddleware.createUserValidation,
    userMiddleware.blockIfEmailExists,
    userController.createUser
  );

  router.post(
    "/reset-password",
    commonValidationMiddleware.isValidEmailPayload,
    userMiddleware.checkEmailExist,
    authController.resetPasswordRequest
  )

  router.put(
    "/reset-password",
    authValidationMiddleware.resetPasswordValidation,
    authController.resetPassword
  )
};
