import { createAppStore } from "../index";
import { addGame } from "../games/actions";
import { selectGames, makeSelectGamesByGenre } from "../games/selectors";
// Do not modify this file
// Make all changes to src/store/games/selectors.js
// Create the directory or file if necessary

test("selectGames returns the games array", () => {
  const store = createAppStore();
  store.dispatch(addGame("dot", 1993, "pac"));
  const found = selectGames(store.getState());
  expect(found).toEqual([{ title: "dot", year: 1993, genre: "pac" }]);
});

test("EXPECTED TO PASS: selectGames returns the array reference from the state", () => {
  const store = createAppStore();
  const state = store.getState();
  const found = selectGames(state);
  expect(found).toBe(state.games);
});

test("makeSelectByGenre creates the selector that returns empty array if there is no game", () => {
  const store = createAppStore();
  const selectGamesByGenre = makeSelectGamesByGenre();
  const found = selectGamesByGenre(store.getState(), "pac");
  expect(found).toEqual([]);
});

test("makeSelectByGenre creates the selector that returns empty array if there is no game of that genre", () => {
  const store = createAppStore();
  store.dispatch(addGame("dot", 1993, "pac"));
  const selectGamesByGenre = makeSelectGamesByGenre();
  const found = selectGamesByGenre(store.getState(), "platforms");
  expect(found).toEqual([]);
});

test("makeSelectByGenre creates the selector that returns the games of one specific genre", () => {
  const store = createAppStore();
  store.dispatch(addGame("dot", 1993, "pac"));
  store.dispatch(addGame("mi", 1990, "pac"));
  store.dispatch(addGame("sonic", 1991, "platforms"));
  const selectGamesByGenre = makeSelectGamesByGenre();
  const found = selectGamesByGenre(store.getState(), "pac");
  expect(found).toEqual([
    { title: "dot", year: 1993, genre: "pac" },
    { title: "mi", year: 1990, genre: "pac" },
  ]);
});
