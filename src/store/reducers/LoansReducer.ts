import { Reducer } from "redux";

import { ILoansState, LoansActions, LoansActionTypes } from "../actions/LoansTypes";

const initialState: ILoansState = {
    loans: [],
}

export const LoansReducer: Reducer<ILoansState, LoansActions> = (state = initialState, action) => {
    switch (action.type) {
        default:
            return state
    }
}