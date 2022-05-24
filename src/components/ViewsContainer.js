import { ListOfGamesView, NewGameView } from "./games";
import { ListOfGenreGamesView } from "./genres";

const viewsTemplates = {
  Home: <ListOfGamesView />,
  NewGame: <NewGameView />,
  Genre: <ListOfGenreGamesView />,
  RemoveMe: "Follow the instructions of the test to set the Home as default",
};

export function ViewsContainer() {
  const viewTemplate = viewsTemplates["RemoveMe"];
  return viewTemplate;
}
