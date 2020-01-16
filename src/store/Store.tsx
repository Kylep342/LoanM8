import { combineReducers, createStore, Store } from "redux";

import { IFormsState } from "./actions/FormsTypes";
import { FormsReducer } from "./reducers/FormsReducer";

export interface IApplicationState {
    forms: IFormsState;
}

const rootReducer = combineReducers<IApplicationState>({
    forms: FormsReducer
});

export default function configureStore(): Store<IApplicationState> {
    const store = createStore(rootReducer, undefined, undefined);
    return store;
}