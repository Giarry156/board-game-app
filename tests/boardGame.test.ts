// Importing dependencies.
import request from "supertest";
import { describe } from "@jest/globals";
import crypto from "crypto";

// Importing: Core.
import Core from "../src/core";
import retrieveTestBoardGame from "./utils/retrieveTestBoardGame.util";
import retrieveTestUser from "./utils/retrieveTestUser.util";

// Retrieving the application.
const app = new Core(3001).getApplication();

// Defining tests.
describe('API Board Games"', () => {
  const createRequestBody = {
    code: crypto
      .createHash("sha256")
      .update(new Date().toISOString())
      .digest("hex")
      .substring(0, 10),
    title: "Title",
    numberOfPlayers: 2,
    playTime: 30,
    publisher: "Publisher",
  };

  const updateRequestBody = {
    code: crypto
      .createHash("sha256")
      .update(new Date().toISOString())
      .digest("hex")
      .substring(0, 10),
    title: "Title 2",
    numberOfPlayers: 3,
    playTime: 45,
    publisher: "Publisher 2",
  };

  describe("GET /api/board-games", () => {
    test("It should return 401 if the user is not authenticated or invalid", async () => {
      await request(app).get("/api/board-games").expect(401);
      await request(app)
        .get("/api/collection")
        .auth("invalid@invalid.it", "invalid")
        .expect(401);
    });

    test("It should retrieve a list of board games by returning 200", async () => {
      const loginData = await retrieveTestUser();

      const response = await request(app)
        .get("/api/board-games")
        .auth(loginData.email, loginData.password)
        .expect(200);

      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toBeInstanceOf(Array);
    });
  });

  describe("POST /api/board-games", () => {
    test("It should return 401 if the user is not authenticated or invalid", async () => {
      await request(app).post("/api/board-games").expect(401);
      await request(app)
        .post("/api/board-games")
        .auth("invalid@invalid.it", "invalid")
        .expect(401);
    });

    test("It should return 400 if the request body is invalid", async () => {
      const loginData = await retrieveTestUser();
      await request(app)
        .post("/api/board-games")
        .send({})
        .auth(loginData.email, loginData.password)
        .expect(400);
    });

    test("It should create a board game by returning 201", async () => {
      const loginData = await retrieveTestUser();
      const response = await request(app)
        .post("/api/board-games")
        .auth(loginData.email, loginData.password)
        .send(createRequestBody)
        .expect(201);

      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("code");
      expect(response.body.data).toHaveProperty("title");
      expect(response.body.data).toHaveProperty("numberOfPlayers");
      expect(response.body.data).toHaveProperty("playTime");
      expect(response.body.data).toHaveProperty("publisher");
      expect(response.body.data.code).toBe(createRequestBody.code);
      expect(response.body.data.title).toBe(createRequestBody.title);
      expect(response.body.data.numberOfPlayers).toBe(
        createRequestBody.numberOfPlayers
      );
      expect(response.body.data.playTime).toBe(createRequestBody.playTime);
      expect(response.body.data.publisher).toBe(createRequestBody.publisher);
    });

    test("It should return 409 if the board game with the same code already exists", async () => {
      const loginData = await retrieveTestUser();
      await request(app)
        .post("/api/board-games")
        .auth(loginData.email, loginData.password)
        .send(createRequestBody)
        .expect(409);
    });
  });

  describe("GET /api/board-games/:id", () => {
    test("It should return 401 if the user is not authenticated or invalid", async () => {
      await request(app).get("/api/board-games/1").expect(401);
      await request(app)
        .get("/api/board-games/1")
        .auth("invalid@invalid.it", "invalid")
        .expect(401);
    });

    test("It should retrieve a board game by returning 200", async () => {
      const loginData = await retrieveTestUser();
      const boardGame = await retrieveTestBoardGame();

      const response = await request(app)
        .get("/api/board-games/" + String(boardGame.id))
        .auth(loginData.email, loginData.password)
        .expect(200);

      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data.id).toBe(boardGame.id);
    });
  });

  describe("PATCH /api/board-games/:id", () => {
    test("It should return 401 if the user is not authenticated or invalid", async () => {
      await request(app).patch("/api/board-games/1").expect(401);
      await request(app)
        .patch("/api/board-games/1")
        .auth("invalid@invalid.it", "invalid")
        .expect(401);
    });

    test("It should return 404 if the board game is not found", async () => {
      const loginData = await retrieveTestUser();
      await request(app)
        .patch("/api/board-games/0")
        .auth(loginData.email, loginData.password)
        .send(createRequestBody)
        .expect(404);
    });

    test("It should return 409 if the board game with the same code already exists", async () => {
      const loginData = await retrieveTestUser();
      const boardGame = await retrieveTestBoardGame();

      await request(app)
        .patch("/api/board-games/" + String(boardGame.id))
        .auth(loginData.email, loginData.password)
        .send({ code: createRequestBody.code })
        .expect(409);
    });

    test("It should update a board game by returning 200", async () => {
      const loginData = await retrieveTestUser();
      const boardGame = await retrieveTestBoardGame();

      const response = await request(app)
        .patch("/api/board-games/" + String(boardGame.id))
        .send(updateRequestBody)
        .auth(loginData.email, loginData.password)
        .expect(200);

      expect(response.body).toHaveProperty("data");
      expect(response.body.data).toHaveProperty("id");
      expect(response.body.data).toHaveProperty("code");
      expect(response.body.data).toHaveProperty("title");
      expect(response.body.data).toHaveProperty("numberOfPlayers");
      expect(response.body.data).toHaveProperty("playTime");
      expect(response.body.data).toHaveProperty("publisher");
      expect(response.body.data.code).toBe(updateRequestBody.code);
      expect(response.body.data.title).toBe(updateRequestBody.title);
      expect(response.body.data.numberOfPlayers).toBe(
        updateRequestBody.numberOfPlayers
      );
      expect(response.body.data.playTime).toBe(updateRequestBody.playTime);
      expect(response.body.data.publisher).toBe(updateRequestBody.publisher);
    });
  });

  describe("DELETE /api/board-games/:id", () => {
    test("It should return 401 if the user is not authenticated or invalid", async () => {
      await request(app).delete("/api/board-games/1").expect(401);
      await request(app)
        .delete("/api/board-games/1")
        .auth("invalid@invalid.it", "invalid")
        .expect(401);
    });

    test("It should return 404 if the board game is not found", async () => {
      const loginData = await retrieveTestUser();
      await request(app)
        .delete("/api/board-games/0")
        .auth(loginData.email, loginData.password)
        .expect(404);
    });

    test("It should delete a board game by returning 204", async () => {
      const loginData = await retrieveTestUser();
      const boardGame = await retrieveTestBoardGame();

      const response = await request(app)
        .delete("/api/board-games/" + String(boardGame.id))
        .auth(loginData.email, loginData.password)
        .expect(200);

      expect(response.body).hasOwnProperty("data");
      expect(response.body.data).hasOwnProperty("id");
      expect(response.body.data.id).toBe(boardGame.id);
    });
  });
});
