import { ShowGenreButton } from "./ShowGenreButton";

export function ListOfGenres() {
  const genres = ["pac"];

  return (
    <div data-testid="genres">
      {genres.map((genre) => (
        <ShowGenreButton genre={genre} key={genre} />
      ))}
    </div>
  );
}
