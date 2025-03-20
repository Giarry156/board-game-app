// Importing: Dependencies.
import { SwaggerOptions } from "swagger-ui-express";

// Defining components.
const swaggerSchemas = {
  BoardGame: {
    type: "object",
    properties: {
      code: { type: "string" },
      title: { type: "string" },
      numberOfPlayers: { type: "number" },
      playTime: { type: "number" },
      publisher: { type: "string" },
    },
  },
  RegisterResponseData: {
    type: "object",
    properties: {
      id: { type: "number" },
      name: { type: "string" },
      email: { type: "string" },
    },
  },
  ValidationErrorInfo: {
    type: "object",
    properties: {
      validation: { type: "string" },
      code: { type: "string" },
      message: { type: "string" },
      path: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
  },
  ErrorResponse: {
    type: "object",
    properties: {
      status: { type: "number" },
      message: { type: "string" },
      info: {
        type: "array",
        items: {
          oneOf: [{ $ref: "#/components/schemas/ValidationErrorInfo" }],
        },
      },
    },
  },
};

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
      schemas: swaggerSchemas,
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
