import { Loan } from "../../Loan";

export enum ActionTypes {
    BEGIN = "AAT/BEGIN",
    CHOOSE_CURRENT = "AAT/CHOOSE_CURRENT",
    CHOOSE_FUTURE = "AAT/CHOOSE_FUTURE",
    CHOICE_EXIT = "AAT/CHOICE_EXIT",
    CURRENT_CREATE = "AAT/CURRENT_CREATE",
    CURRENT_BACK = "AAT/CURRENT_BACK",
    CURRENT_EXIT = "AAT/CURRENT_EXIT",
    FUTURE_CREATE = "AAT/FUTURE_CREATE",
    FUTURE_BACK = "AAT/FUTURE_BACK",
    FUTURE_EXIT = "AAT/FUTURE_EXIT",
}

export interface IActionsBegin {
    type: ActionTypes.BEGIN;
    loanTypeChoiceFormOpen: boolean;
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

export type Actions =
    | IActionsBegin
    | IActionsChooseCurrent
    | IActionsChooseFuture
    | IActionsChoiceExit
    | IActionsCurrentCreate
    | IActionsCurrentBack
    | IActionsCurrentExit
    | IActionsFutureCreate
    | IActionsFutureBack
    | IActionsFutureExit

export interface IAppState {
    readonly currentLoanFormOpen: boolean;
    readonly futureLoanFormOpen: boolean;
    readonly loanTypeChoiceFormOpen: boolean;
    readonly loans: Loan[];
    readonly monthly_payment_amounts: number[];
}