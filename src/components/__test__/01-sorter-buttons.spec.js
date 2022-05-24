import { render, screen, act } from "@testing-library/react";
import { App } from "../../App";
// Do not modify this file
// Make all changes to src/components/SorterButtons/SorterButtons.js
// and src/store/views/reducers.js

// In the main screen there are three buttons:
// - Sort by "title"
// - Sort by "year"
// - Sort by "genre"
// They correspond to the sorter state of the redux store.
// - we want to disable the current applied sorter
// - and change the sorter state when a button is clicked

// HINT:
// Do you whant to know that is in the state?
// add to the componeent:
// - console.log(useSelector((state) => state));

test('in the initial state, the Sort by "title" button is disabled', () => {
  render(<App />);
  const titleButton = screen.getByRole("button", { name: "title" });
  // Add <button disabled> to the button
  expect(titleButton).toBeDisabled();
});

// Three steps refactor for the following test:
// First:
// Modify <button disabled={name === 'title'}> at the button

// Second:
// Add const sorter = useSelector(selectSorter);
// Modify <button disabled={name === sorter}> at the button
// Add import { useSelector } from "react-redux";
// Add import { selectSorter } from "../../store/sorter/selectors";

// Third:
// Add const isActive = useSelector((state) => selectIsSorterActive(state, name));
// Modify <button disabled={isActive}> at the button
// Modify import { selectIsSorterActive } from "../../store/sorter/selectors";

test("in the initial state, the other buttons are enabled", () => {
  render(<App />);
  const yearButton = screen.getByRole("button", { name: "year" });
  const genreButton = screen.getByRole("button", { name: "genre" });
  // READ THE INSTRUCTIONS OF THE TEST
  // AND FOLLOW THE *THREE* STEPS (TESTING IN THE MIDDLE)
  expect(yearButton).not.toBeDisabled();
  expect(genreButton).not.toBeDisabled();
});

test('clicking on "genre" disables genre and activates the rest', () => {
  render(<App />);
  const genreButton = screen.getByRole("button", { name: "genre" });
  const yearButton = screen.getByRole("button", { name: "year" });
  const titleButton = screen.getByRole("button", { name: "title" });

  act(() => genreButton.click());

  // Add const dispatch = useDispatch();
  // Add onClick to button: <button ... onClick={() => dispatch(setSorter(name))}>
  expect(genreButton).toBeDisabled();
  // Add imports as needed
  expect(yearButton).not.toBeDisabled();
  expect(titleButton).not.toBeDisabled();
});

test('EXPECTED TO PASS: clicking on "year" disables year and activates the rest', () => {
  render(<App />);
  const yearButton = screen.getByRole("button", { name: "year" });
  const genreButton = screen.getByRole("button", { name: "genre" });
  const titleButton = screen.getByRole("button", { name: "title" });

  act(() => yearButton.click());

  expect(yearButton).toBeDisabled();
  expect(genreButton).not.toBeDisabled();
  expect(titleButton).not.toBeDisabled();
});

test('EXPECTED TO PASS: can return to the "title" button', () => {
  render(<App />);
  const titleButton = screen.getByRole("button", { name: "title" });
  const genreButton = screen.getByRole("button", { name: "genre" });
  const yearButton = screen.getByRole("button", { name: "year" });

  act(() => yearButton.click());
  act(() => titleButton.click());

  expect(titleButton).toBeDisabled();
  expect(genreButton).not.toBeDisabled();
  expect(yearButton).not.toBeDisabled();
});
