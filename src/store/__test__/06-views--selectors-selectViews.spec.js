import { createAppStore } from "../index";
import { pushView } from "../views/actions";
import { selectViews } from "../views/selectors";
// Do not modify this file
// Make all changes to src/store/views/selectors.js

// Selectors are functions that receives the redux state
// and returns the relevant data for a query

test("add the selector selectViews to selectors", () => {
  // add: export function selectViews() {}
  // to src/store/views/selectors.js
  expect(selectViews).toEqual(expect.any(Function));
});

test("selectViews returns the content of the state.views field", () => {
  const state = { views: { return: "this object" } };
  const result = selectViews(state);
  // replace export function selectViews(state) {}
  // add: return state.views
  expect(result).toEqual(state.views);
});

test("EXPECTED TO PASS: the result of the selectViews selector should be the same instance from the state, not a copy", () => {
  const state = { views: { return: "this object" } };
  const result = selectViews(state);
  // toBe checks a === b , not a contents equal to b contents
  expect(result).toBe(state.views);
});

test("EXPECTED TO PASS: selectViews in fact returns the object from the state", () => {
  const store = createAppStore();
  const state = store.getState();
  const result = selectViews(state);
  // toBe checks a === b , not a contents equal to b contents
  expect(result).toBe(state.views);
});

test("EXPECTED TO PASS: and the content of the store is the expected", () => {
  const store = createAppStore();
  const state = store.getState();
  const result = selectViews(state);
  expect(result).toEqual([{ name: "Home" }]);
});
