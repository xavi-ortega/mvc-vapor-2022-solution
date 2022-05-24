import { createAppStore } from "../index";
import { addGame } from "../games/actions";
// Do not modify this file
// Make all changes to files:
// - src/store/games/reducers.js
// - src/store/index.js
// Create the directory or file if necessary

test("the reducer for games is combined with the state and has an empty array as initial state", () => {
  const store = createAppStore();
  const state = store.getState();
  expect(state).toHaveProperty("games", []);
});

test("addGame adds one game to the list of games", () => {
  const store = createAppStore();
  store.dispatch(addGame("dot", 1993));
  const state = store.getState();
  expect(state).toHaveProperty("games", [{ title: "dot", year: 1993 }]);
});

test("EXPECTED TO PASS: addGames can add more than one game", () => {
  const store = createAppStore();
  store.dispatch(addGame("dot", 1993, "pac"));
  store.dispatch(addGame("mi", 1990, "pac"));
  const state = store.getState();
  expect(state).toHaveProperty("games", [
    { title: "dot", year: 1993, genre: "pac" },
    { title: "mi", year: 1990, genre: "pac" },
  ]);
});
