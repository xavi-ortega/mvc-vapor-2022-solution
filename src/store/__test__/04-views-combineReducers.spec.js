import { createAppStore } from "../index";
import { pushView, popView } from "../views/actions";
// Do not modify this file
// Make all changes to src/store/index.js
// In this case, I do recommend reading the EXPECTED TO PASS and try
// to understand why they are working

test("EXPECTED TO PASS: creates the redux store", () => {
  const store = createAppStore();
  expect(store).toMatchObject({});
  expect(store.dispatch).toEqual(expect.any(Function));
  expect(store.getState).toEqual(expect.any(Function));
  expect(store.subscribe).toEqual(expect.any(Function));
  expect(store.getState()).toMatchObject({});
});

test("add the viewsReducer to the combineReducers", () => {
  const store = createAppStore();
  // add the import { viewsReducer } from "./views/reducers";
  // add the views: viewsReducer, inside the combineReducers({ ... })
  expect(store.getState()).toMatchObject({ views: expect.any(Array) });
});

test("EXPECTED TO PASS: the store initial state contains the initialState of the viewsReducer at views", () => {
  const store = createAppStore();
  expect(store.getState()).toMatchObject({ views: [{ name: "Home" }] });
});

test("EXPECTED TO PASS: the store reduces pushView and modifies the views state accordingly", () => {
  const store = createAppStore();
  store.dispatch(pushView({ name: "About" }));
  expect(store.getState()).toMatchObject({
    views: [{ name: "Home" }, { name: "About" }],
  });
});

test("EXPECTED TO PASS: the store reduces popView and modifies the views state accordingly", () => {
  const store = createAppStore();
  store.dispatch(pushView({ name: "About" }));
  store.dispatch(popView());
  expect(store.getState()).toMatchObject({
    views: [{ name: "Home" }],
  });
});
