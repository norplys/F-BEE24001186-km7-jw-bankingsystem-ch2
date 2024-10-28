import swaggerAutogen from "swagger-autogen";

const doc = {
    info: {
      title: "Bank API",
      description: "API Documentation",
    },
    host: "localhost:3000",
    schemes: ["http"],
  };
  
  const outputFile = "./src/swagger_output.json";
  const routes = ["./src/routes/accounts.js", "./src/routes/users.js", "./src/routes/transactions.js", "./src/routes/profiles.js"];
  
  swaggerAutogen()(outputFile, routes, doc);