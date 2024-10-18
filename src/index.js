import express, { json } from "express";
import account from "./routes/account.js";

async function main(){
    const app = express();
    const port = 3000;
    app.use(json());
    
    account(app);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main();