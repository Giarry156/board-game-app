// Importing dependencies.
import request from "supertest";
import { describe } from "@jest/globals";

// Retrieving: Test Utils.
import retrieveTestUser from "./utils/retrieveTestUser.util";

// Importing: Core.
import Core from "../src/core";
import retrieveTestBoardGame from "./utils/retrieveTestBoardGame.util";

// Retrieving the application.
const app = new Core(3003).getApplication();

// Defining tests.
describe("API User Collection", () => {
  describe("GET /api/collection", () => {
    test("It should return 401 if the user is not authenticated or invalid", async () => {
      await request(app).get("/api/collection").expect(401);
      await request(app)
        .get("/api/collection")
        .auth("invalid@invalid.it", "invalid")
        .expect(401);
    });

    test("It should retrieve the user's collection by returning 200", async () => {
      // Retrieving test user.
      const loginData = await retrieveTestUser();

      const response = await request(app)
        .get("/api/collection")
        .auth(loginData.email, loginData.password)
        .expect(200);

      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe("POST /api/collection", () => {
    test("It should return 401 if the user is not authenticated or invalid", async () => {
      await request(app).post("/api/collection").expect(401);
      await request(app)
        .post("/api/collection")
        .auth("invalid@invalid.it", "invalid")
        .expect(401);
    });

    test("It should return 404 if the board game is not found", async () => {
      // Retrieving test user.
      const loginData = await retrieveTestUser();

      await request(app)
        .post("/api/collection")
        .auth(loginData.email, loginData.password)
        .send({ boardGameId: 0 })
        .expect(404);
    });

    test("It should add a board game to the user's collection by returning 201", async () => {
      // Retrieving test user.
      const loginData = await retrieveTestUser();

      // Retrieving a board game.
      const boardGameData = await retrieveTestBoardGame();

      const response = await request(app)
        .post("/api/collection")
        .auth(loginData.email, loginData.password)
        .send({ boardGameId: boardGameData.id })
        .expect(201);

      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.id).toBe(boardGameData.id);
    });
  });

  describe("DELETE /api/collection", () => {
    test("It should return 401 if the user is not authenticated or invalid", async () => {
      await request(app).delete("/api/collection").expect(401);
      await request(app)
        .delete("/api/collection")
        .auth("invalid@invalid.it", "invalid")
        .expect(401);
    });

    test("It should return 404 if the board game is not found", async () => {
      // Retrieving test user.
      const loginData = await retrieveTestUser();

      await request(app)
        .delete("/api/collection")
        .auth(loginData.email, loginData.password)
        .send({ boardGameId: 0 })
        .expect(404);
    });

    test("It should remove a board game from the user's collection by returning 200", async () => {
      // Retrieving test user.
      const loginData = await retrieveTestUser();

      // Retrieving a board game.
      const boardGameData = await retrieveTestBoardGame();

      // Adding a board game to the user's collection.
      await request(app)
        .post("/api/collection")
        .auth(loginData.email, loginData.password)
        .send({ boardGameId: boardGameData.id });

      const response = await request(app)
        .delete("/api/collection")
        .auth(loginData.email, loginData.password)
        .send({ boardGameId: boardGameData.id })
        .expect(200);

      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.id).toBe(boardGameData.id);
    });
  });
});
