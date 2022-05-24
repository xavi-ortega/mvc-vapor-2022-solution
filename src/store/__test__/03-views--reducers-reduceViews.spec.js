import { viewsReducer } from "../views/reducers";
import { pushView, popView } from "../views/actions";
// Do not modify this file
// Make all changes to src/store/views/reducers.js

const noAction = { type: "NO_ACTION" };

// A reducer is a function that takes a state and an action, and returns a new state.
// The shape of the reducer is:
// const initialState = ...;
// export function viewsReducer(state = initialState, action) {
//   switch (action.type) {
//     case ACTION_TYPE_A: {
//       return reduceActionTypeA;
//     }
//     case ACTION_TYPE_B: {
//       return reduceActionTypeB;
//     }
//     default:
//       return state;
//   }
// }

test("add the viewsReducer function to views/reducer", () => {
  // add: export function reduceViews() {}
  expect(viewsReducer).toEqual(expect.any(Function));
});

test('the initial sate is [{name: "Home"}]', () => {
  const result = viewsReducer(undefined, noAction);
  // add: const initialState = [{name: "Home"}];
  // update: function viewsReducer(state = initialState, action) { return state; }
  expect(result).toEqual([{ name: "Home" }]);
});

test("pushView adds a new view to the state", () => {
  const state0 = viewsReducer(undefined, noAction);
  const result = viewsReducer(state0, pushView({ name: "About" }));
  // replace the return by: switch (action.type) { default: return state; }
  // add the case PUSH_VIEW: return [...state, action.view]; and the import (ctrl+space)
  expect(result).toEqual([{ name: "Home" }, { name: "About" }]);
  // note: if the import is not done automatically add the import { PUSH_VIEW } from './actions';
});

test("EXPECTED TO PASS: if the action is known, it returns the same state instance", () => {
  // This test ensures that default: return state; works correctly
  const dummyState = {};
  const result = viewsReducer(dummyState, { type: "UNKOWN" });
  expect(result).toBe(dummyState);
});

test("EXPECTED TO PASS: the reducer does not mutate the state when pushView", () => {
  const state0 = viewsReducer(undefined, noAction);
  const state1 = viewsReducer(state0, pushView({ name: "About" }));
  expect(state0).not.toEqual(state1);
});

test("popView removes the last view from the state", () => {
  const state0 = viewsReducer(undefined, noAction);
  const state1 = viewsReducer(state0, pushView({ name: "About" }));
  const result = viewsReducer(state1, popView());
  // add the case POP_VIEW: return state.slice(0, -1);
  // remember add the import { POP_VIEW } from './actions';
  expect(result).toEqual([{ name: "Home" }]);
});

test("popView does not pop the last element", () => {
  const state0 = viewsReducer(undefined, noAction);
  const result = viewsReducer(state0, popView());
  // modify the case POP_VIEW:
  // if (state.length === 1) return state; else return state.slice(0, -1);
  expect(result).toEqual([{ name: "Home" }]);
});

test("EXPECTED TO PASS: the reducer does not mutate the state when popView", () => {
  const state0 = viewsReducer(undefined, noAction);
  const state1 = viewsReducer(state0, pushView({ name: "About" }));
  const state2 = viewsReducer(state1, popView());
  expect(state1).not.toEqual(state2);
});
