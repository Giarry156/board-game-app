// Importing dependencies.
import request from "supertest";
import { describe } from "@jest/globals";
import crypto from "crypto";

// Importing: Core.
import core from "..";

// Retrieving the application.
const app = core.getApplication();

// Defining tests.
describe('API Users"', () => {
  describe("POST /api/users", () => {
    const randomEmail =
      crypto
        .createHash("sha256")
        .update(new Date().toISOString())
        .digest("hex")
        .substring(0, 10) + "@email.it";
    const registerBody = {
      email: randomEmail,
      password: "password",
      name: "John Doe",
    };

    test("It should register a user by returning 201", async () => {
      const response = (
        await request(app)
          .post("/api/users/register")
          .send(registerBody)
          .expect(201)
      ).body;

      expect(response).toHaveProperty("data");
      expect(response.data).toHaveProperty("id");
      expect(response.data).toHaveProperty("email");
      expect(response.data).toHaveProperty("name");
      expect(response.data.email).toBe(registerBody.email);
      expect(response.data.name).toBe(registerBody.name);
    });

    test("It should return 400 if the request body is invalid", async () => {
      await request(app).post("/api/users/register").send({}).expect(400);
    });
  });
});
