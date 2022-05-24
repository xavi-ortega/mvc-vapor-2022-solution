export function ShowGenreButton({ genre }) {
  const goToGenre = () => console.log("goToGenre", genre);

  return (
    <button data-testid={genre} onClick={goToGenre}>
      {genre}
    </button>
  );
}
