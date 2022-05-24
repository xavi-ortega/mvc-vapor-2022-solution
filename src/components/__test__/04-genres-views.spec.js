import { render, screen, act } from "@testing-library/react";
import { App } from "../../App";
import { addNewGame, dot, mi, sonic } from "./helpers/games";
import { goToGenre, listGenres } from "./helpers/genres";

// Do not modify this file
// Make all changes to files:
// - src/components/genres/ListOfGenres.js
// - src/components/genres/ShowGenreButton.js
// - src/components/genres/BackFromGenresButton.js

test("In the beggining the genres list is empty", () => {
  render(<App />);
  const list = listGenres();
  // Remove the content of the list of ListOfGenres
  expect(list).toHaveLength(0);
});

test("When we add a game, the genre appears in the list", () => {
  render(<App />);
  addNewGame(dot);

  const list = listGenres();
  expect(list).toHaveLength(1);
  // Add the useSelector(selectGenres)
  expect(list[0]).toHaveTextContent("pac");
});

test("EXPECTED TO PASS: if there is more than one game, appears all the corresponding tests, without repeats, sorted by name", () => {
  render(<App />);
  addNewGame(sonic);
  addNewGame(dot);
  addNewGame(mi);

  const list = listGenres();
  expect(list).toHaveLength(2);
  expect(list[0]).toHaveTextContent("pac");
  expect(list[1]).toHaveTextContent("platform");
});

test("Clicking on a genre we can go to the view of that genre (pac)", () => {
  render(<App />);
  addNewGame(dot);
  goToGenre("pac");

  // Add to ShowGenreButton the dispatch(pushView({name: 'Genre', id: genre }))
  expect(screen.getByText("Games of the pac genre")).toBeInTheDocument();
});

test("Clicking on a genre we can go to the view of that genre (platforms)", () => {
  render(<App />);
  addNewGame(sonic);
  goToGenre("platforms");

  // ListOfGenreGamesView reads genre from selectTopView
  expect(screen.getByText("Games of the platforms genre")).toBeInTheDocument();
});

test("there is a return button", () => {
  render(<App />);
  addNewGame(sonic);
  goToGenre("platforms");

  const button = screen.getByText("return");
  act(() => button.click());

  expect(screen.getByText("List of games")).toBeInTheDocument();
});
