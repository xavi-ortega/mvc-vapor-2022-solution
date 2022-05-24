import { createAppStore } from "../index";
import { pushView } from "../views/actions";
import {
  selectViewsWithId,
  makeSelectViewsByName,
  makeSelectCountViewsByName,
} from "../views/selectors";
// Do not modify this file
// Make all changes to src/store/views/selectors.js

// Use createSelector when memoization is needed
// You need memoization in one of the following two cases:
// 1. When it is very expensive to compute the result
// 2. When the result returns a new object not present in the state
//   (e.g. a filter, a map, ...)

// Use reselecto to import the createSelector.
//   > import { createSelector } from 'reselect'
// It will allow to create selectors that are memoized.

// The new selector can be exported directly, something like:
//   > export const select... = createSelector(...);
// The official docs are here:
//   - https://github.com/reduxjs/reselect#api
// But as example, it receives two arguments:
//   - an array with other selectors
//   - a function that receives the results of the other selectors
// Ex:
//    export const selectX = createSelector([selectY, selectZ], (y, z) => y + z);
// Reselect will only recompute the result the first time, or
// if one of the selectors changes its result.

test("selectViewsWithId returns an empty array if there is no view with id", () => {
  const store = createAppStore();
  // you can add export function selectViewsWithId() { return [] }
  const found = selectViewsWithId(store.getState());
  expect(found).toEqual([]);
});

test("selectViewsWithId returns always the same result if there is no changes in the state", () => {
  const store = createAppStore();
  // you can add export function selectViewsWithId() { return [] }
  const found0 = selectViewsWithId(store.getState());
  const found1 = selectViewsWithId(store.getState());
  // you need to add memoization with create selector, so *replace* by:
  // export const selectViewsWithId = createSelector(() => []);
  expect(found0).toBe(found1);
  // make sure that you have import { creaseSelector } from "reselect";
  // Now it does not fail because both results are the same instance,
  // the memorized one. ToBe checks that both has the same reference.
});

test("selectViewsWithId returns always the same result, if there is no changes in the *views* state", () => {
  // Note that it is different from the previous one because we aim
  // to check only the views state, not the whole state.
  // Remember that the state is a tree, and we have { views: [ ... ] }
  const store = createAppStore();
  const state0 = store.getState();
  const state1 = { ...state0 }; // copies the state, keeps the same views reference
  const found0 = selectViewsWithId(state0);
  const found1 = selectViewsWithId(state1);
  // You need to add the selectViews to the createSelector so it only uses the views state
  // export const selectViewsWithId = createSelector([selectViews], () => []);
  expect(found0).toBe(found1);
});

test("selectViewsWithId returns the list of views with an id", () => {
  const store = createAppStore();
  store.dispatch(pushView({ name: "Game", id: "dot" }));
  const found = selectViewsWithId(store.getState());
  // You need to get the argument to the callback that computes the value
  // export const selectViewsWithId = createSelector([selectViews], (views) => views.filter(...));
  expect(found).toEqual([{ name: "Game", id: "dot" }]);
});

test("EXPECTED TO PASS: selectViewsWithId returns the list of views with an id, more than one case", () => {
  const store = createAppStore();
  store.dispatch(pushView({ name: "Game", id: "dot" }));
  store.dispatch(pushView({ name: "About" }));
  store.dispatch(pushView({ name: "Game", id: "mi" }));
  const found = selectViewsWithId(store.getState());
  expect(found).toEqual([
    { name: "Game", id: "dot" },
    { name: "Game", id: "mi" },
  ]);
});

// Like regular selectors, selectors with memorization may have additional arguments.
// But that argument is not passed to the callback.
// You need to add a selector to get the argument and pass to the callback, ex:
// ... createSelector([selectX, (state, arg) => arg], (x, arg) => x + arg);

// The problem is that createSelector only has memoization for one call.
// If there are two components sharing the same selector, the second is selecting
// with adifferent argument, the second one will
// overwrite the memorization and we will have no memoization.

// To fix it we use the factory pattern:
// export function makeSelectY() { return createSelector([selectX, (state, arg) => arg], (x, arg) => x + arg); }

// At this moment, if we need it at a component we can use the useMemo hook:
// export const useSelectY = useMemo(makeSelectY(), []);

test("selectViewsByName returns an empty array if there is no view with that name", () => {
  const store = createAppStore();

  // you need to export a factory function to create the selector
  // ex: export function makeSelectViewsByName() { ... }
  const selectViewsByName = makeSelectViewsByName();

  // you need to make the factory return a create selector
  // ex: return createSelector(() => []);
  const found = selectViewsByName(store.getState(), "Game");
  expect(found).toEqual([]);
});

test("EXPECTED TO PASS: selectViewsByName returns always the same result if there is no changes", () => {
  const store = createAppStore();
  const selectViewsByName = makeSelectViewsByName();
  const firstResult = selectViewsByName(store.getState(), "Game");
  const secondResult = selectViewsByName(store.getState(), "Game");
  expect(firstResult).toBe(secondResult);
});

test("selectViewsByName if there is only one element, and it matches the search, it returns the element in a list", () => {
  const store = createAppStore();
  const selectViewsByName = makeSelectViewsByName();
  store.dispatch(pushView({ name: "Game", id: "dot" }));
  store.dispatch(pushView({ name: "Friends", id: "mi" }));
  store.dispatch(pushView({ name: "Game", id: "mi" }));

  const found = selectViewsByName(store.getState(), "Game");

  // you need to add a selector to get the name, and then add the filter
  // return createSelector([selectViews, (state, name) => name], (views, name) => views.filter(...));
  expect(found).toEqual([
    { name: "Game", id: "dot" },
    { name: "Game", id: "mi" },
  ]);
});

// If we want to use if from another selector, then the other selector
// must be also a factory and we can instantiate the selector in the other factory:
//
// export function makeSelectZ() {
//   const selectY = makeSelectY();
//   return createSelector([selectY], (y) => y + 1);
// }

test.each`
  views                        | name       | count
  ${[]}                        | ${"Game"}  | ${0}
  ${[]}                        | ${"Home"}  | ${1}
  ${["Game"]}                  | ${"Game"}  | ${1}
  ${["Game"]}                  | ${"Home"}  | ${1}
  ${["Game", "About", "Game"]} | ${"Game"}  | ${2}
  ${["Game", "About", "Game"]} | ${"About"} | ${1}
  ${["Game", "About", "Game"]} | ${"Home"}  | ${1}
`(
  "selectCountViewsByName returns the number of views with the given name",
  ({ views, name, count }) => {
    const store = createAppStore();
    views.forEach((name) => store.dispatch(pushView({ name })));
    // Read the instructions before and the other cases to construct it
    // You should use makeSelectViewsByName to get the selector
    const selectCountViewsByName = makeSelectCountViewsByName();
    const found = selectCountViewsByName(store.getState(), name);
    expect(found).toBe(count);
  }
);
