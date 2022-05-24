import { render } from "@testing-library/react";
import { App } from "../../App";
import { sortBy } from "./helpers/sorter";
import { addNewGame, dot, mi, queryAllGames, sonic } from "./helpers/games";
import { goToGenre } from "./helpers/genres";

// Do not modify this file
// Make all changes to files:
// - src/components/genres/ListOfGenres.js
// - src/components/genres/ShowGenreButton.js

test("Lists the games of that genre excluding the other genres", () => {
  render(<App />);
  addNewGame(dot);
  addNewGame(sonic);
  addNewGame(mi);
  goToGenre("pac");

  const list = queryAllGames();
  // makeSelectGamesByGenre() && useSelector((s) => selectGamesByGenre(s, genre));
  // Add the component ListOfGames to ListOfGenreGamesView
  expect(list).toEqual([dot, mi]);
});

test('The games should be sorted by the sorter, case "title"', () => {
  render(<App />);
  addNewGame(mi);
  addNewGame(dot);
  goToGenre("pac");

  const list = queryAllGames();
  // Select games of the genre sorted by sorter
  expect(list).toEqual([dot, mi]);
});

test('EXPECTED TO PASS: The games should be sorted by the sorter, case "year"', () => {
  render(<App />);
  addNewGame(dot);
  addNewGame(mi);
  goToGenre("pac");
  sortBy("year");

  const list = queryAllGames();
  expect(list).toEqual([mi, dot]);
});
