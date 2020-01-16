import { Reducer } from "redux";

import { IFormsState, FormsActions, FormsActionTypes } from "../actions/FormsTypes";

const initialState: IFormsState = {
    loanTypeChoiceFormOpen: false,
    currentLoanFormOpen: false,
    futureLoanFormOpen: false
}

export const FormsReducer: Reducer<IFormsState, FormsActions> = (state = initialState, action) => {
    switch(action.type) {
        case FormsActionTypes.BEGIN:
            return {
                ...state,
                loanTypeChoiceFormOpen: true
            }
        case FormsActionTypes.CHOOSE_CURRENT:
            return {
                ...state,
                loanTypeChoiceFormOpen: false,
                currentLoanFormOpen: true
            }
        case FormsActionTypes.CHOOSE_FUTURE:
            return {
                ...state,
                loanTypeChoiceFormOpen: false,
                futureLoanFormOpen: true
            }
        case FormsActionTypes.CHOICE_EXIT:
            return {
                ...state,
                loanTypeChoiceFormOpen: false
            }
        case FormsActionTypes.CURRENT_CREATE:
            return {
                ...state,
                currentLoanFormOpen: false
            }
        case FormsActionTypes.CURRENT_BACK:
            return {
                ...state,
                currentLoanFormOpen: false,
                loanTypeChoiceFormOpen: true
            }
        case FormsActionTypes.CURRENT_EXIT:
            return {
                ...state,
                currentLoanFormOpen: false
            }
        case FormsActionTypes.FUTURE_CREATE:
            return {
                ...state,
                futureLoanFormOpen: false
            }
        case FormsActionTypes.FUTURE_BACK:
            return {
                ...state,
                futureLoanFormOpen: false,
                loanTypeChoiceFormOpen: true
            }
        case FormsActionTypes.FUTURE_EXIT:
            return {
                ...state,
                futureLoanFormOpen: false
            }
        default:
            return state
    }
}

export default FormsReducer;