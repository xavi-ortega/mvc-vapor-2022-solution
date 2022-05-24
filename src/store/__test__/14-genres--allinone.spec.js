import { createAppStore } from "../index";
import { addGame } from "../games/actions";
import { selectGenres } from "../genres/selectors";
// Do not modify this file
// Make all changes to file src/store/genres/selectors.js
// Create the directory or file if necessary

// Note that genres do not have actions,
// or reducers, only one selector.

test("selectGenres by default returns no genres", () => {
  const store = createAppStore();
  const found = selectGenres(store.getState());
  expect(found).toEqual([]);
});

test("selectGenres memoizes the result", () => {
  const store = createAppStore();
  const state = store.getState();
  const found0 = selectGenres(state);
  const found1 = selectGenres(state);
  expect(found0).toBe(found1);
});

test("selectGenres returns the genres of the current added games", () => {
  const store = createAppStore();
  store.dispatch(addGame("dot", 1993, "pac"));
  store.dispatch(addGame("sonic", 1991, "platforms"));

  const found = selectGenres(store.getState());
  expect(found).toEqual(["pac", "platforms"]);
});

test("selectGenres remove duplicated genres", () => {
  const store = createAppStore();
  store.dispatch(addGame("dot", 1993, "pac"));
  store.dispatch(addGame("sonic", 1991, "platforms"));
  store.dispatch(addGame("mi", 1990, "pac"));

  const found = selectGenres(store.getState());
  expect(found).toEqual(["pac", "platforms"]);
});

test("selectGenres sort by text", () => {
  const store = createAppStore();
  store.dispatch(addGame("sonic", 1991, "platforms"));
  store.dispatch(addGame("mi", 1990, "pac"));

  const found = selectGenres(store.getState());
  expect(found).toEqual(["pac", "platforms"]);
});
