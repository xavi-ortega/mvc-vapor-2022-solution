import { createAppStore } from "../index";
import { pushView } from "../views/actions";
import { selectTopView, selectHasBack } from "../views/selectors";
// Do not modify this file
// Make all changes to src/store/views/selectors.js

// In this case, this selector returns only what is in the top of the view.
// Use the previous test to inspire how to add the selector

test("the selector selectTopView is a function", () => {
  expect(selectTopView).toEqual(expect.any(Function));
});

test("selectTopView returns the top view of the views array from the state", () => {
  // hint: add the state argument and use selectViews to get the views array
  const store = createAppStore();
  const topView = selectTopView(store.getState());
  expect(topView).toEqual({ name: "Home" });
});

test("EXPECTED TO PASS: selectTopView returns the toppest view of the array", () => {
  const store = createAppStore();
  store.dispatch(pushView({ name: "About" }));
  store.dispatch(pushView({ name: "Contact" }));
  const topView = selectTopView(store.getState());
  expect(topView).toEqual({ name: "Contact" });
});

// Now let's try another but without less tests

test("selectHasBack returns false if there is one view", () => {
  const store = createAppStore();
  const hasBack = selectHasBack(store.getState());
  expect(hasBack).toBe(false);
});

test("selectHasBack returns true if there is more than one view", () => {
  const store = createAppStore();
  store.dispatch(pushView({ name: "About" }));
  const hasBack = selectHasBack(store.getState());
  expect(hasBack).toBe(true);
});
