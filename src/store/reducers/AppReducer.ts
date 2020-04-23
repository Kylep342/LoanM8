import { Reducer } from "redux";

import { IAppState, Actions, ActionTypes } from "../actions/Types";
import { Loan } from "../../Loan";
import { monthlyPayment } from "../../monthlyPayment";

const initialState: IAppState = {
    loanTypeChoiceFormOpen: false,
    paymentInputFormOpen: false,
    currentLoanFormOpen: false,
    futureLoanFormOpen: false,
    loans: new Array<Loan>(),
    monthlyPaymentBudgets: new Array<monthlyPayment>(),

}

export const AppReducer: Reducer<IAppState, Actions> = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.BEGIN_LOAN_CREATE:
            return {
                ...state,
                loanTypeChoiceFormOpen: action.loanTypeChoiceFormOpen
            }
        case ActionTypes.BEGIN_PAYMENT_CREATE:
            return {
                ...state,
                paymentInputFormOpen: action.paymentInputFormOpen
            }
        case ActionTypes.CHOOSE_CURRENT:
            return {
                ...state,
                loanTypeChoiceFormOpen: action.loanTypeChoiceFormOpen,
                currentLoanFormOpen: action.currentLoanFormOpen
            }
        case ActionTypes.CHOOSE_FUTURE:
            return {
                ...state,
                loanTypeChoiceFormOpen: action.loanTypeChoiceFormOpen,
                futureLoanFormOpen: action.futureLoanFormOpen
            }
        case ActionTypes.CHOICE_EXIT:
            return {
                ...state,
                loanTypeChoiceFormOpen: action.loanTypeChoiceFormOpen
            }
        case ActionTypes.CURRENT_CREATE:
            return {
                ...state,
                loans: [...state.loans, action.newCurrentLoan],
                currentLoanFormOpen: action.currentLoanFormOpen
            }
        case ActionTypes.CURRENT_BACK:
            return {
                ...state,
                currentLoanFormOpen: action.currentLoanFormOpen,
                loanTypeChoiceFormOpen: action.loanTypeChoiceFormOpen
            }
        case ActionTypes.CURRENT_EXIT:
            return {
                ...state,
                currentLoanFormOpen: action.currentLoanFormOpen
            }
        case ActionTypes.DELETE_LOAN:
            return {
                ...state,
                loans: state.loans.filter(loan => loan.id !== action.loanKey)
            }
        case ActionTypes.FUTURE_CREATE:
            return {
                ...state,
                loans: [...state.loans, action.newFutureLoan],
                futureLoanFormOpen: action.futureLoanFormOpen
            }
        case ActionTypes.FUTURE_BACK:
            return {
                ...state,
                futureLoanFormOpen: action.futureLoanFormOpen,
                loanTypeChoiceFormOpen: action.loanTypeChoiceFormOpen
            }
        case ActionTypes.FUTURE_EXIT:
            return {
                ...state,
                futureLoanFormOpen: action.futureLoanFormOpen
            }
        default:
            return state
    }
}

export default AppReducer;