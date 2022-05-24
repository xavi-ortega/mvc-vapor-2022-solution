import { addGame } from "../games/actions";
import { createAppStore } from "../index";
import { setSorter } from "../sorter/actions";
import {
  selectSorter,
  selectIsSorterActive,
  selectSortedGames,
  makeSelectSortedGamesByGenre,
} from "../sorter/selectors";
// Do not modify this file
// Make all changes to files:
// - src/store/sorter/actions.js
// - src/store/sorter/reducers.js
// - src/store/sorter/selectors.js
// - src/store/index.js
// Create the directory or file if necessary

// This time will be different.
// Now you have seen the basics to create actions,
// selectors and reducers.
// This test file will not guide you, it will only test your code.
// And that you code behaves as expected.
// It is like the testing of the contract that the UI will use.
// You have to decide the implementation of each part.
// But you have to follow redux rules, and you have to be
// consistent with the conventions that you have seen.

test("the default sorter is title", () => {
  const store = createAppStore();
  const found = selectSorter(store.getState());
  expect(found).toBe("title");
});

test("you can change the sorter with the setSorter action", () => {
  const store = createAppStore();
  store.dispatch(setSorter("year"));
  const found = selectSorter(store.getState());
  expect(found).toBe("year");
});

test.each`
  existingSort | query      | expected
  ${"title"}   | ${"title"} | ${true}
  ${"title"}   | ${"year"}  | ${false}
  ${"year"}    | ${"title"} | ${false}
  ${"year"}    | ${"year"}  | ${true}
  ${"genre"}   | ${"title"} | ${false}
  ${"genre"}   | ${"year"}  | ${false}
  ${"genre"}   | ${"genre"} | ${true}
`(
  "you can ask if a kind of sort is active, case $existingSort, $query",
  ({ existingSort, query, expected }) => {
    const store = createAppStore();
    store.dispatch(setSorter(existingSort));
    const found = selectIsSorterActive(store.getState(), query);
    expect(found).toBe(expected);
  }
);

// Note: The following selectors requires to use the selectors from games.

const dot = { title: "dot", year: 1993, genre: "pac" };
const mi = { title: "mi", year: 1990, genre: "pac" };
const sonic = { title: "sonic", year: 1991, genre: "platforms" };
function addGames(titles, store) {
  titles.forEach((title) => {
    const game = [dot, mi, sonic].find((g) => g.title === title);
    store.dispatch(addGame(game.title, game.year, game.genre));
  });
}

test.each`
  titles                    | sorter     | expected
  ${["dot", "mi"]}          | ${"title"} | ${[dot, mi]}
  ${["mi", "dot"]}          | ${"title"} | ${[dot, mi]}
  ${["dot", "mi"]}          | ${"year"}  | ${[mi, dot]}
  ${["dot", "sonic"]}       | ${"genre"} | ${[dot, sonic]}
  ${["sonic", "dot"]}       | ${"genre"} | ${[dot, sonic]}
  ${["dot", "sonic", "mi"]} | ${"genre"} | ${[dot, mi, sonic]}
  ${["mi", "sonic", "dot"]} | ${"genre"} | ${[mi, dot, sonic]}
`(
  `selectSortedGames #$# $titles sorted by "$sorter"`,
  ({ titles, sorter, expected }) => {
    const store = createAppStore();
    store.dispatch(setSorter(sorter));
    addGames(titles, store);
    const found = selectSortedGames(store.getState());
    expect(found).toEqual(expected);
  }
);

test("selectSortedGames memorizes the result correctly", () => {
  const store = createAppStore();
  store.dispatch(setSorter("year"));
  store.dispatch(addGame("dot", 1993, "pac"));
  store.dispatch(addGame("mi", 1990, "pac"));
  const state = store.getState();
  const found0 = selectSortedGames(state);
  const found1 = selectSortedGames({ ...state });
  expect(found0).toBe(found1);
});

test("selectSortedGames does not mutate, change the order of, the state games list", () => {
  const store = createAppStore();
  store.dispatch(setSorter("year"));
  store.dispatch(addGame("dot", 1993, "pac"));
  store.dispatch(addGame("mi", 1990, "pac"));
  const state = store.getState();

  const originalGames = [...state.games];
  selectSortedGames(state);

  // array.sort() mutates the array
  // use array.slice().sort() instead
  expect(state.games).toEqual(originalGames);
});

test.each`
  titles                    | sorter     | genre          | expected
  ${["dot", "mi"]}          | ${"title"} | ${"pac"}       | ${[dot, mi]}
  ${["mi", "dot"]}          | ${"title"} | ${"pac"}       | ${[dot, mi]}
  ${["mi", "dot"]}          | ${"title"} | ${"platforms"} | ${[]}
  ${["dot", "mi"]}          | ${"year"}  | ${"pac"}       | ${[mi, dot]}
  ${["dot", "sonic", "mi"]} | ${"year"}  | ${"pac"}       | ${[mi, dot]}
  ${["dot", "sonic", "mi"]} | ${"year"}  | ${"platforms"} | ${[sonic]}
  ${["dot", "sonic"]}       | ${"genre"} | ${"pac"}       | ${[dot]}
  ${["dot", "sonic"]}       | ${"genre"} | ${"platforms"} | ${[sonic]}
  ${["dot", "sonic", "mi"]} | ${"genre"} | ${"pac"}       | ${[dot, mi]}
  ${["mi", "sonic", "dot"]} | ${"genre"} | ${"pac"}       | ${[mi, dot]}
  ${["mi", "sonic", "dot"]} | ${"genre"} | ${"platforms"} | ${[sonic]}
`(
  'makeSelectSortedGamesByGenre #$# $titles sorted by "$sorter" and filtered by "$genre"',
  ({ titles, sorter, expected, genre }) => {
    const store = createAppStore();
    store.dispatch(setSorter(sorter));
    addGames(titles, store);
    const selectSortedGamesByGenre = makeSelectSortedGamesByGenre(genre);
    const found = selectSortedGamesByGenre(store.getState(), genre);
    expect(found).toEqual(expected);
  }
);
