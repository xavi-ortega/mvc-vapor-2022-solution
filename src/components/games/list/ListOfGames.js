import { ListOfGamesItem } from "./ListOfGamesItem";

export function ListOfGames({ games }) {
  return (
    <ul>
      {games.map((game) => (
        <ListOfGamesItem key={game.title} game={game} />
      ))}
    </ul>
  );
}
