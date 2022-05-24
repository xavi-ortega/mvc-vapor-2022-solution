import { PUSH_VIEW, pushView } from "../views/actions";
// Do not modify this file
// Make all changes to src/store/views/actions.js

// ActionTypes: Are String constants, ex: 'views/PUSH_VIEW'
// Actions: Are objects that contains at least one field called type that is a string
//          ex: { type: 'views/PUSH_VIEW', view: { name: 'Main', id: null } }
// ActionCreators: Are function (factories) that returns a new action of a given type
//          ex: function pushView(view) { return { type: PUSH_VIEW, view }; }

test("add the PUSH_VIEW action type", () => {
  // add: export const PUSH_VIEW = 'views/PUSH_VIEW';
  expect(PUSH_VIEW).toEqual("views/PUSH_VIEW");
});

test("add the pushView action creator function", () => {
  // add: export function pushView() {}
  // to src/store/views/actions.js
  expect(pushView).toEqual(expect.any(Function));
});

test("pushView should return an object", () => {
  // add: return {}
  const action = pushView();
  expect(action).toMatchObject({});
});

test("pushView should return a new action of type PUSH_VIEW", () => {
  // pushView function returns { type: PUSH_VIEW }
  const action = pushView();
  expect(action).toMatchObject({ type: PUSH_VIEW });
});

test.each`
  view
  ${42}
  ${"hello"}
  ${{ name: "Hello" }}
`(
  "pushView argument view is returned inside the action object ($view)",
  ({ view }) => {
    const action = pushView(view);
    // add argument: export function pushView(view) {
    // and returns { type: PUSH_VIEW, view }
    expect(action).toMatchObject({ view });
  }
);
