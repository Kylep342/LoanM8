import { Loan } from "../../Loan";

export enum FormsActionTypes {
    BEGIN = "FAT/BEGIN",
    CHOOSE_CURRENT = "FAT/CHOOSE_CURRENT",
    CHOOSE_FUTURE = "FAT/CHOOSE_FUTURE",
    CHOICE_EXIT = "FAT/CHOICE_EXIT",
    CURRENT_CREATE = "FAT/CURRENT_CREATE",
    CURRENT_BACK = "FAT/CURRENT_BACK",
    CURRENT_EXIT = "FAT/CURRENT_EXIT",
    FUTURE_CREATE = "FAT/FUTURE_CREATE",
    FUTURE_BACK = "FAT/FUTURE_BACK",
    FUTURE_EXIT = "FAT/FUTURE_EXIT",
}

export interface IFormsActionsBegin {
    type: FormsActionTypes.BEGIN;
    loanTypeChoiceFormOpen: boolean;
}

export interface IFormsActionsChooseCurrent {
    type: FormsActionTypes.CHOOSE_CURRENT;
    loanTypeChoiceFormOpen: boolean;
    currentLoanFormOpen: boolean;
}

export interface IFormsActionsChooseFuture {
    type: FormsActionTypes.CHOOSE_FUTURE;
    loanTypeChoiceFormOpen: boolean;
    futureLoanFormOpen: boolean;
}

export interface IFormsActionsChoiceExit {
    type: FormsActionTypes.CHOICE_EXIT;
    loanTypeChoiceFormOpen: boolean;
}

export interface IFormsActionsCurrentCreate {
    type: FormsActionTypes.CURRENT_CREATE;
    newCurrentLoan: Loan;
    currentLoanFormOpen: boolean;
}

export interface IFormsActionsCurrentBack {
    type: FormsActionTypes.CURRENT_BACK;
    currentLoanFormOpen: boolean;
    loanTypeChoiceFormOpen: boolean;
}

export interface IFormsActionsCurrentExit {
    type: FormsActionTypes.CURRENT_EXIT;
    currentLoanFormOpen: boolean;
}

export interface IFormsActionsFutureCreate {
    type: FormsActionTypes.FUTURE_CREATE;
    newFutureLoan: Loan;
    futureLoanFormOpen: boolean;
}

export interface IFormsActionsFutureBack {
    type: FormsActionTypes.FUTURE_BACK;
    futureLoanFormOpen: boolean;
    loanTypeChoiceFormOpen: boolean;
}

export interface IFormsActionsFutureExit {
    type: FormsActionTypes.FUTURE_EXIT;
    futureLoanFormOpen: boolean;
}

export type FormsActions =
    | IFormsActionsBegin
    | IFormsActionsChooseCurrent
    | IFormsActionsChooseFuture
    | IFormsActionsChoiceExit
    | IFormsActionsCurrentCreate
    | IFormsActionsCurrentBack
    | IFormsActionsCurrentExit
    | IFormsActionsFutureCreate
    | IFormsActionsFutureBack
    | IFormsActionsFutureExit

export interface IFormsState {
    readonly currentLoanFormOpen: boolean;
    readonly futureLoanFormOpen: boolean;
    readonly loanTypeChoiceFormOpen: boolean;
    readonly loans: Loan[];
}