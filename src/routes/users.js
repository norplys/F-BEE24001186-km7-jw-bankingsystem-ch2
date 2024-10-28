import { Router } from "express";
import * as commonValidationMiddleware from "../middlewares/validation/common.js";
import * as userController from "../controllers/user.js";

export default (app) => {
  const router = Router();
  app.use("/users", router);

  router.get("/", userController.getAllUser);

  router.get(
    "/:id",
    commonValidationMiddleware.validateParamsId,
    userController.getUserById
  );
};
