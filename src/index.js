import express, { json } from "express";
import accounts from "./routes/accounts.js";
import users from "./routes/users.js";

async function main(){
    const app = express();
    const port = 3000;
    app.use(json());
    
    accounts(app);
    users(app);

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}

main();