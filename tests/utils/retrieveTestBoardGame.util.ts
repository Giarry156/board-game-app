import crypto from "crypto";

import BoardGameRepository from "../../src/repositories/boardgame.repository";

export default async function retrieveTestBoardGame() {
  const boardGameRepository = new BoardGameRepository();

  let boardGame = (await boardGameRepository.getBoardGamesList())[0];

  if (!boardGame) {
    boardGame = await boardGameRepository.createBoardGame({
      code: crypto.randomBytes(16).toString("hex"),
      title: "Test board game",
      numberOfPlayers: 4,
      playTime: 60,
      publisher: "Test publisher",
    });
  }

  return boardGame;
}
