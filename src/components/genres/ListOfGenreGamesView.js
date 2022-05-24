import { BackFromGenresButton } from "./BackFromGenresButton";

export function ListOfGenreGamesView() {
  const { id: genre } = { view: "Genre", id: "pac" };

  return (
    <div>
      <h1>
        <BackFromGenresButton />
        &nbsp;Games of the {genre} genre
      </h1>
      TODO: List of Games Here
    </div>
  );
}
