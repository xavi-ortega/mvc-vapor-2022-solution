import { screen, act, within } from "@testing-library/react";

export const dot = { title: "dot", year: 1993, genre: "pac" };
export const mi = { title: "mi", year: 1990, genre: "pac" };
export const sonic = { title: "sonic", year: 1991, genre: "platforms" };

export function goToNewGame() {
  const newGameButton = screen.getByRole("button", { name: "new game" });
  act(() => newGameButton.click());
}

export function enterGenre(genre) {
  const inputGenre = screen.getByLabelText("Genre");
  inputGenre.value = genre;
}

export function enterYear(year) {
  const inputYear = screen.getByLabelText("Year");
  inputYear.value = year;
}

export function enterTitle(title) {
  const inputTitle = screen.getByLabelText("Title");
  inputTitle.value = title;
}

export function addNewGame(game) {
  goToNewGame();

  enterTitle(game.title);
  enterYear(game.year);
  enterGenre(game.genre);

  const newGameButton = screen.getByRole("button", { name: "add game" });
  act(() => newGameButton.click());
}

export function queryAllGames() {
  const items = screen.queryAllByRole("listitem");
  return items.map((item) => {
    const title = within(item).getByTestId("title");
    const year = within(item).getByTestId("year");
    const genre = within(item).getByTestId("genre");

    return {
      title: title.textContent,
      year: +year.textContent,
      genre: genre.textContent,
    };
  });
}
