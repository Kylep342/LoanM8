import { combineReducers, createStore, Store } from "redux";

import { IFormsState } from "./actions/FormsTypes";
import { FormsReducer } from "./reducers/FormsReducer";
import { ILoansState } from "./actions/LoansTypes";
import { LoansReducer } from "./reducers/LoansReducer";

export interface IApplicationState {
    forms: IFormsState;
    loans: ILoansState;
}

const rootReducer = combineReducers<IApplicationState>({
    forms: FormsReducer
});

export default function configureStore(): Store<IApplicationState> {
    const store = createStore(rootReducer, undefined, undefined);
    return store;
}