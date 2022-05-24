import { ADD_GAME, addGame } from "../games/actions";
// Do not modify this file
// Make all changes to src/store/games/actions.js
// Create the directory or file if necessary

test("addGame creates a new game of type ADD_GAME with a game field", () => {
  const action = addGame("dot", 1993, "pac");
  expect(action).toEqual({
    type: ADD_GAME,
    game: { title: "dot", year: 1993, genre: "pac" },
  });
});

test("ADD_GAME should start with the games/ namespace", () => {
  expect(ADD_GAME).toMatch(/^games\//);
});

test("EXPECTED TO PASS: addGame another example", () => {
  const action = addGame("sonic", 1991, "platforms");
  expect(action).toEqual({
    type: ADD_GAME,
    game: { title: "sonic", year: 1991, genre: "platforms" },
  });
});
