import { render, screen, act } from "@testing-library/react";
import { App } from "../../App";
import {
  addNewGame,
  dot,
  enterGenre,
  enterTitle,
  enterYear,
  goToNewGame,
  mi,
  queryAllGames,
  sonic,
} from "./helpers/games";
import { sortBy } from "./helpers/sorter";

// Do not modify this file
// Make all changes to files:
// - src/components/NewGame/NewGameView.js
// - src/components/ListOfGames/ListOfGamesView.js

test("EXPECTED TO PASS: in the initial view is the List of games (Home)", () => {
  render(<App />);
  expect(screen.getByText("List of games")).toBeInTheDocument();
});

test("adding one new game the list of games updates", () => {
  render(<App />);
  goToNewGame();

  enterTitle(dot.title);
  enterYear(dot.year);
  enterGenre(dot.genre);

  const newGameButton = screen.getByRole("button", { name: "add game" });
  act(() => newGameButton.click());

  const games = queryAllGames();
  // At NewGameView replace console.log by dispatch addGame AND popView
  // At ListOfGamesView replace const games = [...] by useSelector(selectGames)
  expect(games).toEqual([dot]);
});

test("EXPECTED TO PASS: lists more than one game", () => {
  render(<App />);
  addNewGame(dot);
  addNewGame(mi);
  addNewGame(sonic);

  const games = queryAllGames();
  // At NewGameView replace console.log by dispatch addGame AND popView
  // At ListOfGamesView replace const games = [...] by useSelector(selectGames)
  expect(games).toEqual([dot, mi, sonic]);
});

test.each`
  sorter     | result
  ${"title"} | ${[dot, mi, sonic]}
  ${"year"}  | ${[mi, sonic, dot]}
  ${"genre"} | ${[mi, dot, sonic]}
`(
  "games list is sorted according sorter $% $# $sorter",
  ({ sorter, result }) => {
    render(<App />);
    addNewGame(sonic);
    addNewGame(mi);
    addNewGame(dot);
    sortBy(sorter);

    const games = queryAllGames();
    // At ListOfGamesView replace the selectGames by the selector that gives games sorted
    expect(games).toEqual(result);
  }
);
