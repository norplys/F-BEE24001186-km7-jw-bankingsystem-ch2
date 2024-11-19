import { Router } from "express";
import accounts from "./accounts.js";
import users from "./users.js";
import transactions from "./transactions.js";
import profiles from "./profiles.js";
import auth from "./auth.js";
import upload from "./upload.js";
import path from "path";

export default (app) => {
    app.get('/', (req, res) => {
        res.sendFile(path.resolve('src/utils/index.html'));
    });

    const router = Router();

    app.use("/api/v1", router);
    
    accounts(router);
    users(router);
    transactions(router);
    profiles(router);
    auth(router);
    upload(router);
}