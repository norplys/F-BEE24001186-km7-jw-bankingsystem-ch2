import { Router } from "express";
import * as authValidationMiddleware from "../middlewares/validation/auth.js";
import * as authController from "../controllers/auth.js";

export default (app) => {
    const router = Router();
    app.use("/auth", router);
    
    router.post("/login",
        authValidationMiddleware.loginValidation,
        authController.login
     );
};