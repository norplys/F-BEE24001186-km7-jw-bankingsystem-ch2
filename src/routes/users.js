import { Router } from "express";
import * as userValidationMiddleware from "../middlewares/validation/user.js";
import * as commonValidationMiddleware from "../middlewares/validation/common.js";
import * as userController from "../controllers/user.js";

export default (app) => {
  const router = Router();
  app.use("/v1/users", router);

  router.post(
    "/",
    userValidationMiddleware.createUserValidation,
    userController.createUser
  );

  router.get("/", userController.getAllUser);

  router.get(
    "/:id",
    commonValidationMiddleware.validateParamsId,
    userController.getUserById
  );
};
