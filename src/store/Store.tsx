import { combineReducers, createStore, Store } from "redux";

import { IAppState } from "./actions/Types";
import { AppReducer } from "./reducers/AppReducer";

export interface IApplicationState {
    forms: IAppState;
}

const rootReducer = combineReducers<IApplicationState>({
    forms: AppReducer
});

export default function configureStore(): Store<IApplicationState> {
    const store = createStore(rootReducer, undefined, undefined);
    return store;
}