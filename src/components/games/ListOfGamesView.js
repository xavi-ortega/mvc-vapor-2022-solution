import { ListOfGenres } from "../genres/ListOfGenres";
import { dot, mi } from "../__test__/helpers/games";
import { ListOfGames } from "./list";

export function ListOfGamesView() {
  const games = [dot, mi];

  return (
    <div>
      <ListOfGenres />
      <h1>List of games</h1>
      <ListOfGames games={games} />
    </div>
  );
}
