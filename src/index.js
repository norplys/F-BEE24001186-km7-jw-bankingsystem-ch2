import express, { json, Router } from "express";
import routes from "./routes/index.js";

async function main() {
  const app = express();
  const port = 3000;
  app.use(json());

  routes(app);

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

main();
