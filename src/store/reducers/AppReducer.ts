import { Reducer } from "redux";

import { IAppState, Actions, ActionTypes } from "../actions/Types";
import { Loan } from "../../Loan";
import { Budget } from "../../Budget";

const initialState: IAppState = {
    loanTypeChoiceFormOpen: false,
    currentLoanFormOpen: false,
    futureLoanFormOpen: false,
    budgetInputFormOpen: false,
    loans: new Array<Loan>(),
    budgets: new Array<Budget>(),
}

export const AppReducer: Reducer<IAppState, Actions> = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.BEGIN_LOAN_CREATE:
            return {
                ...state,
                loanTypeChoiceFormOpen: action.loanTypeChoiceFormOpen
            }
        case ActionTypes.BEGIN_BUDGET_CREATE:
            return {
                ...state,
                budgetInputFormOpen: action.budgetInputFormOpen
            }
        case ActionTypes.BUDGET_CREATE:
            return {
                ...state,
                budgets: [...state.budgets, action.newBudget],
                budgetInputFormOpen: action.budgetInputFormOpen,
            }
        case ActionTypes.BUDGET_EXIT:
            return {
                ...state,
                budgetInputFormOpen: action.budgetInputFormOpen,
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
        case ActionTypes.DELETE_BUDGET:
            return {
                ...state,
                budgets: state.budgets.filter(budget => budget.id !== action.budgetKey),
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
