import { createAppStore } from "../index";
import {
  pushView,
  RETURN_HOME,
  returnHome,
  replaceHome,
} from "../views/actions";
// Do not modify this file
// Make all changes to src/store/views/actions.js
// and src/store/views/reducers.js

// In this case, the difficulty grows to consolidate new learnings.
// You should review previous tests if you have problems to continue.

// Note that in the previous tests, they worked because the
// is the task of the viewsReducer implement the update of the state
// and it is delegated through the combineReducers.

// Now we will add a new action, that requires:
// - create and export the string constant ActionType at actions.js
// - create and export the function ActionCreator at actions.js
// - add the corresponding switch case to the reducers.js,
//   and implement the logic in the reducer corresponding case

test("there is the ActionType RETURN_HOME", () => {
  expect(RETURN_HOME).toEqual("views/RETURN_HOME");
});

test("there is the ActionCreator returnHome", () => {
  const action = returnHome();
  expect(action).toEqual({ type: RETURN_HOME });
});

test("the viewsReducer returns the initial state when receives a returnHome action", () => {
  const store = createAppStore();
  store.dispatch(pushView({ name: "About" }));
  store.dispatch(returnHome());
  expect(store.getState()).toMatchObject({ views: [{ name: "Home" }] });
});

// And now we will not test for the ActionType,
// neither that the actionCreator works correctly
// it will test only that the actionCreator creates something
// that when reduced, will replace the home

// So you have to create the ActionType, the ActionCreator, and
// update the reducer to handle the new action.
// Follow the previous examples to try to do it
// Note that it has an argument like pushView

test("the replaceHome changes the views history to a new home", () => {
  const store = createAppStore();
  store.dispatch(pushView({ name: "About" }));
  store.dispatch(replaceHome({ name: "MyNewHome" }));
  expect(store.getState()).toMatchObject({
    views: [{ name: "MyNewHome" }],
  });
});
