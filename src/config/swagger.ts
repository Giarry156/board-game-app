// Importing: Dependencies.
import { Options } from "swagger-jsdoc";

// Defining options.
const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Board Game Collection API",
      version: "1.0.0",
      description: "A minimal REST API for managing a board game collection",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

// Exporting options.
export default swaggerOptions;
