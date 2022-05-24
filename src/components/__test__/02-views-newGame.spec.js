import { render, screen, act } from "@testing-library/react";
import { App } from "../../App";
import { goToNewGame } from "./helpers/games";

// Do not modify this file
// Make all changes to files:
// - src/components/ViewsContainer.js
// - src/components/NewGame/NewGameButton.js
// - src/components/NewGame/CancelNewGameButton.js

// This test emulates the user moving from the Home
// view (ListOfGamesView) to the NewGame view and back

test("in the initial view is the List of games (Home)", () => {
  render(<App />);
  // Add const view = useSelector(selectTopView); at ViewsContainer
  // use view.name to select the template to render from viewsTemplates
  expect(screen.getByText("List of games")).toBeInTheDocument();
});

test('click at the button New Game pushes the view ({ name: "NewGame" })', () => {
  render(<App />);
  const newGameButton = screen.getByRole("button", { name: "new game" });
  act(() => newGameButton.click());

  // Add const dispatch = useDispatch();
  // add the onClick={ ... } callback to push the new view
  expect(screen.getByText("Add a New Game")).toBeInTheDocument();
});

test("click at the Cancel new game to pop one view", () => {
  render(<App />);
  goToNewGame();

  const cancelNewGameButton = screen.getByRole("button", { name: "cancel" });
  act(() => cancelNewGameButton.click());
  expect(screen.getByText("List of games")).toBeInTheDocument();
});
