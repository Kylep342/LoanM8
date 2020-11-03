import { Loan } from "../../Loan";
import { Budget } from "../../Budget";

export enum ActionTypes {
    BEGIN_LOAN_CREATE = "AAT/BEGIN_LOAN_CREATE",
    BEGIN_BUDGET_CREATE = "AAT/BEGIN_BUDGET_CREATE",
    CHOOSE_CURRENT = "AAT/CHOOSE_CURRENT",
    CHOOSE_FUTURE = "AAT/CHOOSE_FUTURE",
    CHOICE_EXIT = "AAT/CHOICE_EXIT",
    CURRENT_CREATE = "AAT/CURRENT_CREATE",
    CURRENT_BACK = "AAT/CURRENT_BACK",
    CURRENT_EXIT = "AAT/CURRENT_EXIT",
    DELETE_BUDGET = "AAT/DELETE_BUDGET",
    DELETE_LOAN = "AAT/DELETE_LOAN",
    FUTURE_CREATE = "AAT/FUTURE_CREATE",
    FUTURE_BACK = "AAT/FUTURE_BACK",
    FUTURE_EXIT = "AAT/FUTURE_EXIT",
    BUDGET_CREATE = "AAT/BUDGET_CREATE",
    BUDGET_EXIT = "AAT/BUDGET_EXIT",
}

export interface IActionsBeginLoanCreate {
    type: ActionTypes.BEGIN_LOAN_CREATE;
    loanTypeChoiceFormOpen: boolean;
}

export interface IActionsbeginBudgetCreate {
    type: ActionTypes.BEGIN_BUDGET_CREATE;
    budgetInputFormOpen: boolean;
}

export interface IActionsChooseCurrent {
    type: ActionTypes.CHOOSE_CURRENT;
    loanTypeChoiceFormOpen: boolean;
    currentLoanFormOpen: boolean;
}

export interface IActionsChooseFuture {
    type: ActionTypes.CHOOSE_FUTURE;
    loanTypeChoiceFormOpen: boolean;
    futureLoanFormOpen: boolean;
}

export interface IActionsChoiceExit {
    type: ActionTypes.CHOICE_EXIT;
    loanTypeChoiceFormOpen: boolean;
}

export interface IActionsCurrentCreate {
    type: ActionTypes.CURRENT_CREATE;
    newCurrentLoan: Loan;
    currentLoanFormOpen: boolean;
}

export interface IActionsCurrentBack {
    type: ActionTypes.CURRENT_BACK;
    currentLoanFormOpen: boolean;
    loanTypeChoiceFormOpen: boolean;
}

export interface IActionsCurrentExit {
    type: ActionTypes.CURRENT_EXIT;
    currentLoanFormOpen: boolean;
}

export interface IActionsDeleteBudget {
    type: ActionTypes.DELETE_BUDGET;
    budgetKey: string;
}

export interface IActionsDeleteLoan {
    type: ActionTypes.DELETE_LOAN;
    loanKey: string;
}

export interface IActionsFutureCreate {
    type: ActionTypes.FUTURE_CREATE;
    newFutureLoan: Loan;
    futureLoanFormOpen: boolean;
}

export interface IActionsFutureBack {
    type: ActionTypes.FUTURE_BACK;
    futureLoanFormOpen: boolean;
    loanTypeChoiceFormOpen: boolean;
}

export interface IActionsFutureExit {
    type: ActionTypes.FUTURE_EXIT;
    futureLoanFormOpen: boolean;
}

export interface IActionsBudgetCreate {
    type: ActionTypes.BUDGET_CREATE;
    newBudget: Budget;
    budgetInputFormOpen: boolean;
}

export interface IActionsBudgetExit {
    type: ActionTypes.BUDGET_EXIT;
    budgetInputFormOpen: boolean;
}

export type Actions =
    | IActionsBeginLoanCreate
    | IActionsbeginBudgetCreate
    | IActionsChooseCurrent
    | IActionsChooseFuture
    | IActionsChoiceExit
    | IActionsCurrentCreate
    | IActionsCurrentBack
    | IActionsCurrentExit
    | IActionsDeleteBudget
    | IActionsDeleteLoan
    | IActionsFutureCreate
    | IActionsFutureBack
    | IActionsFutureExit
    | IActionsBudgetCreate
    | IActionsBudgetExit

export interface IAppState {
    readonly currentLoanFormOpen: boolean;
    readonly futureLoanFormOpen: boolean;
    readonly loanTypeChoiceFormOpen: boolean;
    readonly budgetInputFormOpen: boolean;
    readonly loans: Loan[];
    readonly budgets: Budget[];
}
