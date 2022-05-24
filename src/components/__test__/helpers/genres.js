import { act, screen, within } from "@testing-library/react";

export function listGenres() {
  const genresContainer = screen.getByTestId("genres");
  return within(genresContainer).queryAllByRole("button");
}

export function goToGenre(genre) {
  const genresContainer = screen.getByTestId("genres");
  const button = within(genresContainer).getByRole("button", {
    name: genre,
  });
  act(() => button.click());
}
