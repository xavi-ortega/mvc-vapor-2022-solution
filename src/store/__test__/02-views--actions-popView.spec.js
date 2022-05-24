import { POP_VIEW, popView } from "../views/actions";
// Do not modify this file
// Make all changes to src/store/views/actions.js

// This spec does not have hints, please look to the actions-pushView for hints.

test("add the POP_VIEW action type", () => {
  expect(POP_VIEW).toEqual("views/POP_VIEW");
});

test("add the popView action creator function", () => {
  expect(popView).toEqual(expect.any(Function));
});

test("popView should return an object", () => {
  const action = popView();
  expect(action).toMatchObject({});
});

test("popView should return a new action of type POP_VIEW", () => {
  const action = popView();
  expect(action).toMatchObject({ type: POP_VIEW });
});
