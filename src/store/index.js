import { createStore, combineReducers } from "redux";
import { devToolsEnhancer } from "redux-devtools-extension";
import freezeState from "redux-freeze-state";
// import { viewsReducer } from "./views/reducers";

const mainReducer = combineReducers({
  // views: viewsReducer,
  removeme: () => "removeme",
});

export function createAppStore(initialMainState) {
  return createStore(
    freezeState(mainReducer),
    initialMainState,
    devToolsEnhancer()
  );
}
