import express, { json } from "express";
import routes from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" assert {type: "json"};

async function main() {
  const app = express();
  const port = 3000;
  
  
  app.use(json());

  routes(app);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    console.log(`API documentation is available at http://localhost:${port}/api-docs`);
  });
}

main();
