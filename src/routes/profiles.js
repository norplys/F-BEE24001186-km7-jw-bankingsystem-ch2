import { Router } from "express";
import * as profileValidationMiddleware from "../middlewares/validation/profile.js";
import * as authMiddleware from "../middlewares/auth.js";
import * as profileController from "../controllers/profile.js";

export default (app) => {
  const router = Router();
  app.use("/profiles", router);

  router.put(
    "/",
    authMiddleware.isAuthorized,
    profileValidationMiddleware.updateProfileValidation,
    profileController.updateProfile
  );
};
