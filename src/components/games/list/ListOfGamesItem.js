export function ListOfGamesItem({ game }) {
  return (
    <li>
      <strong data-testid="title">{game.title}</strong> (
      <small data-testid="year">{game.year}</small>) [
      <em data-testid="genre">{game.genre}</em>]
    </li>
  );
}
