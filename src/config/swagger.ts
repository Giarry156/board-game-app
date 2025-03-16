// Importing: Dependencies.
import { SwaggerOptions } from "swagger-ui-express";

// Defining options.
const swaggerOptions: SwaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Board Game Collection API",
      version: "1.0.0",
      description: "A minimal REST API for managing a board game collection",
    },
    components: {
      securitySchemes: {
        basicAuth: {
          type: "http",
          scheme: "basic",
        },
      },
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
