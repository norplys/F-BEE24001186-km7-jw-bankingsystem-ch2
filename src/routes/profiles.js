import { Router } from "express";
import * as profileValidationMiddleware from "../middlewares/validation/profile.js";
import * as authMiddleware from "../middlewares/auth.js";
import * as profileController from "../controllers/profile.js";

export default (app) => {
  const router = Router();
  app.use("/v1/profiles", router);

  router.put(
    "/",
    profileValidationMiddleware.updateProfileValidation,
    authMiddleware.isAuthorized,
    profileController.updateProfile
  );
};
