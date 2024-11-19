/* eslint-disable no-console */
import "./instrument.js";
import { createServer } from 'http';
import socket from "./utils/socket.js";
import errorHandler from "./middlewares/error.js";
import * as Sentry from "@sentry/node";
import morgan from "morgan";
import express, { json } from "express";
import routes from "./routes/index.js";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json" with { type: "json" };

async function main() {
  const app = express();
  const server = createServer(app);
  const port = process.env.PORT || 3000;
  
  app.use(json());
  app.use(morgan('combined'));

  routes(app);

  socket(app, server)

  app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  Sentry.setupExpressErrorHandler(app);

  errorHandler(app);

  server.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
    console.log(`API documentation is available at http://localhost:${port}/api-docs`);
  });
}

main();
