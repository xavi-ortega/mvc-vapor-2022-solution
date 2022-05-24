import { createAppStore } from "../index";
import { pushView } from "../views/actions";
import { selectViewName, selectHasAtLeastViewsCount } from "../views/selectors";
// Do not modify this file
// Make all changes to src/store/views/selectors.js

// selectors, in addition to the state, also can receive
// more arguments

test("selectViewName returns null if there is no view with that name", () => {
  const store = createAppStore();
  const found = selectViewName(store.getState(), "Game");
  expect(found).toEqual(null);
});

test("selectViewName returns the the view that matches with the name", () => {
  const store = createAppStore();
  store.dispatch(pushView({ name: "Game", id: "pop" }));
  const found = selectViewName(store.getState(), "Game");
  // add a second argument as: (state, { name })
  // and find the result inside the array
  expect(found).toEqual({ name: "Game", id: "pop" });
});

test("MAY PASS: selectViewName looks in all the views array", () => {
  const store = createAppStore();
  store.dispatch(pushView({ name: "Game", id: "pop" }));
  store.dispatch(pushView({ name: "About" }));
  const found = selectViewName(store.getState(), "Game");
  expect(found).toEqual({ name: "Game", id: "pop" });
});

test("if multiple matches, selectViewName gets the last one", () => {
  const store = createAppStore();
  store.dispatch(pushView({ name: "Game", id: "pop1" }));
  store.dispatch(pushView({ name: "Game", id: "pop2" }));
  store.dispatch(pushView({ name: "About" }));
  const found = selectViewName(store.getState(), "Game");
  // Make sure that the algorithm gets the last
  expect(found).toEqual({ name: "Game", id: "pop2" });
});

test("EXPECTED TO PASS: the selectViewName selector does not mutate the state", () => {
  const store = createAppStore();
  store.dispatch(pushView({ name: "Game", id: "pop" }));
  store.dispatch(pushView({ name: "About" }));
  const state = store.getState();
  selectViewName(state, "Game");
  // hint: if it fails, you may have mutated the state in the query
  expect(state).toMatchObject({
    views: [{ name: "Home" }, { name: "Game", id: "pop" }, { name: "About" }],
  });
});

// This one is like the previous one, but, it asks for the length of the
// views array. And we use a table. And you should be able to create the
// code with no hints.
// SOME MAY PASS directly.
test.each`
  pushViews               | count | expected
  ${[]}                   | ${0}  | ${true}
  ${[]}                   | ${1}  | ${true}
  ${[]}                   | ${2}  | ${false}
  ${["Contact"]}          | ${0}  | ${true}
  ${["Contact"]}          | ${1}  | ${true}
  ${["Contact"]}          | ${2}  | ${true}
  ${["Contact"]}          | ${3}  | ${false}
  ${["Contact", "About"]} | ${0}  | ${true}
  ${["Contact", "About"]} | ${1}  | ${true}
  ${["Contact", "About"]} | ${2}  | ${true}
  ${["Contact", "About"]} | ${3}  | ${true}
  ${["Contact", "About"]} | ${4}  | ${false}
`(
  "selectHasAtLeastViewsCount($pushViews, $count)",
  ({ pushViews, count, expected }) => {
    const store = createAppStore();
    pushViews.forEach((name) => store.dispatch(pushView({ name })));
    const found = selectHasAtLeastViewsCount(store.getState(), count);
    expect(found).toEqual(expected);
  }
);
