import { screen, act } from "@testing-library/react";

export function sortBy(sorter) {
  const sorterButton = screen.getByRole("button", { name: sorter });
  act(() => sorterButton.click());
}
