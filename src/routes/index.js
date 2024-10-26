import { Router } from "express";
import accounts from "./accounts.js";
import users from "./users.js";
import transactions from "./transactions.js";
import profiles from "./profiles.js";
import auth from "./auth.js";

export default (app) => {
    const router = Router();

    app.use("/api/v1", router);
    
    accounts(router);
    users(router);
    transactions(router);
    profiles(router);
    auth(router);
}