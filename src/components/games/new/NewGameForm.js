import { useRef } from "react";
import { CancelNewGameButton } from "./CancelNewGameButton";

export function NewGameForm() {
  const titleRef = useRef();
  const yearRef = useRef();
  const genreRef = useRef();
  const onAddGame = () => {
    const title = titleRef.current.value;
    const year = yearRef.current.value;
    const genre = genreRef.current.value;
    console.log(title, year, genre);
  };

  return (
    <div>
      <label>
        Title
        <br />
        <input type="text" name="title" ref={titleRef} />
      </label>
      <br />
      <label>
        Year
        <br />
        <input type="number" name="year" ref={yearRef} />
      </label>
      <br />
      <label>
        Genre
        <br />
        <input type="text" name="genre" ref={genreRef} />
      </label>
      <br />
      <button onClick={onAddGame} className="primary">
        add game
      </button>
      <CancelNewGameButton />
    </div>
  );
}
