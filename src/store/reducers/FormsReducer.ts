import { Reducer } from "redux";

import { IFormsState, FormsActions, FormsActionTypes } from "../actions/FormsTypes";
import { Loan } from "../../Loan";

const initialState: IFormsState = {
    loanTypeChoiceFormOpen: false,
    currentLoanFormOpen: false,
    futureLoanFormOpen: false,
    loans: new Array<Loan>(),

}

export const FormsReducer: Reducer<IFormsState, FormsActions> = (state = initialState, action) => {
    switch (action.type) {
        case FormsActionTypes.BEGIN:
            return {
                ...state,
                loanTypeChoiceFormOpen: action.loanTypeChoiceFormOpen
            }
        case FormsActionTypes.CHOOSE_CURRENT:
            return {
                ...state,
                loanTypeChoiceFormOpen: action.loanTypeChoiceFormOpen,
                currentLoanFormOpen: action.currentLoanFormOpen
            }
        case FormsActionTypes.CHOOSE_FUTURE:
            return {
                ...state,
                loanTypeChoiceFormOpen: action.loanTypeChoiceFormOpen,
                futureLoanFormOpen: action.futureLoanFormOpen
            }
        case FormsActionTypes.CHOICE_EXIT:
            return {
                ...state,
                loanTypeChoiceFormOpen: action.loanTypeChoiceFormOpen
            }
        case FormsActionTypes.CURRENT_CREATE:
            return {
                ...state,
                loans: [...state.loans, action.newCurrentLoan],
                currentLoanFormOpen: action.currentLoanFormOpen
            }
        case FormsActionTypes.CURRENT_BACK:
            return {
                ...state,
                currentLoanFormOpen: action.currentLoanFormOpen,
                loanTypeChoiceFormOpen: action.loanTypeChoiceFormOpen
            }
        case FormsActionTypes.CURRENT_EXIT:
            return {
                ...state,
                currentLoanFormOpen: action.currentLoanFormOpen
            }
        case FormsActionTypes.FUTURE_CREATE:
            return {
                ...state,
                loans: [...state.loans, action.newFutureLoan],
                futureLoanFormOpen: action.futureLoanFormOpen
            }
        case FormsActionTypes.FUTURE_BACK:
            return {
                ...state,
                futureLoanFormOpen: action.futureLoanFormOpen,
                loanTypeChoiceFormOpen: action.loanTypeChoiceFormOpen
            }
        case FormsActionTypes.FUTURE_EXIT:
            return {
                ...state,
                futureLoanFormOpen: action.futureLoanFormOpen
            }
        default:
            return state
    }
}

export default FormsReducer;