import "./App.css";
import { Provider } from "react-redux";
import { useMemo } from "react";
import { createAppStore } from "./store";
import { SorterButtons } from "./components/sorter";
import { ViewsContainer } from "./components/ViewsContainer";
import { NewGameButton } from "./components/games";

export function App({ initialState }) {
  const store = useMemo(() => createAppStore(initialState), [initialState]);

  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <SorterButtons />
          <div className="spacing" />
          <NewGameButton />
        </header>
        <main>
          <ViewsContainer />
        </main>
      </div>
    </Provider>
  );
}
