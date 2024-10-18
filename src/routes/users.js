import { Router } from "express";
import * as userValidationMiddleware from "../middlewares/validation/user.js";

export default (app) => {
    const router = Router();
    app.use("/v1/users", router);
    
    router.get("/", async (req, res) => {
        const query = "SELECT * FROM accounts";
        const result = await client.query(query);
        res.json(result.rows);
    });

    router.put("/:id", async (req, res) => {
        const { id } = req.params;
        const { balance } = req.body;
        // res.json({ message: "Account updated" });
    }
    );
}